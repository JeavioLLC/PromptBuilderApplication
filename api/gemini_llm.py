import requests
import os

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

SYSTEM_PROMPT = (
    "You are an expert prompt engineer. Given a context from a user (who is not technical), "
    "generate a clear, concise, and effective prompt for an LLM that will help the user achieve their goal. "
    "Avoid technical jargon. If user details are provided, use them to personalize the prompt."
)

def generate_prompt(user_context: str, user_info: dict = None) -> str:
    headers = {"Content-Type": "application/json"}
    # Add user info to system prompt if available
    if user_info:
        user_details = f" User details: {user_info}."
    else:
        user_details = ""
    system_prompt = SYSTEM_PROMPT + user_details
    data = {
        "contents": [
            {"role": "system", "parts": [{"text": system_prompt}]},
            {"role": "user", "parts": [{"text": user_context}]}
        ]
    }
    params = {"key": GEMINI_API_KEY}
    try:
        response = requests.post(GEMINI_API_URL, headers=headers, params=params, json=data, timeout=30)
        response.raise_for_status()
        result = response.json()
        return result["candidates"][0]["content"]["parts"][0]["text"]
    except Exception as e:
        # Log the error details for debugging
        import traceback
        print("[Gemini LLM Error]", str(e))
        print(traceback.format_exc())
        if hasattr(e, 'response') and e.response is not None:
            try:
                print("[Gemini LLM Response]", e.response.text)
            except Exception:
                pass
        return f"[Error: Could not generate prompt: {str(e)}]"
