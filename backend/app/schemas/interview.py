from pydantic import BaseModel, Field
from typing import Literal
from enum import Enum


class InterviewType(str, Enum):
    technical = "technical"
    behavioral = "behavioral"
    system_design = "system_design"
    data_structures = "data_structures"
    machine_learning = "machine_learning"


class StartInterviewRequest(BaseModel):
    interview_type: InterviewType = InterviewType.technical
    role: str = Field(default="Software Engineer", max_length=100)
    difficulty: Literal["junior", "mid", "senior", "staff"] = "mid"


class StartInterviewResponse(BaseModel):
    interview_id: str
    interview_type: InterviewType
    role: str
    difficulty: str
    first_question: str
    question_index: int
    total_questions: int
    tips: list[str]


class FeedbackRequest(BaseModel):
    interview_id: str
    question: str
    answer: str
    question_type: str = "technical"


class FeedbackItem(BaseModel):
    type: Literal["strength", "improvement"]
    icon: str
    text: str


class FeedbackResponse(BaseModel):
    interview_id: str
    feedback_items: list[FeedbackItem]
    communication_score: int = Field(ge=0, le=100)
    technical_score: int = Field(ge=0, le=100)
    overall_score: int = Field(ge=0, le=100)
    follow_up_question: str
    summary: str
