"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import {
  Layers,
  ArrowLeft,
  Mail,
  Lock,
  User as UserIcon,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function SignInContent() {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";
  const authError = searchParams.get("error");

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    authError ? "Authentication failed. Check your provider settings." : null
  );

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      setErrorMessage(null);
      await signIn("google", { callbackUrl: redirectPath });
    } catch {
      setErrorMessage("Could not connect to Google OAuth. Please verify your credentials.");
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (mode === "signup" && !name) {
      setErrorMessage("Please enter your name.");
      return;
    }

    // Inform user to authenticate with Google OAuth
    setErrorMessage(
      "Direct credentials login will be active with database integration. Please use Google Sign In above."
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between selection:bg-neutral-800 selection:text-white">
      {/* Top Bar */}
      <header className="h-16 border-b border-[#1F1F1F] px-6 lg:px-12 flex items-center justify-between bg-black/60 backdrop-blur-md">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-[#1F1F1F] flex items-center justify-center text-white">
            <Layers className="w-3.5 h-3.5 text-neutral-300" />
          </div>
          <span className="font-bold text-xs uppercase tracking-wider text-white">
            GenWeb Studio
          </span>
        </div>
      </header>

      {/* Main Authentication Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-950 border border-[#1F1F1F] text-[10px] text-neutral-400 font-mono mb-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Studio Authentication Gate</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              {mode === "signin" ? "Welcome back" : "Create an account"}
            </h1>
            <p className="text-xs text-neutral-400">
              Sign in to authenticate and access your protected workspaces.
            </p>
          </div>

          {/* Primary Action: Google Authentication */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              type="button"
              className="w-full py-2.5 px-4 rounded-xl bg-white text-black hover:bg-neutral-200 transition font-medium text-xs flex items-center justify-center gap-2.5 shadow-md disabled:opacity-50 active:scale-98"
            >
              <GoogleIcon />
              <span>
                {isGoogleLoading
                  ? "Connecting to Google..."
                  : mode === "signin"
                  ? "Continue with Google"
                  : "Sign up with Google"}
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#1F1F1F] w-full" />
            <span className="bg-[#0A0A0A] px-3 text-[10px] uppercase font-mono tracking-wider text-neutral-500">
              Or with email
            </span>
            <div className="border-t border-[#1F1F1F] w-full" />
          </div>

          {/* Mode Switch Tabs (Sign In / Sign Up) */}
          <div className="flex p-1 bg-black border border-[#1F1F1F] rounded-lg">
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setErrorMessage(null);
              }}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition ${
                mode === "signin"
                  ? "bg-neutral-800 text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setErrorMessage(null);
              }}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition ${
                mode === "signup"
                  ? "bg-neutral-800 text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-lg bg-neutral-900 border border-[#1F1F1F] text-neutral-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{errorMessage}</span>
              </div>
            )}

            {mode === "signup" && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-neutral-300 block">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black border border-[#1F1F1F] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-neutral-300 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="email"
                  placeholder="designer@studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-[#1F1F1F] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-medium text-neutral-300 block">
                  Password
                </label>
                {mode === "signin" && (
                  <span className="text-[10px] text-neutral-500 hover:text-neutral-400 cursor-pointer">
                    Forgot?
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-[#1F1F1F] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-xs font-semibold hover:bg-neutral-800 transition flex items-center justify-center gap-1.5"
            >
              <span>{mode === "signin" ? "Sign In with Email" : "Create Account"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Toggle between modes */}
          <div className="pt-2 text-center border-t border-[#1F1F1F]">
            <p className="text-[11px] text-neutral-500">
              {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "signin" ? "signup" : "signin");
                  setErrorMessage(null);
                }}
                className="text-white underline hover:text-neutral-300 transition"
              >
                {mode === "signin" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1F1F1F] py-4 px-6 text-center text-xs text-neutral-600">
        Google OAuth • NextAuth.js v5 Session Protection
      </footer>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-xs font-mono text-neutral-400">
          Loading authentication gateway...
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
