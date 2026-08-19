import random
from app.schemas.dashboard import DashboardResponse, SkillScore, RecentSession


async def get_dashboard_data() -> DashboardResponse:
    skill_scores = [
        SkillScore(label="System Design", score=87, delta=5),
        SkillScore(label="Data Structures", score=92, delta=3),
        SkillScore(label="Algorithms", score=85, delta=-2),
        SkillScore(label="Behavioral", score=76, delta=8),
        SkillScore(label="Communication", score=78, delta=4),
        SkillScore(label="Machine Learning", score=91, delta=6),
    ]

    recent_sessions = [
        RecentSession(date="Aug 18, 2026", type="System Design", score=87, duration_minutes=42),
        RecentSession(date="Aug 16, 2026", type="Technical", score=83, duration_minutes=35),
        RecentSession(date="Aug 14, 2026", type="Behavioral", score=79, duration_minutes=28),
        RecentSession(date="Aug 12, 2026", type="ML Deep Dive", score=91, duration_minutes=51),
    ]

    return DashboardResponse(
        interview_readiness=84,
        communication=78,
        technical_accuracy=91,
        problem_solving=88,
        sessions_completed=12,
        streak_days=5,
        skill_scores=skill_scores,
        recent_sessions=recent_sessions,
        next_milestone="Complete 3 more sessions to reach Expert tier",
    )
