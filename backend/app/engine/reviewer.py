from langchain_core.prompts import ChatPromptTemplate
from app.engine.llm_factory import get_chat_model
from app.engine.schemas import PRReviewResult
from app.engine.rag import retrieve_relevant_diff_chunks

def run_pr_analysis(pr_title: str, raw_diff: str, repo_memory: str = "", provider: str = None) -> PRReviewResult:
    """
    Runs the multi-file diff analysis using LangChain, RAG, and Persistent Memory.
    """
    llm = get_chat_model(provider)
    
    # Use the RAG pipeline to condense massive diffs
    optimized_diff = retrieve_relevant_diff_chunks(pr_title, raw_diff)
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are an expert AI code reviewer. Your goal is to review code diffs against context-aware best practices, detect security vulnerabilities, syntax pitfalls, and performance regressions. Be concise, actionable, and specific.\n\nPAST REPOSITORY MEMORY & TEAM CONVENTIONS:\n{memory}\n\nDo NOT repeat mistakes listed in the memory. Enforce any team rules mentioned."),
        ("user", "Pull Request Title: {title}\n\nHere is the relevant code diff:\n{diff}\n\nPlease analyze this diff and provide a structured review.")
    ])

    structured_llm = llm.with_structured_output(PRReviewResult)
    chain = prompt | structured_llm
    
    result = chain.invoke({"title": pr_title, "diff": optimized_diff, "memory": repo_memory})
    return result
