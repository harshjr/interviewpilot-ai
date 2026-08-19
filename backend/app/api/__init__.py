from fastapi import APIRouter
from app.api.routes import health, interview, dashboard, resume

api_router = APIRouter()

api_router.include_router(health.router)
api_router.include_router(interview.router)
api_router.include_router(dashboard.router)
api_router.include_router(resume.router)
