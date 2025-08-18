from pydantic import BaseModel
from typing import List

class JourneyPlanRequest(BaseModel):
    description: str

class JourneyPlanResponse(BaseModel):
    coordinates: List[List[float]]