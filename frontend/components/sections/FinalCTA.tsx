"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mic, Zap } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function FinalCTA() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-secondary-950 dark:from-[#060810] dark:via-[#0d1424] dark:to-[#0b0b1e]" />
      <div className="absolute inset-0 bg-gradient-mesh-dark opacity-80" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />

      {/* Floating orbs */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-primary-600/15 blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-secondary-600/15 blur-3xl" />

      <div className="section-container relative z-10 text-center">
        <ScrollReveal>
          <div className="badge mx-auto mb-6 w-fit" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.1)" }}>
            <Zap className="w-3 h-3" />
            Start preparing today
          </div>

          <h2
            className="text-display font-extrabold tracking-tight mb-6 text-white"
            style={{ textShadow: "0 0 80px rgba(99,102,241,0.3)" }}
          >
            Your next interview should not be
            <br />
            <span
              className="relative"
              style={{
                background: "linear-gradient(135deg, #60a5fa 0%, #a5b4fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              your first practice session.
            </span>
          </h2>

          <p className="text-lg text-white/60 max-w-lg mx-auto mb-10 leading-relaxed">
            Every engineer who gets the role practiced before they got there.
            Start building your edge today — it's free.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#product"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-[15px] bg-white text-primary-700 hover:bg-primary-50 transition-all duration-200 shadow-lg"
            >
              <Mic className="w-4 h-4" />
              Start Preparing Today
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#features"
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-[15px] text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-200"
            >
              Learn more
            </motion.a>
          </div>

          {/* Small disclaimer */}
          <p className="mt-8 text-sm text-white/30">
            No credit card required · Free to start · No spam
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
