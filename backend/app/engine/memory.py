import os
from mem0 import Memory

def get_memory_client():
    # Configure mem0 to use the permanent Pinecone index
    config = {
        "vector_store": {
            "provider": "pinecone",
            "config": {
                "api_key": os.getenv("PINECONE_API_KEY"),
                "collection_name": os.getenv("PINECONE_INDEX_NAME", "deeppr"),
                "serverless_config": {
                    "cloud": "aws",
                    "region": os.getenv("PINECONE_REGION", "us-east-1")
                }
            }
        },
        "llm": {
            "provider": "gemini" if os.getenv("DEFAULT_LLM_PROVIDER") == "gemini" else "aws_bedrock",
            "config": {
                "api_key": os.getenv("GEMINI_API_KEY"),
                "model": "gemini-3.8-flash"
            }
        },
        "embedder": {
            "provider": "gemini",
            "config": {
                "api_key": os.getenv("GEMINI_API_KEY"),
                "model": "models/gemini-embedding-2"
            }
        }
    }
    return Memory.from_config(config)

def retrieve_repo_memory(repo_id: str, pr_title: str) -> str:
    try:
        m = get_memory_client()
        query = f"What are the coding conventions, past bugs, or team preferences related to: {pr_title}?"
        memories = m.search(query, filters={"user_id": repo_id})
        
        if not memories:
            return "No previous memories or specific team conventions found for this context."
            
        if isinstance(memories, dict) and "results" in memories:
            memories = memories["results"]
            
        context_parts = []
        for mem in memories:
            if isinstance(mem, dict) and "memory" in mem:
                context_parts.append(mem["memory"])
            elif isinstance(mem, str):
                context_parts.append(mem)
            elif hasattr(mem, "memory"):
                context_parts.append(mem.memory)
                
        context = "\n".join(context_parts)
        print(f"[mem0] Retrieved context for {repo_id}: {context}")
        return context
    except Exception as e:
        print(f"[mem0] Failed to retrieve memory: {e}")
        return ""

def store_review_memory(repo_id: str, summary: str, issues_found: list):
    try:
        m = get_memory_client()
        issues_str = "\n".join([f"- [{i['issue_type']}] {i['comment']}" for i in issues_found])
        text_to_memorize = f"In a recent pull request, the following issues were found and should be avoided in the future:\n{issues_str}\n\nPR Summary: {summary}"
        
        m.add(text_to_memorize, user_id=repo_id)
        print(f"[mem0] Successfully stored new learnings in Pinecone for {repo_id}")
    except Exception as e:
        print(f"[mem0] Failed to store memory: {e}")
