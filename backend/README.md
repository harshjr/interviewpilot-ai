# InterviewPilot AI — Backend

FastAPI-powered backend for the InterviewPilot AI platform.

## Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

## Run

```bash
uvicorn app.main:app --reload --port 8000
```

API docs available at: http://localhost:8000/docs

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| POST | `/api/interview/start` | Start a mock interview session |
| POST | `/api/interview/feedback` | Get AI feedback on an answer |
| GET | `/api/dashboard` | Get interview analytics |
| POST | `/api/resume/analyze` | Upload and analyze a resume |

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   └── routes/          # Route handlers
│   │       ├── health.py
│   │       ├── interview.py
│   │       ├── dashboard.py
│   │       └── resume.py
│   ├── services/            # Business logic
│   │   ├── interview_service.py
│   │   ├── dashboard_service.py
│   │   └── resume_service.py
│   ├── schemas/             # Pydantic models
│   │   ├── interview.py
│   │   ├── dashboard.py
│   │   └── resume.py
│   ├── core/
│   │   └── config.py        # Environment config
│   └── main.py              # App entrypoint
├── requirements.txt
└── .env.example
```

## Deployment (Render / Railway)

Set `FRONTEND_URL` environment variable to your production frontend URL.

```
FRONTEND_URL=https://your-app.vercel.app
APP_ENV=production
```
