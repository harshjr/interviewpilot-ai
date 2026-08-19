import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Electric blue primary
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        // Indigo secondary
        secondary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        // Neutral bg
        surface: {
          light: "#ffffff",
          dark: "#111318",
        },
        bg: {
          light: "#f8f9fb",
          dark: "#0a0b0f",
        },
        border: {
          light: "#e2e8f0",
          dark: "#1e2530",
        },
        muted: {
          light: "#64748b",
          dark: "#94a3b8",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero": ["clamp(2.5rem, 6vw, 5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display": ["clamp(1.75rem, 3.5vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "headline": ["clamp(1.25rem, 2vw, 1.75rem)", { lineHeight: "1.3", letterSpacing: "-0.02em" }],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "typing": "typing 0.05s steps(1) forwards",
        "blink": "blink 1s step-end infinite",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(37, 99, 235, 0)" },
          "50%": { boxShadow: "0 0 24px 4px rgba(37, 99, 235, 0.25)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-mesh": "radial-gradient(at 40% 20%, hsla(228,100%,74%,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,0.10) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,0.08) 0px, transparent 50%)",
        "gradient-mesh-dark": "radial-gradient(at 40% 20%, hsla(228,100%,30%,0.20) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(199,100%,30%,0.15) 0px, transparent 50%)",
      },
      boxShadow: {
        "card": "0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.06)",
        "card-hover": "0 10px 40px -10px rgba(37, 99, 235, 0.2), 0 4px 16px -4px rgba(0,0,0,0.12)",
        "glow": "0 0 24px 4px rgba(37, 99, 235, 0.25)",
        "glow-indigo": "0 0 24px 4px rgba(99, 102, 241, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
