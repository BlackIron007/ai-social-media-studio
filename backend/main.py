from fastapi import FastAPI
from routes.generate import router as generate_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Social Media Content Studio")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(generate_router)

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Backend is running"}