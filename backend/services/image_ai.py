import os
import base64
import requests
from dotenv import load_dotenv

load_dotenv()

CLIPDROP_API_KEY = os.getenv("CLIPDROP_API_KEY")
CLIPDROP_URL = "https://clipdrop-api.co/text-to-image/v1"

def generate_product_image(product, description):
    prompt = f"""
High-quality professional product photo.

Product: {product}
Description: {description}

Style:
- studio lighting
- clean background
- realistic
- marketing photo
"""

    response = requests.post(
        CLIPDROP_URL,
        files={
            "prompt": (None, prompt, "text/plain")
        },
        headers={
            "x-api-key": CLIPDROP_API_KEY
        },
        timeout=60
    )

    if not response.ok:
        raise Exception(
            f"Clipdrop image generation failed: "
            f"{response.status_code} - {response.text}"
        )

    image_base64 = base64.b64encode(response.content).decode("utf-8")
    return image_base64