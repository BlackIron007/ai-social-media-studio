from fastapi import FastAPI

app = FastAPI(title="AI Social Media Content Studio")

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Backend is running"}