"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Mic, Brain, ChevronRight, Sparkles } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

function MockInterviewUI() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[580px] mx-auto lg:mx-0"
    >
      {/* Decorative glow */}
      <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-r from-primary-500/20 to-secondary-500/20 blur-2xl opacity-60" />

      <div
        className="relative rounded-[20px] overflow-hidden shadow-2xl border"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        {/* Window chrome */}
        <div
          className="px-4 py-3 flex items-center gap-2 border-b"
          style={{ background: "var(--surface-2)", borderBottomColor: "var(--border)" }}
        >
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <div className="w-3 h-3 rounded-full bg-green-400/80" />
          <div className="mx-auto flex items-center gap-2 px-3 py-1 rounded-md text-xs" style={{ background: "var(--surface)", color: "var(--text-muted)" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            interviewpilot.ai — Mock Interview in Progress
          </div>
        </div>

        {/* AI Interviewer */}
        <div className="p-5 space-y-4">
          {/* AI Avatar + question */}
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center flex-shrink-0">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>AI Interviewer</span>
                <span className="badge badge-blue text-[10px]">GPT-4</span>
              </div>
              <div
                className="rounded-2xl rounded-tl-sm p-3.5 text-sm leading-relaxed"
                style={{ background: "var(--surface-2)", color: "var(--text)" }}
              >
                Tell me about a machine learning project where you improved model performance. Walk me through your approach and the measurable impact.
              </div>
            </div>
          </div>

          {/* User response — typing effect */}
          <div className="flex gap-3 flex-row-reverse">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
              You
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-end gap-2 mb-1.5">
                <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>Your Response</span>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-[10px] font-medium">
                  <Mic className="w-2.5 h-2.5" />
                  Live
                </div>
              </div>
              <div className="rounded-2xl rounded-tr-sm p-3.5 text-sm leading-relaxed bg-gradient-to-br from-primary-600 to-secondary-500 text-white">
                At my last role, I optimized a churn prediction model by implementing feature engineering on user behavior sequences. I switched from logistic regression to a gradient-boosted ensemble, which improved AUC-ROC from 0.71 to 0.89...
                <span className="inline-block w-0.5 h-4 bg-white/60 ml-0.5 animate-pulse align-middle" />
              </div>
            </div>
          </div>

          {/* Score bar */}
          <div
            className="rounded-xl p-3 text-xs space-y-2"
            style={{ background: "var(--surface-2)" }}
          >
            <div className="flex justify-between items-center" style={{ color: "var(--text-muted)" }}>
              <span>Real-time confidence score</span>
              <span className="font-semibold text-green-500">87%</span>
            </div>
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: "0%" }}
                animate={{ width: "87%" }}
                transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
              />
            </div>
            <div className="flex gap-3 pt-0.5">
              {["Technical depth", "Clarity", "Structure"].map((tag) => (
                <span key={tag} className="badge badge-blue">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 bg-gradient-mesh dark:bg-gradient-mesh-dark" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/8 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-secondary-500/8 rounded-full blur-3xl" />

      <div className="section-container relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="badge badge-blue w-fit gap-1.5">
                <Sparkles className="w-3 h-3" />
                AI-Powered Interview Prep
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-hero font-extrabold tracking-tight"
              style={{ color: "var(--text)" }}
            >
              Ace Your Next{" "}
              <span className="text-gradient">Technical</span>
              <br />
              Interview
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={itemVariants}
              className="text-lg leading-relaxed max-w-[480px]"
              style={{ color: "var(--text-muted)" }}
            >
              Practice with an AI interviewer that asks realistic questions, challenges your answers,
              and delivers actionable feedback — so your real interview isn&apos;t your first practice session.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
              <a
                href="#product"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 transition-all duration-200 hover:scale-[1.02] hover:shadow-glow text-sm"
              >
                <Mic className="w-4 h-4" />
                Start Mock Interview
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border hover:scale-[1.01] transition-all duration-200"
                style={{ color: "var(--text)", borderColor: "var(--border)", background: "var(--surface)" }}
              >
                <Play className="w-4 h-4 fill-current" />
                Watch Demo
              </a>
            </motion.div>

            {/* Social proof — honest */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 pt-2"
              style={{ color: "var(--text-muted)" }}
            >
              <div className="flex items-center gap-1.5 text-xs">
                <ChevronRight className="w-3 h-3 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <ChevronRight className="w-3 h-3 text-green-500" />
                Free to start
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <ChevronRight className="w-3 h-3 text-green-500" />
                Cancel anytime
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Mock UI */}
          <div className="flex justify-center lg:justify-end">
            <MockInterviewUI />
          </div>
        </div>
      </div>
    </section>
  );
}
