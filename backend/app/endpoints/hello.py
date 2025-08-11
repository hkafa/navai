from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def hello_world():
    return {"message": "Hello World! Welcome to the Adventure Planning API"}

@router.get("/health")
async def health_check():
    return {"status": "healthy"}