from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.endpoints import hello
from app.endpoints.journey_planner.route import router as journey_planner_router

app = FastAPI(title="Adventure Planning API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(hello.router, tags=["hello"])
app.include_router(journey_planner_router, tags=["journey_planner"])