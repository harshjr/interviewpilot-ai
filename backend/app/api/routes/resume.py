from fastapi import APIRouter, UploadFile, File, HTTPException
from app.schemas.resume import ResumeAnalyzeResponse
from app.services import resume_service

router = APIRouter(prefix="/resume", tags=["resume"])

ALLOWED_TYPES = {
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
}
MAX_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB


@router.post("/analyze", response_model=ResumeAnalyzeResponse)
async def analyze_resume(file: UploadFile = File(...)):
    """
    Upload a resume (PDF, DOCX, or TXT) and receive:
    - Suggested interview questions
    - Skill breakdown
    - Strength areas and skill gaps
    """
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported file type: {file.content_type}. Use PDF, DOCX, or TXT.",
        )

    contents = await file.read()
    if len(contents) > MAX_SIZE_BYTES:
        raise HTTPException(status_code=413, detail="File too large. Maximum size is 5 MB.")

    return await resume_service.analyze_resume(
        filename=file.filename or "resume",
        content_size=len(contents),
    )
