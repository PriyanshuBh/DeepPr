import os
import time
import jwt
import httpx

def get_installation_token(installation_id: int) -> str:
    app_id = os.getenv("GITHUB_APP_ID")
    private_key_raw = os.getenv("GITHUB_PRIVATE_KEY")
    
    # In case the user pasted the key with actual line breaks instead of \n, or vice versa
    private_key = private_key_raw.replace('\\n', '\n') if private_key_raw else ""

    if not app_id or not private_key:
        print("[GitHub Auth] Missing App ID or Private Key, falling back to PAT.")
        return os.getenv("GITHUB_TOKEN")

    payload = {
        'iat': int(time.time()),
        'exp': int(time.time()) + (10 * 60),
        'iss': app_id
    }

    try:
        encoded_jwt = jwt.encode(payload, private_key, algorithm='RS256')
        
        headers = {
            "Authorization": f"Bearer {encoded_jwt}",
            "Accept": "application/vnd.github.v3+json"
        }
        
        url = f"https://api.github.com/app/installations/{installation_id}/access_tokens"
        response = httpx.post(url, headers=headers)
        response.raise_for_status()
        
        return response.json()['token']
    except Exception as e:
        print(f"[GitHub Auth] Failed to generate installation token: {e}")
        return os.getenv("GITHUB_TOKEN")
