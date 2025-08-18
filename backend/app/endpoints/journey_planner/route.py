from fastapi import APIRouter
from .schema import JourneyPlanRequest, JourneyPlanResponse
from .helpers import get_dummy_coordinates, plan_route

router = APIRouter()

@router.post("/journey-planner", response_model=JourneyPlanResponse)
async def plan_journey(request: JourneyPlanRequest):
    """
    Plan a journey based on description and return coordinates
    """
    from_, to_ = request.description.split(", ")
    coordinates = get_dummy_coordinates()
    coordinates = plan_route(from_, to_)
    return JourneyPlanResponse(coordinates=coordinates)