import random
from app.schemas.resume import ResumeAnalyzeResponse

QUESTION_TEMPLATES = [
    "Tell me about your experience with {skill} in a production environment.",
    "How have you used {skill} to solve a complex problem?",
    "Describe a project where {skill} was a critical component.",
    "What are the tradeoffs you've encountered when working with {skill}?",
    "Walk me through how you would architect a system using {skill}.",
]

COMMON_SKILLS = [
    "Python", "TypeScript", "React", "Node.js", "PostgreSQL", "Redis",
    "Docker", "Kubernetes", "AWS", "GCP", "FastAPI", "GraphQL",
    "Machine Learning", "Data Pipelines", "Microservices", "REST APIs",
]

MISSING_SKILLS_POOL = [
    "Distributed tracing (OpenTelemetry)",
    "Infrastructure as Code (Terraform)",
    "A/B testing frameworks",
    "Feature flag management",
    "MLOps practices",
    "Load testing (k6 / Locust)",
]

ROLES_POOL = [
    "Senior Software Engineer",
    "Full-Stack Engineer",
    "Backend Engineer",
    "Machine Learning Engineer",
    "Platform Engineer",
]


async def analyze_resume(filename: str, content_size: int) -> ResumeAnalyzeResponse:
    # In production, this would parse PDF/DOCX and use an LLM
    # For now, we simulate realistic output based on file presence
    detected_skills = random.sample(COMMON_SKILLS, random.randint(6, 10))
    missing = random.sample(MISSING_SKILLS_POOL, 3)
    matched_roles = random.sample(ROLES_POOL, 3)

    suggested_questions = [
        random.choice(QUESTION_TEMPLATES).format(skill=skill)
        for skill in detected_skills[:5]
    ]

    skill_breakdown = {skill: random.randint(60, 98) for skill in detected_skills}
    strength_areas = detected_skills[:3]
    resume_score = random.randint(72, 94)

    return ResumeAnalyzeResponse(
        suggested_questions=suggested_questions,
        skill_breakdown=skill_breakdown,
        strength_areas=strength_areas,
        missing_skills=missing,
        resume_score=resume_score,
        roles_matched=matched_roles,
    )
