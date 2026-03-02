from fastapi import APIRouter
from schemas.generate import GenerateTextRequest, GenerateImageRequest
from services.text_ai import generate_marketing_text
from services.image_ai import generate_product_image
from slowapi import Limiter
from fastapi import Request

router = APIRouter(prefix="/generate", tags=["Generate"])

@router.post("/text")
@limiter.limit("5/minute")
def generate_text(payload: GenerateTextRequest, request: Request):
    return {
        "result": generate_marketing_text(
            product=payload.product,
            description=payload.description,
            audience=payload.audience,
            platform=payload.platform
        )
    }

@router.post("/image")
@limiter.limit("3/minute")
def generate_image(payload: GenerateImageRequest, request: Request):
    image_base64 = generate_product_image(
        product=payload.product,
        description=payload.description
    )
    return {"image_base64": image_base64}