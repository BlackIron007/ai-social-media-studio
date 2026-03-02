from fastapi import FastAPI
from routes.generate import router as generate_router
from fastapi.middleware.cors import CORSMiddleware
from middleware.logging import log_requests
from core.limiter import limiter
from slowapi.errors import RateLimitExceeded
from fastapi.responses import JSONResponse

app = FastAPI(title="AI Social Media Content Studio")
app.middleware("http")(log_requests)

app.state.limiter = limiter

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ai-social-media-studio.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(generate_router)

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Backend is running"}

@app.exception_handler(RateLimitExceeded)
def rate_limit_handler(request, exc):
    return JSONResponse(
        status_code=429,
        content={"detail": "Rate limit exceeded. Please try again later."}
    )