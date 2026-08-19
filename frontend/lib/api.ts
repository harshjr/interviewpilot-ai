const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ── Types ──────────────────────────────────────────────────────────────────

export type InterviewType =
  | "technical"
  | "behavioral"
  | "system_design"
  | "data_structures"
  | "machine_learning";

export interface StartInterviewRequest {
  interview_type: InterviewType;
  role: string;
  difficulty: "junior" | "mid" | "senior" | "staff";
}

export interface StartInterviewResponse {
  interview_id: string;
  interview_type: InterviewType;
  role: string;
  difficulty: string;
  first_question: string;
  question_index: number;
  total_questions: number;
  tips: string[];
}

export interface FeedbackItem {
  type: "strength" | "improvement";
  icon: string;
  text: string;
}

export interface FeedbackResponse {
  interview_id: string;
  feedback_items: FeedbackItem[];
  communication_score: number;
  technical_score: number;
  overall_score: number;
  follow_up_question: string;
  summary: string;
}

export interface SkillScore {
  label: string;
  score: number;
  delta: number;
}

export interface RecentSession {
  date: string;
  type: string;
  score: number;
  duration_minutes: number;
}

export interface DashboardResponse {
  interview_readiness: number;
  communication: number;
  technical_accuracy: number;
  problem_solving: number;
  sessions_completed: number;
  streak_days: number;
  skill_scores: SkillScore[];
  recent_sessions: RecentSession[];
  next_milestone: string;
}

export interface ResumeAnalyzeResponse {
  suggested_questions: string[];
  skill_breakdown: Record<string, number>;
  strength_areas: string[];
  missing_skills: string[];
  resume_score: number;
  roles_matched: string[];
}

// ── Fetcher ────────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ── API Functions ──────────────────────────────────────────────────────────

export async function startInterview(
  data: StartInterviewRequest
): Promise<StartInterviewResponse> {
  return apiFetch<StartInterviewResponse>("/api/interview/start", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getFeedback(data: {
  interview_id: string;
  question: string;
  answer: string;
}): Promise<FeedbackResponse> {
  return apiFetch<FeedbackResponse>("/api/interview/feedback", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getDashboard(): Promise<DashboardResponse> {
  return apiFetch<DashboardResponse>("/api/dashboard");
}

export async function analyzeResume(file: File): Promise<ResumeAnalyzeResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/api/resume/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Upload failed" }));
    throw new Error(error.detail || `HTTP ${res.status}`);
  }

  return res.json() as Promise<ResumeAnalyzeResponse>;
}

export async function checkHealth(): Promise<{ status: string; version: string }> {
  return apiFetch("/api/health");
}
