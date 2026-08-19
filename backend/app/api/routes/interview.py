from fastapi import APIRouter, HTTPException
from app.schemas.interview import (
    StartInterviewRequest,
    StartInterviewResponse,
    FeedbackRequest,
    FeedbackResponse,
)
from app.services import interview_service

router = APIRouter(prefix="/interview", tags=["interview"])


@router.post("/start", response_model=StartInterviewResponse)
async def start_interview(request: StartInterviewRequest):
    """
    Start a new mock interview session.
    Returns an interview ID and the first question.
    """
    try:
        return await interview_service.start_interview(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/feedback", response_model=FeedbackResponse)
async def get_feedback(request: FeedbackRequest):
    """
    Submit an answer and receive AI-generated feedback.
    Returns strengths, improvement areas, and scores.
    """
    if not request.answer.strip():
        raise HTTPException(status_code=400, detail="Answer cannot be empty.")
    try:
        return await interview_service.generate_feedback(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
