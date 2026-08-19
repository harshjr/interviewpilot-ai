"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Brain, Mic, Send, Upload, ChevronRight, Loader2,
  CheckCircle, AlertCircle, RotateCcw, FileText
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  startInterview, getFeedback, analyzeResume,
  type StartInterviewResponse, type FeedbackResponse, type ResumeAnalyzeResponse,
} from "@/lib/api";

type DemoStep = "intro" | "interview" | "feedback" | "resume";

export function LiveDemo() {
  const [activeTab, setActiveTab] = useState<DemoStep>("interview");
  const [interviewState, setInterviewState] = useState<StartInterviewResponse | null>(null);
  const [feedbackState, setFeedbackState] = useState<FeedbackResponse | null>(null);
  const [resumeState, setResumeState] = useState<ResumeAnalyzeResponse | null>(null);
  const [answer, setAnswer] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Start interview mutation
  const startMutation = useMutation({
    mutationFn: () => startInterview({ interview_type: "machine_learning", role: "ML Engineer", difficulty: "senior" }),
    onSuccess: (data) => {
      setInterviewState(data);
      setFeedbackState(null);
      setAnswer("");
    },
  });

  // Feedback mutation
  const feedbackMutation = useMutation({
    mutationFn: () => getFeedback({
      interview_id: interviewState!.interview_id,
      question: interviewState!.first_question,
      answer,
    }),
    onSuccess: (data) => setFeedbackState(data),
  });

  // Resume mutation
  const resumeMutation = useMutation({
    mutationFn: (file: File) => analyzeResume(file),
    onSuccess: (data) => setResumeState(data),
  });

  const handleFileUpload = useCallback((file: File) => {
    resumeMutation.mutate(file);
  }, [resumeMutation]);

  const tabs = [
    { id: "interview" as DemoStep, label: "Mock Interview", icon: Mic },
    { id: "resume" as DemoStep, label: "Resume Analysis", icon: FileText },
  ];

  return (
    <section id="product" className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{ background: "var(--surface-2)" }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-12">
          <div className="badge badge-blue mx-auto mb-4 w-fit">Live Product Demo</div>
          <h2 className="text-display font-extrabold tracking-tight mb-4" style={{ color: "var(--text)" }}>
            See it in <span className="text-gradient">action</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            This is a real API call — not a recording. Try it now.
          </p>
        </ScrollReveal>

        {/* Tab switcher */}
        <ScrollReveal delay={0.1}>
          <div
            className="flex gap-1 p-1 rounded-xl w-fit mx-auto mb-8 border"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-primary-600 to-secondary-500 text-white shadow-sm"
                    : ""
                }`}
                style={activeTab !== tab.id ? { color: "var(--text-muted)" } : {}}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Demo panel */}
        <ScrollReveal delay={0.2}>
          <AnimatePresence mode="wait">
            {activeTab === "interview" ? (
              <motion.div
                key="interview"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div
                  className="rounded-2xl border overflow-hidden shadow-xl"
                  style={{ background: "var(--surface)", borderColor: "var(--border)" }}
                >
                  {/* Window bar */}
                  <div
                    className="px-5 py-3 border-b flex items-center justify-between"
                    style={{ background: "var(--surface-2)", borderBottomColor: "var(--border)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400/70" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                        <div className="w-3 h-3 rounded-full bg-green-400/70" />
                      </div>
                      <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                        InterviewPilot — Senior ML Engineer Interview
                      </span>
                    </div>
                    {interviewState && (
                      <button
                        onClick={() => { setInterviewState(null); setFeedbackState(null); setAnswer(""); }}
                        className="flex items-center gap-1 text-xs transition-colors hover:text-red-500"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <RotateCcw className="w-3 h-3" />
                        Reset
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-[1fr_280px] min-h-[420px]">
                    {/* Main chat area */}
                    <div className="p-6 flex flex-col gap-5 border-r" style={{ borderColor: "var(--border)" }}>
                      {!interviewState ? (
                        /* Start state */
                        <div className="flex-1 flex flex-col items-center justify-center text-center gap-5">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center shadow-glow">
                            <Brain className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-1" style={{ color: "var(--text)" }}>
                              Ready to practice?
                            </h3>
                            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                              Start a Senior ML Engineer interview session. The AI will ask a real question and evaluate your response.
                            </p>
                          </div>
                          <button
                            onClick={() => startMutation.mutate()}
                            disabled={startMutation.isPending}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 transition-all duration-200 hover:scale-[1.02] hover:shadow-glow disabled:opacity-60 disabled:scale-100"
                          >
                            {startMutation.isPending ? (
                              <><Loader2 className="w-4 h-4 animate-spin" />Starting interview...</>
                            ) : (
                              <><Mic className="w-4 h-4" />Start Interview</>
                            )}
                          </button>
                        </div>
                      ) : (
                        <>
                          {/* AI Question */}
                          <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center flex-shrink-0">
                              <Brain className="w-3.5 h-3.5 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>
                                AI Interviewer
                              </p>
                              <div
                                className="rounded-2xl rounded-tl-sm p-4 text-sm leading-relaxed"
                                style={{ background: "var(--surface-2)", color: "var(--text)" }}
                              >
                                {interviewState.first_question}
                              </div>
                              {interviewState.tips.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                  {interviewState.tips.slice(0, 2).map((tip, i) => (
                                    <div
                                      key={i}
                                      className="flex items-start gap-1.5 text-[11px] p-2 rounded-lg"
                                      style={{ background: "rgba(37,99,235,0.07)", color: "var(--text-muted)" }}
                                    >
                                      <ChevronRight className="w-3 h-3 text-primary-500 flex-shrink-0 mt-0.5" />
                                      {tip}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* User Answer or Feedback */}
                          {!feedbackState ? (
                            <div className="flex flex-col gap-3 mt-auto">
                              <textarea
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Type your answer here — be detailed and specific..."
                                rows={4}
                                className="w-full rounded-xl px-4 py-3 text-sm resize-none border focus:outline-none focus:ring-2 focus:ring-primary-500/40 transition-all"
                                style={{
                                  background: "var(--surface-2)",
                                  color: "var(--text)",
                                  borderColor: "var(--border)",
                                }}
                              />
                              <button
                                onClick={() => feedbackMutation.mutate()}
                                disabled={!answer.trim() || feedbackMutation.isPending}
                                className="self-end inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {feedbackMutation.isPending ? (
                                  <><Loader2 className="w-4 h-4 animate-spin" />Analyzing...</>
                                ) : (
                                  <><Send className="w-4 h-4" />Submit Answer</>
                                )}
                              </button>
                            </div>
                          ) : (
                            /* User answer shown */
                            <div className="flex gap-3 flex-row-reverse">
                              <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                You
                              </div>
                              <div
                                className="flex-1 rounded-2xl rounded-tr-sm p-4 text-sm leading-relaxed text-white bg-gradient-to-br from-primary-600 to-secondary-500"
                              >
                                {answer}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Feedback panel */}
                    <div className="p-5 flex flex-col gap-4">
                      <h4 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                        AI Feedback
                      </h4>

                      {!feedbackState ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 py-8">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{ background: "var(--surface-2)" }}
                          >
                            <Brain className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
                          </div>
                          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                            {interviewState
                              ? "Submit your answer to receive detailed AI feedback"
                              : "Start the interview to see live feedback"}
                          </p>
                        </div>
                      ) : (
                        <AnimatePresence>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col gap-3"
                          >
                            {/* Scores */}
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                { label: "Communication", value: feedbackState.communication_score },
                                { label: "Technical", value: feedbackState.technical_score },
                              ].map((item) => (
                                <div key={item.label} className="rounded-xl p-3 text-center" style={{ background: "var(--surface-2)" }}>
                                  <div className="text-2xl font-extrabold text-gradient">{item.value}</div>
                                  <div className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>{item.label}</div>
                                </div>
                              ))}
                            </div>

                            {/* Feedback items */}
                            <div className="flex flex-col gap-2">
                              {feedbackState.feedback_items.map((item, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: 12 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.08 }}
                                  className="flex items-start gap-2 text-xs rounded-lg p-2.5"
                                  style={{ background: "var(--surface-2)" }}
                                >
                                  {item.type === "strength" ? (
                                    <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                                  ) : (
                                    <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                                  )}
                                  <span style={{ color: "var(--text)" }}>{item.text}</span>
                                </motion.div>
                              ))}
                            </div>

                            {/* Follow-up */}
                            <div className="rounded-xl p-3 border" style={{ borderColor: "rgba(37,99,235,0.2)", background: "rgba(37,99,235,0.06)" }}>
                              <p className="text-[10px] font-semibold text-primary-600 dark:text-primary-400 mb-1">Follow-up question:</p>
                              <p className="text-xs leading-relaxed" style={{ color: "var(--text)" }}>
                                {feedbackState.follow_up_question}
                              </p>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Resume tab */
              <motion.div
                key="resume"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div
                  className="rounded-2xl border overflow-hidden shadow-xl"
                  style={{ background: "var(--surface)", borderColor: "var(--border)" }}
                >
                  <div className="grid md:grid-cols-2 min-h-[420px]">
                    {/* Upload panel */}
                    <div className="p-8 flex flex-col items-center justify-center border-r" style={{ borderColor: "var(--border)" }}>
                      <input
                        ref={fileRef}
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                      />
                      <div
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragOver(false);
                          const file = e.dataTransfer.files[0];
                          if (file) handleFileUpload(file);
                        }}
                        onClick={() => fileRef.current?.click()}
                        className={`w-full border-2 border-dashed rounded-2xl p-10 flex flex-col items-center gap-4 cursor-pointer transition-all duration-200 ${
                          dragOver ? "border-primary-500 scale-[1.01]" : ""
                        }`}
                        style={{
                          borderColor: dragOver ? "var(--primary)" : "var(--border)",
                          background: dragOver ? "rgba(37,99,235,0.05)" : "var(--surface-2)",
                        }}
                      >
                        {resumeMutation.isPending ? (
                          <>
                            <Loader2 className="w-10 h-10 animate-spin text-primary-500" />
                            <p className="text-sm font-medium" style={{ color: "var(--text)" }}>Analyzing resume...</p>
                          </>
                        ) : (
                          <>
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center">
                              <Upload className="w-7 h-7 text-white" />
                            </div>
                            <div className="text-center">
                              <p className="font-semibold text-sm mb-1" style={{ color: "var(--text)" }}>
                                Drop your resume here
                              </p>
                              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                                PDF, DOCX, or TXT · Max 5MB
                              </p>
                            </div>
                            <button className="px-4 py-2 rounded-lg text-sm font-medium border transition-all hover:border-primary-500"
                              style={{ borderColor: "var(--border)", color: "var(--text)" }}>
                              Browse files
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Results panel */}
                    <div className="p-6 flex flex-col gap-4">
                      <h4 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                        Analysis Results
                      </h4>

                      {!resumeState ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 py-8">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "var(--surface-2)" }}>
                            <FileText className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
                          </div>
                          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                            Upload your resume to see personalized interview questions and skill analysis
                          </p>
                        </div>
                      ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4 overflow-auto">
                          {/* Resume score */}
                          <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "var(--surface-2)" }}>
                            <div className="text-3xl font-extrabold text-gradient">{resumeState.resume_score}</div>
                            <div>
                              <p className="text-xs font-semibold" style={{ color: "var(--text)" }}>Resume Score</p>
                              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Matched: {resumeState.roles_matched[0]}</p>
                            </div>
                          </div>

                          {/* Top skills */}
                          <div>
                            <p className="text-xs font-semibold mb-2" style={{ color: "var(--text)" }}>Detected Skills</p>
                            <div className="flex flex-wrap gap-1.5">
                              {Object.entries(resumeState.skill_breakdown).slice(0, 6).map(([skill, score]) => (
                                <span key={skill} className="badge badge-blue text-[10px]">{skill} · {score}%</span>
                              ))}
                            </div>
                          </div>

                          {/* Suggested questions */}
                          <div>
                            <p className="text-xs font-semibold mb-2" style={{ color: "var(--text)" }}>Suggested Questions</p>
                            <div className="flex flex-col gap-1.5">
                              {resumeState.suggested_questions.slice(0, 3).map((q, i) => (
                                <div key={i} className="flex items-start gap-2 text-[11px] p-2 rounded-lg" style={{ background: "var(--surface-2)" }}>
                                  <ChevronRight className="w-3 h-3 text-primary-500 flex-shrink-0 mt-0.5" />
                                  <span style={{ color: "var(--text)" }}>{q}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Missing skills */}
                          <div>
                            <p className="text-xs font-semibold mb-2 text-amber-600 dark:text-amber-400">Skill Gaps to Address</p>
                            {resumeState.missing_skills.map((s, i) => (
                              <div key={i} className="flex items-center gap-2 text-[11px] py-1" style={{ color: "var(--text-muted)" }}>
                                <AlertCircle className="w-3 h-3 text-amber-500" />
                                {s}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollReveal>
      </div>
    </section>
  );
}
