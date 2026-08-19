from pydantic import BaseModel, Field


class ResumeAnalyzeResponse(BaseModel):
    suggested_questions: list[str]
    skill_breakdown: dict[str, int]  # skill name -> proficiency 0-100
    strength_areas: list[str]
    missing_skills: list[str]
    resume_score: int = Field(ge=0, le=100)
    roles_matched: list[str]
