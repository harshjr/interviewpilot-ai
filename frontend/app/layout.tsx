import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/ui/Providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f9fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0b0f" },
  ],
};

export const metadata: Metadata = {
  title: "InterviewPilot AI — Ace Your Next Technical Interview",
  description:
    "Practice with an AI interviewer that asks realistic questions, challenges your answers, and delivers actionable feedback. Used by engineers preparing for top tech companies.",
  keywords: [
    "interview prep", "technical interview", "AI interview", "mock interview",
    "software engineer interview", "machine learning interview", "system design",
    "coding interview", "interview practice", "career prep",
  ],
  authors: [{ name: "InterviewPilot AI" }],
  openGraph: {
    title: "InterviewPilot AI — Ace Your Next Technical Interview",
    description: "AI-powered mock interviews with real-time feedback. Practice smarter, interview better.",
    type: "website",
    siteName: "InterviewPilot AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "InterviewPilot AI",
    description: "AI-powered mock interviews with real-time feedback.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
