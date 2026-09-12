from fastapi import APIRouter, Request, Header, HTTPException, BackgroundTasks
import hmac
import hashlib
import json
import os
import time

from app.core.github_client import GitHubClient
from app.core.github_auth import get_installation_token
from app.core.diff_parser import truncate_diff
from app.engine.reviewer import run_pr_analysis

router = APIRouter()

def verify_github_signature(payload_body: bytes, signature_header: str):
    # Temporarily bypassing signature verification for hackathon local testing
    return True

async def process_pr_review(payload: dict, installation_id: int = None):
    start_time = time.time()
    
    repo_data = payload["repository"]
    pr_data = payload["pull_request"]
    
    owner = repo_data["owner"]["login"]
    repo = repo_data["name"]
    pr_number = pr_data["number"]
    head_sha = pr_data["head"]["sha"]
    
    repo_id = f"{owner}/{repo}"
    token = get_installation_token(installation_id) if installation_id else None
    client = GitHubClient(token=token)
    
    raw_diff = await client.fetch_pr_diff(owner, repo, pr_number)
    
    # Retrieve past learnings
    from app.engine.memory import retrieve_repo_memory, store_review_memory
    past_memory = retrieve_repo_memory(repo_id, pr_data["title"])
    
    provider = os.getenv("DEFAULT_LLM_PROVIDER", "gemini")
    review_result = run_pr_analysis(pr_data["title"], raw_diff, repo_memory=past_memory, provider=provider)
    
    await client.post_summary_comment(owner, repo, pr_number, review_result.summary)
    
    findings_for_memory = []
    for comment in review_result.inline_comments:
        findings_for_memory.append(comment.model_dump() if hasattr(comment, "model_dump") else comment.dict())
        await client.post_inline_comment(
            owner=owner,
            repo=repo,
            pr_number=pr_number,
            commit_id=head_sha,
            path=comment.file_path,
            line=comment.line_number,
            body=f"""**[{comment.severity}] {comment.issue_type}**
{comment.comment}

*Suggested Fix:*
```
{comment.suggested_code}
```"""
        )
        
    
    # Save the new findings to mem0
    store_review_memory(repo_id, review_result.summary, findings_for_memory)


@router.post("/github")
async def handle_github_webhook(
    request: Request,
    background_tasks: BackgroundTasks,
    x_hub_signature_256: str = Header(None),
    x_github_event: str = Header(None)
):
    body_bytes = await request.body()
    verify_github_signature(body_bytes, x_hub_signature_256)

    if x_github_event not in ["pull_request", "pull_request_review"]:
        return {"status": "ignored", "reason": f"Event {x_github_event} not processed"}

    payload = json.loads(body_bytes.decode())
    action = payload.get("action")

    if action in ["opened", "synchronize", "reopened"]:
        installation_id = payload.get("installation", {}).get("id")
        background_tasks.add_task(process_pr_review, payload, installation_id)
        return {"status": "success", "message": "Review queued"}

    return {"status": "noop", "action": action}
