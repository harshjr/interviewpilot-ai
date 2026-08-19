"use client";

import { motion } from "framer-motion";
import { Mic, FileText, Zap, BarChart3, MessageSquare, Target } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const features = [
  {
    icon: Mic,
    title: "Mock Technical Interviews",
    description:
      "Practice with realistic technical, behavioral, and system design questions tailored to your target role and experience level.",
    gradient: "from-primary-600 to-primary-400",
    accent: "rgba(37,99,235,0.08)",
    accentBorder: "rgba(37,99,235,0.15)",
    preview: (
      <div className="mt-4 space-y-2">
        {["System Design", "Data Structures", "Machine Learning", "Behavioral"].map((type, i) => (
          <div
            key={type}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium"
            style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500"][i]}`} />
            {type} Interview
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: FileText,
    title: "Resume-Based Question Generation",
    description:
      "Upload your resume and get questions specifically crafted around your experience, skills, and the projects you've built.",
    gradient: "from-secondary-600 to-secondary-400",
    accent: "rgba(99,102,241,0.08)",
    accentBorder: "rgba(99,102,241,0.15)",
    preview: (
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 p-3 rounded-lg border" style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}>
          <FileText className="w-4 h-4 text-secondary-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium truncate" style={{ color: "var(--text)" }}>resume_v3.pdf</div>
            <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>Uploaded · 12 questions generated</div>
          </div>
          <div className="text-[10px] font-semibold text-green-500">✓ Done</div>
        </div>
        <div className="text-[11px] p-2.5 rounded-lg" style={{ background: "rgba(99,102,241,0.07)", color: "var(--text-muted)" }}>
          &ldquo;Tell me about your experience with distributed systems at scale...&rdquo;
        </div>
      </div>
    ),
  },
  {
    icon: Zap,
    title: "Real-Time AI Feedback",
    description:
      "Get instant, structured feedback on every answer — strengths, gaps, communication quality, and concrete suggestions to improve.",
    gradient: "from-amber-500 to-orange-400",
    accent: "rgba(245,158,11,0.08)",
    accentBorder: "rgba(245,158,11,0.15)",
    preview: (
      <div className="mt-4 space-y-1.5">
        {[
          { icon: "✓", text: "Strong technical explanation", color: "text-green-500" },
          { icon: "✓", text: "Clear ownership demonstrated", color: "text-green-500" },
          { icon: "⚠", text: "Quantify business impact", color: "text-amber-500" },
          { icon: "⚠", text: "Explain evaluation metrics", color: "text-amber-500" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-xs p-2 rounded-lg"
            style={{ background: "var(--surface-2)" }}
          >
            <span className={`text-sm ${item.color} flex-shrink-0`}>{item.icon}</span>
            <span style={{ color: "var(--text)" }}>{item.text}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: BarChart3,
    title: "Interview Readiness Score",
    description:
      "Track your progress over time with a composite readiness score across communication, technical accuracy, and problem-solving.",
    gradient: "from-emerald-600 to-teal-400",
    accent: "rgba(16,185,129,0.08)",
    accentBorder: "rgba(16,185,129,0.15)",
    preview: (
      <div className="mt-4 space-y-2">
        {[
          { label: "Readiness", value: 84, color: "from-primary-600 to-secondary-500" },
          { label: "Technical", value: 91, color: "from-emerald-500 to-teal-400" },
          { label: "Communication", value: 78, color: "from-amber-500 to-orange-400" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="text-[11px] w-24 flex-shrink-0" style={{ color: "var(--text-muted)" }}>{item.label}</span>
            <div className="flex-1 h-1.5 rounded-full" style={{ background: "var(--surface-2)" }}>
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                initial={{ width: "0%" }}
                whileInView={{ width: `${item.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              />
            </div>
            <span className="text-[11px] font-semibold w-8 text-right" style={{ color: "var(--text)" }}>{item.value}%</span>
          </div>
        ))}
      </div>
    ),
  },
];

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="section-container">
        <ScrollReveal className="text-center mb-14">
          <div className="badge badge-blue mx-auto mb-4 w-fit">Features</div>
          <h2 className="text-display font-extrabold tracking-tight mb-4" style={{ color: "var(--text)" }}>
            Everything you need to{" "}
            <span className="text-gradient">prepare</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Built for engineers who take their career seriously.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-5">
          {features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={i * 0.1}>
              <motion.div
                className="card p-6 h-full group cursor-default"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}
                >
                  <feature.icon className="w-5 h-5 text-white" />
                </div>

                {/* Text */}
                <h3 className="font-bold text-[17px] mb-2" style={{ color: "var(--text)" }}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {feature.description}
                </p>

                {/* Preview */}
                {feature.preview}
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
