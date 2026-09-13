import os
import httpx

class GitHubClient:
    def __init__(self, token: str = None):
        self.token = token or os.getenv("GITHUB_TOKEN")
        self.headers = {
            "Authorization": f"Bearer {self.token}",
            "Accept": "application/vnd.github.v3+json",
        }
        self.base_url = "https://api.github.com"

    async def fetch_pr_diff(self, owner: str, repo: str, pr_number: int) -> str:
        url = f"{self.base_url}/repos/{owner}/{repo}/pulls/{pr_number}"
        async with httpx.AsyncClient() as client:
            headers = self.headers.copy()
            headers["Accept"] = "application/vnd.github.v3.diff"
            response = await client.get(url, headers=headers)
            response.raise_for_status()
            return response.text

    async def post_summary_comment(self, owner: str, repo: str, pr_number: int, body: str):
        url = f"{self.base_url}/repos/{owner}/{repo}/issues/{pr_number}/comments"
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=self.headers, json={"body": body})
            response.raise_for_status()
            return response.json()

    async def post_inline_comment(self, owner: str, repo: str, pr_number: int, commit_id: str, path: str, line: int, body: str):
        url = f"{self.base_url}/repos/{owner}/{repo}/pulls/{pr_number}/comments"
        payload = {
            "body": body,
            "commit_id": commit_id,
            "path": path,
            "line": line
        }
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=self.headers, json=payload)
            if response.status_code != 422:
                response.raise_for_status()
            return response.json() if response.status_code == 201 else None
