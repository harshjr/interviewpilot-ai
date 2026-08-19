"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ExternalLink, MessageCircle, Link2 } from "lucide-react";
import { useKonamiCode } from "@/hooks/useKonamiCode";

function EasterEgg({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="easter-egg-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 16 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="easter-egg-card"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-5xl mb-4">🚀</div>
          <h2 className="text-2xl font-black text-white mb-2">
            Staff Engineer Mode
          </h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ background: "rgba(99,102,241,0.3)", color: "#a5b4fc" }}>
            ↑↑↓↓←→←→BA Unlocked
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            Congratulations. You&apos;ve unlocked Staff Engineer Mode.<br />
            You now have access to unlimited self-doubt, calendar tetris,
            and an innate ability to ask &ldquo;have you considered the edge cases?&rdquo; in every review.
          </p>
          <p className="text-white/30 text-xs mb-6">
            Just kidding. But seriously — you&apos;re clearly thorough. That&apos;s exactly the mindset that aces interviews. 💙
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white border border-white/20 hover:bg-white/10 transition-all"
          >
            Back to preparing
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function Footer() {
  const [easterEgg, setEasterEgg] = useState(false);
  useKonamiCode(() => setEasterEgg(true));

  return (
    <>
      {easterEgg && <EasterEgg onClose={() => setEasterEgg(false)} />}

      <footer
        className="py-12 border-t"
        style={{ borderTopColor: "var(--border)", background: "var(--surface)" }}
      >
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Logo + desc */}
            <div className="flex flex-col gap-3 max-w-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-bold text-[15px]" style={{ color: "var(--text)" }}>
                  InterviewPilot <span className="text-gradient">AI</span>
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                AI-powered interview preparation for engineers who take their career seriously.
              </p>
            </div>

            {/* Links */}
            <nav className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-3 text-sm">
              {[
                { label: "Product", href: "#product" },
                { label: "Features", href: "#features" },
                { label: "How it works", href: "#how-it-works" },
                { label: "Analytics", href: "#analytics" },
                { label: "Privacy", href: "#" },
                { label: "Terms", href: "#" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="link-underline transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { icon: ExternalLink, label: "GitHub", href: "#" },
                { icon: MessageCircle, label: "Twitter", href: "#" },
                { icon: Link2, label: "LinkedIn", href: "#" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div
            className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
            style={{ borderTopColor: "var(--border)", color: "var(--text-muted)" }}
          >
            <p>© 2026 InterviewPilot AI. Built with care.</p>
            <p>
              <span className="opacity-40">↑↑↓↓←→←→BA</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
