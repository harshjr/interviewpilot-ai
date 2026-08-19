"use client";

import { motion } from "framer-motion";
import { Upload, ListChecks, Mic, BarChart3 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Resume",
    description:
      "Drop your resume in PDF, DOCX, or TXT format. InterviewPilot analyzes your experience, tech stack, and projects to understand your background.",
    color: "from-primary-600 to-primary-400",
    accent: "rgba(37,99,235,0.1)",
  },
  {
    number: "02",
    icon: ListChecks,
    title: "Choose Interview Type",
    description:
      "Select from technical, behavioral, system design, data structures, or ML interview modes — each calibrated to your target role and seniority level.",
    color: "from-secondary-600 to-secondary-400",
    accent: "rgba(99,102,241,0.1)",
  },
  {
    number: "03",
    icon: Mic,
    title: "Start Interview",
    description:
      "Respond to AI-generated questions tailored to your resume. Type or speak your answers — the AI challenges you with follow-ups just like a real interviewer.",
    color: "from-amber-500 to-orange-400",
    accent: "rgba(245,158,11,0.1)",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Receive Detailed Feedback",
    description:
      "Get a full breakdown: strengths, gaps, communication score, technical accuracy, and specific suggestions. Track your improvement over every session.",
    color: "from-emerald-600 to-teal-400",
    accent: "rgba(16,185,129,0.1)",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Subtle bg */}
      <div className="absolute inset-0 opacity-50" style={{ background: "var(--surface-2)" }} />

      <div className="section-container relative z-10">
        <ScrollReveal className="text-center mb-16">
          <div className="badge badge-blue mx-auto mb-4 w-fit">How It Works</div>
          <h2 className="text-display font-extrabold tracking-tight mb-4" style={{ color: "var(--text)" }}>
            From zero to <span className="text-gradient">interview-ready</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Four steps. Your first session takes under 5 minutes to start.
          </p>
        </ScrollReveal>

        {/* Steps */}
        <div className="relative">
          {/* Connector line - desktop only */}
          <div
            className="hidden lg:block absolute top-12 left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] h-px"
            style={{ background: "linear-gradient(90deg, transparent 0%, var(--border) 20%, var(--border) 80%, transparent 100%)" }}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.1} direction="up">
                <motion.div
                  className="card p-6 flex flex-col items-start group cursor-default relative"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {/* Step number + icon */}
                  <div className="flex items-center justify-between w-full mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}
                    >
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    <span
                      className="text-4xl font-black tabular-nums"
                      style={{ color: "var(--border)" }}
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-bold text-[16px] mb-2" style={{ color: "var(--text)" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {step.description}
                  </p>

                  {/* Bottom accent */}
                  <div
                    className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r"
                    style={{ backgroundImage: `linear-gradient(90deg, transparent, ${step.color.includes("primary") ? "#2563eb" : step.color.includes("secondary") ? "#6366f1" : step.color.includes("amber") ? "#f59e0b" : "#10b981"}, transparent)` }}
                  />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
