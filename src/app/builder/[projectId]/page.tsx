"use client";

import React, { use, useState, Suspense } from "react";
import Link from "next/link";
import { Puck, type Data } from "@measured/puck";
import config from "@/lib/puck/config";
import "@measured/puck/dist/index.css";
import { useSession } from "next-auth/react";
import {
  ArrowLeft,
  Sparkles,
  Save,
  Eye,
  Layers,
  Lock,
  LogIn,
} from "lucide-react";

interface BuilderPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

const initialData: Data = {
  content: [
    {
      type: "HeroBlock",
      props: {
        id: "hero-1",
        headline: "Welcome to Your Visual Studio",
        subheadline:
          "This canvas is powered by @measured/puck. Select components, arrange blocks, and dispatch AI layout mutations.",
        ctaPrimary: "Explore Canvas",
        ctaSecondary: "Documentation",
      },
    },
  ],
  root: { props: { title: "Draft Canvas" } },
};

function BuilderCanvas({ params }: BuilderPageProps) {
  const resolvedParams = use(params);
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const user = session?.user;

  const [data, setData] = useState<Data>(initialData);

  const handlePublish = async (newData: Data) => {
    console.log("Published Canvas Data for Project:", resolvedParams.projectId, newData);
  };

  // Auth Guard: If not signed in and finished checking session
  if (!isLoading && !isAuthenticated) {
    return (
      <div className="h-screen w-full bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-sm bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-8 shadow-2xl space-y-5">
          <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-[#1F1F1F] flex items-center justify-center mx-auto text-amber-400">
            <Lock className="w-6 h-6" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-lg font-bold text-white">Sign In Required</h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              You must be signed in with Google to open and edit project <code className="text-white bg-neutral-900 px-1 py-0.5 rounded">{resolvedParams.projectId}</code>.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <Link
              href={`/signin?redirect=/builder/${encodeURIComponent(resolvedParams.projectId)}`}
              className="w-full py-2.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In with Google</span>
            </Link>

            <Link
              href="/"
              className="block pt-2 text-xs text-neutral-500 hover:text-neutral-400 transition"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-black text-white overflow-hidden">
      {/* Visual Canvas Top Bar */}
      <header className="h-14 border-b border-[#1F1F1F] bg-[#0A0A0A] px-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-900 transition flex items-center gap-1.5 text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <div className="h-4 w-px bg-[#1F1F1F]" />
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-neutral-400" />
            <span className="text-xs font-medium text-neutral-200">
              Project: <span className="text-white font-semibold">{resolvedParams.projectId}</span>
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-[#1F1F1F]">
              Canvas Stub
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => console.log("AI Assist clicked")}
            className="px-3 py-1.5 rounded-md text-xs font-medium bg-neutral-900 border border-[#1F1F1F] text-neutral-300 hover:text-white hover:bg-neutral-800 transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Layout Assist</span>
          </button>
          <button
            onClick={() => console.log("Preview clicked")}
            className="p-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-900 transition"
            title="Preview Mode"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handlePublish(data)}
            className="px-3 py-1.5 rounded-md text-xs font-medium bg-white text-black hover:bg-neutral-200 transition flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Canvas</span>
          </button>

          {/* User Profile Avatar in Builder */}
          {user && (
            <div className="flex items-center pl-2 border-l border-[#1F1F1F]">
              <div
                className="w-7 h-7 rounded-full overflow-hidden bg-neutral-800 border border-neutral-700"
                title={`Signed in as ${user.name || user.email}`}
              >
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-white bg-indigo-600">
                    {user.name?.[0] || user.email?.[0] || "U"}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Puck Editor Mounting Container */}
      <main className="flex-1 w-full overflow-auto relative">
        <Puck
          config={config}
          data={data}
          onPublish={handlePublish}
          onChange={(newData) => setData(newData)}
        />
      </main>
    </div>
  );
}

export default function BuilderPage(props: BuilderPageProps) {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full bg-black flex items-center justify-center text-neutral-400 text-xs font-mono">
          Loading Canvas Engine...
        </div>
      }
    >
      <BuilderCanvas {...props} />
    </Suspense>
  );
}
