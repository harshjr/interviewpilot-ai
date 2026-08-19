# InterviewPilot AI 🚀

> **Ace Your Next Technical Interview**
> Production-grade AI mock interview platform built with **Next.js 15**, **FastAPI**, **Tailwind CSS**, and **Framer Motion**.

---

## ⚡ Quick Start (Running Locally)

To run the complete full-stack application, open two terminal tabs (one for backend, one for frontend):

### 1. Start the Backend (FastAPI)

```bash
cd backend

# Create & activate virtual environment (if not already done)
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server on port 8000
uvicorn app.main:app --reload --port 8000
```
- **Backend API URL**: `http://localhost:8000`
- **Interactive Swagger Docs**: `http://localhost:8000/docs`
- **Health check**: `http://localhost:8000/api/health`

---

### 2. Start the Frontend (Next.js 15)

```bash
cd frontend

# Install packages (if not already installed)
npm install

# Start Next.js development server on port 3000
npm run dev
```
- **Web App URL**: `http://localhost:3000`

---

## 🌟 Key Features & Interactivity

1. **Interactive Live Product Demo**:
   - Start real AI mock interviews with dynamic technical / machine learning / system design questions.
   - Type or speak answers and submit to receive instant AI evaluation with strength badges, areas of improvement, and communication / technical scores.
   - Drop real resume files (PDF, DOCX, TXT) for instant skill parsing and generated interview questions.
2. **Real-time Analytics Dashboard**:
   - Dynamic animated circular and linear score counters.
   - Skill mastery breakdown with delta progress indicators.
3. **Genuine Dark Mode Support**:
   - Clean theme switcher in the navigation bar with dedicated color tokens.
4. **Easter Egg (Staff Engineer Mode)**:
   - Press the Konami Code: `↑ ↑ ↓ ↓ ← → ← → B A` anywhere on the page!

---

## 🏗️ Architecture

```
AcdyON/
├── backend/                  # FastAPI Application (Python 3.12+)
│   ├── app/
│   │   ├── api/routes/       # Endpoints: health, interview, dashboard, resume
│   │   ├── core/             # Configuration & environment settings
│   │   ├── schemas/          # Pydantic validation schemas
│   │   ├── services/         # Business logic & AI generation algorithms
│   │   └── main.py           # App entrypoint & CORS middleware
│   └── requirements.txt
│
└── frontend/                 # Next.js 15 Application (TypeScript + Tailwind)
    ├── app/                  # App Router, Layouts, & Theme Providers
    ├── components/
    │   ├── sections/         # Hero, LiveDemo, Features, HowItWorks, Analytics, FinalCTA, Footer
    │   └── ui/               # Navbar, AnimatedCounter, ScrollReveal, Providers
    ├── hooks/                # Custom hooks (useKonamiCode)
    └── lib/                  # Type-safe API client & TanStack Query integrations
```
