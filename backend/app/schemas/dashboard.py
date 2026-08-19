from pydantic import BaseModel, Field


class SkillScore(BaseModel):
    label: str
    score: int = Field(ge=0, le=100)
    delta: int  # change from last session (can be negative)


class RecentSession(BaseModel):
    date: str
    type: str
    score: int = Field(ge=0, le=100)
    duration_minutes: int


class DashboardResponse(BaseModel):
    interview_readiness: int = Field(ge=0, le=100)
    communication: int = Field(ge=0, le=100)
    technical_accuracy: int = Field(ge=0, le=100)
    problem_solving: int = Field(ge=0, le=100)
    sessions_completed: int
    streak_days: int
    skill_scores: list[SkillScore]
    recent_sessions: list[RecentSession]
    next_milestone: str
