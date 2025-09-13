import requests
import os

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "AIzaSyAXBYFyJgkfiTv5Vp-oNWVOJ2Mr7GPp-uU")
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

SYSTEM_PROMPT = (
    "You are an expert prompt engineer. Given a context from a user (who is not technical), "
    "generate a clear, concise, and effective prompt for an LLM that will help the user achieve their goal. "
    "Avoid technical jargon."
)

def generate_prompt(user_context: str) -> str:
    headers = {"Content-Type": "application/json"}
    data = {
        "contents": [
            {"role": "system", "parts": [{"text": SYSTEM_PROMPT}]},
            {"role": "user", "parts": [{"text": user_context}]}
        ]
    }
    params = {"key": GEMINI_API_KEY}
    response = requests.post(GEMINI_API_URL, headers=headers, params=params, json=data, timeout=30)
    response.raise_for_status()
    result = response.json()
    # Gemini returns candidates[0].content.parts[0].text
    try:
        return result["candidates"][0]["content"]["parts"][0]["text"]
    except Exception:
        return "[Error: Could not generate prompt]"
