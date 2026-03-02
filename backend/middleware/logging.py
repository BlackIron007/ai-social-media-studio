import time
from fastapi import Request

async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = round(time.time() - start_time, 3)

    print(
        f"{request.method} {request.url.path} "
        f"- {response.status_code} "
        f"- {duration}s"
    )

    return response