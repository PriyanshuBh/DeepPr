import os
from langchain_core.language_models import BaseChatModel

def get_chat_model(provider: str = None) -> BaseChatModel:
    active_provider = (provider or os.getenv("DEFAULT_LLM_PROVIDER", "gemini")).lower()

    if active_provider == "bedrock":
        from langchain_aws import ChatBedrock
        import boto3
        bedrock_client = boto3.client(
            service_name="bedrock-runtime",
            region_name=os.getenv("AWS_REGION", "us-east-1")
        )
        return ChatBedrock(
            model_id="anthropic.claude-3-haiku-20240307-v1:0",
            client=bedrock_client,
            model_kwargs={"temperature": 0.2, "max_tokens": 2048}
        )
    else:
        from langchain_google_genai import ChatGoogleGenerativeAI
        return ChatGoogleGenerativeAI(
            model="gemini-3.1-flash-lite", max_retries=10,
            google_api_key=os.getenv("GEMINI_API_KEY"),
            temperature=0.2,
            max_output_tokens=2048
        )
