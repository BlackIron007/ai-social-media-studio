from pydantic import BaseModel, Field

class GenerateTextRequest(BaseModel):
    product: str = Field(..., min_length=1)
    description: str = Field(..., min_length=1)
    audience: str = Field(..., min_length=1)
    platform: str = Field(..., min_length=1)

class GenerateImageRequest(BaseModel):
    product: str = Field(..., min_length=1)
    description: str = Field(..., min_length=1)