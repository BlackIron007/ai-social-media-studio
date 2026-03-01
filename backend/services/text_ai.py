import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

MODEL_NAME = "gemini-2.5-flash"

def generate_marketing_text(product, description, audience, platform):
    prompt = f"""
You are a professional social media marketer.

Product: {product}
Description: {description}
Target Audience: {audience}
Platform: {platform}

Generate:
1. A catchy caption
2. A short ad headline
3. 5 relevant hashtags
"""

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    return response.text