from fastapi import APIRouter
from services.text_ai import generate_marketing_text
from services.image_ai import generate_product_image

router = APIRouter(prefix="/generate", tags=["Generate"])

@router.post("/text")
def generate_text(data: dict):
    return {
        "result": generate_marketing_text(
            product=data["product"],
            description=data["description"],
            audience=data["audience"],
            platform=data["platform"]
        )
    }
    
@router.post("/image")
def generate_image(data: dict):
    image_base64 = generate_product_image(
        product=data["product"],
        description=data["description"]
    )
    return {"image_base64": image_base64}