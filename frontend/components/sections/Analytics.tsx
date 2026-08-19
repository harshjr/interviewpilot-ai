"use client";

import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, useInView } from "framer-motion";
import { TrendingUp, TrendingDown, Flame, CheckCircle2, Target, Loader2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { getDashboard, type DashboardResponse } from "@/lib/api";

function ProgressBar({ score, delay = 0 }: { score: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="progress-bar">
      <motion.div
        className="progress-fill"
        initial={{ width: "0%" }}
        animate={inView ? { width: `${score}%` } : { width: "0%" }}
        transition={{ duration: 1.2, delay, ease: [0.65, 0, 0.35, 1] }}
      />
    </div>
  );
}

function CircleScore({ score, size = 100 }: { score: number; size?: number }) {
  const ref = useRef<SVGCircleElement>(null);
  const inView = useInView({ current: ref.current }, { once: true });
  const r = 38;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100" className="-rotate-90">
        <circle
          cx="50" cy="50" r={r}
          fill="none"
          stroke="var(--surface-2)"
          strokeWidth="8"
        />
        <motion.circle
          ref={ref}
          cx="50" cy="50" r={r}
          fill="none"
          stroke="url(#scoreGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={inView ? { strokeDashoffset: circumference * (1 - score / 100) } : {}}
          transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-extrabold text-gradient">
          <AnimatedCounter end={score} suffix="%" duration={1.4} />
        </span>
      </div>
    </div>
  );
}

// Fallback static data while API loads
const STATIC_DATA: DashboardResponse = {
  interview_readiness: 84,
  communication: 78,
  technical_accuracy: 91,
  problem_solving: 88,
  sessions_completed: 12,
  streak_days: 5,
  skill_scores: [
    { label: "System Design", score: 87, delta: 5 },
    { label: "Data Structures", score: 92, delta: 3 },
    { label: "Algorithms", score: 85, delta: -2 },
    { label: "Behavioral", score: 76, delta: 8 },
    { label: "Communication", score: 78, delta: 4 },
    { label: "Machine Learning", score: 91, delta: 6 },
  ],
  recent_sessions: [
    { date: "Aug 18, 2026", type: "System Design", score: 87, duration_minutes: 42 },
    { date: "Aug 16, 2026", type: "Technical", score: 83, duration_minutes: 35 },
    { date: "Aug 14, 2026", type: "Behavioral", score: 79, duration_minutes: 28 },
  ],
  next_milestone: "Complete 3 more sessions to reach Expert tier",
};

export function Analytics() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
    retry: false,
  });

  const d = data ?? STATIC_DATA;

  const mainMetrics = [
    { label: "Interview Readiness", value: d.interview_readiness, desc: "Overall score" },
    { label: "Communication", value: d.communication, desc: "Clarity & structure" },
    { label: "Technical Accuracy", value: d.technical_accuracy, desc: "Correctness" },
    { label: "Problem Solving", value: d.problem_solving, desc: "Approach quality" },
  ];

  return (
    <section id="analytics" className="py-24">
      <div className="section-container">
        <ScrollReveal className="text-center mb-14">
          <div className="badge badge-blue mx-auto mb-4 w-fit">Analytics Dashboard</div>
          <h2 className="text-display font-extrabold tracking-tight mb-4" style={{ color: "var(--text)" }}>
            Track your <span className="text-gradient">readiness</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Every session generates data. See exactly where you stand and what to improve.
          </p>
        </ScrollReveal>

        {/* Main dashboard card */}
        <ScrollReveal delay={0.1}>
          <div
            className="rounded-2xl border overflow-hidden shadow-xl max-w-5xl mx-auto"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            {/* Dashboard header */}
            <div
              className="px-6 py-4 border-b flex items-center justify-between"
              style={{ background: "var(--surface-2)", borderBottomColor: "var(--border)" }}
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <div className="w-3 h-3 rounded-full bg-green-400/70" />
                </div>
                <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                  Interview Analytics
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                  {d.streak_days}-day streak
                </div>
                <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(37,99,235,0.1)", color: "var(--primary)" }}>
                  <CheckCircle2 className="w-3 h-3" />
                  {d.sessions_completed} sessions
                </div>
                {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" style={{ color: "var(--text-muted)" }} />}
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_280px]">
              {/* Left: main metrics */}
              <div className="p-6 border-r" style={{ borderColor: "var(--border)" }}>
                {/* Readiness circles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-8">
                  {mainMetrics.map((m, i) => (
                    <div key={m.label} className="flex flex-col items-center gap-2 text-center">
                      <CircleScore score={m.value} size={90} />
                      <div>
                        <p className="text-xs font-semibold" style={{ color: "var(--text)" }}>{m.label}</p>
                        <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Skill breakdown */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>
                    Skill Breakdown
                  </h4>
                  <div className="space-y-3">
                    {d.skill_scores.map((skill, i) => (
                      <div key={skill.label} className="flex items-center gap-4">
                        <span className="text-xs w-28 flex-shrink-0 font-medium" style={{ color: "var(--text)" }}>
                          {skill.label}
                        </span>
                        <div className="flex-1">
                          <ProgressBar score={skill.score} delay={i * 0.08} />
                        </div>
                        <div className="flex items-center gap-1 w-14 justify-end">
                          <span className="text-xs font-bold" style={{ color: "var(--text)" }}>{skill.score}</span>
                          <span
                            className={`text-[10px] flex items-center gap-0.5 ${
                              skill.delta >= 0 ? "text-green-500" : "text-red-400"
                            }`}
                          >
                            {skill.delta >= 0 ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {Math.abs(skill.delta)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: recent sessions + milestone */}
              <div className="p-5 flex flex-col gap-5">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
                    Recent Sessions
                  </h4>
                  <div className="space-y-2">
                    {d.recent_sessions.map((session, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-xl"
                        style={{ background: "var(--surface-2)" }}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate" style={{ color: "var(--text)" }}>
                            {session.type}
                          </p>
                          <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                            {session.date} · {session.duration_minutes} min
                          </p>
                        </div>
                        <div
                          className="text-sm font-extrabold"
                          style={{
                            color: session.score >= 85 ? "#10b981" : session.score >= 75 ? "#f59e0b" : "#ef4444",
                          }}
                        >
                          {session.score}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Next milestone */}
                <div
                  className="rounded-xl p-4 border"
                  style={{
                    background: "rgba(37,99,235,0.06)",
                    borderColor: "rgba(37,99,235,0.18)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-3.5 h-3.5 text-primary-500" />
                    <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">Next Milestone</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text)" }}>
                    {d.next_milestone}
                  </p>
                  <div className="mt-3">
                    <ProgressBar score={60} delay={0.5} />
                  </div>
                </div>

                {/* Overall big number */}
                <div className="text-center py-3">
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Overall Readiness</p>
                  <div className="text-5xl font-black text-gradient mt-1">
                    <AnimatedCounter end={d.interview_readiness} suffix="%" duration={1.6} />
                  </div>
                  <p className="text-[11px] mt-1.5" style={{ color: "var(--text-muted)" }}>
                    Top 25% of candidates
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
