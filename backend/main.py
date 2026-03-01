from fastapi import FastAPI
from routes.generate import router as generate_router

app = FastAPI(title="AI Social Media Content Studio")

app.include_router(generate_router)

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Backend is running"}