from fastapi import APIRouter
from fastapi import Query

router = APIRouter()

@router.get("/hello")
async def hello_world(
        name: str = Query(...)
):
    print(name)
    return {f"message": f"Hello {name}! Welcome to the Adventure Planning API"}

@router.get("/health")
async def health_check():
    return {"status": "healthy"}