import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthSessionProvider } from "@/components/providers/session-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GenWeb Studio | AI Website Architect & Visual Canvas",
  description:
    "AI-powered, no-code website builder with multi-layout synthesis and drag-and-drop precision.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark bg-black`}>
      <body className="min-h-screen bg-black text-white antialiased">
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
