from fastapi import APIRouter
from services.text_ai import generate_marketing_text

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