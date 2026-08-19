from fastapi import APIRouter
from app.schemas.dashboard import DashboardResponse
from app.services import dashboard_service

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("", response_model=DashboardResponse)
async def get_dashboard():
    """
    Retrieve interview readiness analytics and recent session data.
    """
    return await dashboard_service.get_dashboard_data()
