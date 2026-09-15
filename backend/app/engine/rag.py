import os
import time
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_aws import BedrockEmbeddings

def get_embeddings_model():
    provider = os.getenv("DEFAULT_LLM_PROVIDER", "gemini").lower()
    if provider == "bedrock":
        import boto3
        client = boto3.client("bedrock-runtime", region_name=os.getenv("AWS_REGION", "us-east-1"))
        return BedrockEmbeddings(client=client, model_id="amazon.titan-embed-text-v2:0")
    else:
        return GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=os.getenv("GEMINI_API_KEY"))

def retrieve_relevant_diff_chunks(pr_title: str, raw_diff: str) -> str:
    """
    Chunks a massive PR diff and uses a Pinecone temporary namespace to retrieve relevant context.
    """
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=200000, chunk_overlap=200, separators=["\ndiff --git", "\n@@", "\n\n", "\n"])
    chunks = text_splitter.split_text(raw_diff)
    
    if len(chunks) <= 5:
        return raw_diff
        
    print(f"[RAG] Diff is massive. Embedding {len(chunks)} chunks into Pinecone...")
    
    embeddings = get_embeddings_model()
    pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
    index_name = os.getenv("PINECONE_INDEX_NAME", "deeppr")
    index = pc.Index(index_name)
    
    # Create a unique temporary namespace for this specific PR execution
    temp_namespace = f"pr-rag-{int(time.time())}"
    
    # Embed and upload
    vectorstore = PineconeVectorStore.from_texts(chunks, embeddings, index_name=index_name, namespace=temp_namespace)
    
    # Retrieve relevant chunks
    retriever = vectorstore.as_retriever(search_kwargs={"k": 5})
    query = f"Find code changes related to: {pr_title}. Focus on logic, security, and performance."
    relevant_docs = retriever.invoke(query)
    
    # Cleanup: Delete the temporary namespace to save space and keep it 100% free
    index.delete(delete_all=True, namespace=temp_namespace)
    print(f"[RAG] Retrieval complete. Deleted temp namespace: {temp_namespace}")
    
    condensed_diff = "\n\n... [RAG CONDENSED DIFF] ...\n\n".join([doc.page_content for doc in relevant_docs])
    return condensed_diff
