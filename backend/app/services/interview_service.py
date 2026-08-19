import uuid
import random
from app.schemas.interview import (
    StartInterviewRequest,
    StartInterviewResponse,
    FeedbackRequest,
    FeedbackResponse,
    FeedbackItem,
    InterviewType,
)

QUESTIONS_BANK: dict[InterviewType, list[str]] = {
    InterviewType.technical: [
        "Tell me about a challenging engineering problem you solved and how you approached it.",
        "How would you design a rate limiter for a high-traffic API?",
        "Explain the difference between horizontal and vertical scaling. When would you choose each?",
        "Walk me through how you'd debug a production memory leak.",
        "Describe your experience with distributed systems and the tradeoffs you've navigated.",
    ],
    InterviewType.machine_learning: [
        "Tell me about a machine learning project where you improved model performance.",
        "How do you handle class imbalance in a binary classification problem?",
        "Explain the bias-variance tradeoff and how it influenced a model you built.",
        "Describe your process for feature engineering and selection.",
        "How would you deploy a machine learning model to production and monitor it?",
    ],
    InterviewType.system_design: [
        "Design a URL shortening service like bit.ly.",
        "How would you architect a real-time notification system for 10 million users?",
        "Design a distributed cache system.",
        "Walk me through how you'd design Twitter's trending topics feature.",
        "How would you build a search autocomplete system?",
    ],
    InterviewType.behavioral: [
        "Tell me about a time you had to make a decision with incomplete information.",
        "Describe a situation where you had to influence a decision without direct authority.",
        "Tell me about a time you failed and what you learned from it.",
        "How do you prioritize when you have multiple urgent tasks?",
        "Describe a time you mentored someone and what the outcome was.",
    ],
    InterviewType.data_structures: [
        "Explain how a hash map works internally and its time complexity.",
        "When would you use a heap over a sorted array?",
        "Walk me through solving the 'find the shortest path' problem.",
        "Describe the tradeoffs between BFS and DFS for graph traversal.",
        "How would you implement an LRU cache?",
    ],
}

TIPS_BANK = [
    "Use the STAR method: Situation, Task, Action, Result.",
    "Quantify your impact whenever possible.",
    "Think aloud — interviewers value your reasoning process.",
    "Ask clarifying questions before diving into your answer.",
    "Structure your response before speaking.",
]

STRENGTHS_BANK = [
    "Strong technical explanation with clear depth of knowledge",
    "Excellent use of concrete examples",
    "Clear ownership and accountability demonstrated",
    "Well-structured response with logical flow",
    "Good problem-decomposition approach",
    "Demonstrated awareness of tradeoffs",
]

IMPROVEMENTS_BANK = [
    "Quantify the business impact of your solution",
    "Explain the evaluation metrics you used",
    "Mention how you handled edge cases",
    "Describe how you communicated progress to stakeholders",
    "Include how you would measure success",
    "Discuss what you would do differently next time",
]

FOLLOW_UP_QUESTIONS = [
    "How did you measure the success of that decision?",
    "What would you do differently if you faced this problem today?",
    "How did this experience influence your subsequent work?",
    "What was the biggest technical risk, and how did you mitigate it?",
    "How did you align your team around this approach?",
]


async def start_interview(request: StartInterviewRequest) -> StartInterviewResponse:
    interview_id = str(uuid.uuid4())
    questions = QUESTIONS_BANK.get(request.interview_type, QUESTIONS_BANK[InterviewType.technical])
    first_question = questions[0]
    tips = random.sample(TIPS_BANK, 3)

    return StartInterviewResponse(
        interview_id=interview_id,
        interview_type=request.interview_type,
        role=request.role,
        difficulty=request.difficulty,
        first_question=first_question,
        question_index=1,
        total_questions=len(questions),
        tips=tips,
    )


async def generate_feedback(request: FeedbackRequest) -> FeedbackResponse:
    strengths = random.sample(STRENGTHS_BANK, random.randint(2, 3))
    improvements = random.sample(IMPROVEMENTS_BANK, random.randint(2, 3))

    feedback_items = [
        FeedbackItem(type="strength", icon="✓", text=s) for s in strengths
    ] + [
        FeedbackItem(type="improvement", icon="⚠", text=i) for i in improvements
    ]

    answer_length = len(request.answer.split())
    comm_base = min(95, max(55, 70 + answer_length // 10))
    tech_base = min(98, max(50, 75 + (len(request.answer) // 50)))

    communication_score = comm_base + random.randint(-5, 5)
    technical_score = tech_base + random.randint(-5, 5)
    overall_score = int((communication_score + technical_score) / 2)

    follow_up = random.choice(FOLLOW_UP_QUESTIONS)

    return FeedbackResponse(
        interview_id=request.interview_id,
        feedback_items=feedback_items,
        communication_score=min(100, communication_score),
        technical_score=min(100, technical_score),
        overall_score=min(100, overall_score),
        follow_up_question=follow_up,
        summary=(
            f"Your response demonstrated solid understanding. "
            f"Focus on quantifying your impact and explaining your evaluation criteria "
            f"to make your answers even more compelling."
        ),
    )
