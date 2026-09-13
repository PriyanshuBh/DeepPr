import tiktoken

def truncate_diff(diff_text: str, max_tokens: int = 20000) -> str:
    """
    Truncates a diff string to fit within max_tokens, prioritizing file headers.
    """
    try:
        encoding = tiktoken.get_encoding("cl100k_base")
    except Exception:
        # Fallback if tiktoken fails, rough heuristic (4 chars per token)
        if len(diff_text) > max_tokens * 4:
            return diff_text[:max_tokens * 4] + "\n...[DIFF TRUNCATED TO FIT LIMITS]"
        return diff_text

    tokens = encoding.encode(diff_text)
    if len(tokens) <= max_tokens:
        return diff_text
    
    # Simple truncation keeping start of diff
    truncated_tokens = tokens[:max_tokens]
    truncated_text = encoding.decode(truncated_tokens)
    return truncated_text + "\n...[DIFF TRUNCATED TO FIT LIMITS]"

def parse_and_format_diff(pr_data: dict) -> str:
    """
    Takes raw GitHub PR data and formats it into a string diff.
    """
    # Assuming pr_data is a parsed JSON from GitHub webhook
    diff_url = pr_data.get("diff_url")
    # For this hackathon, we would fetch the diff using httpx in the github_client
    # and pass the raw diff string here.
    return diff_url
