"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  Compass,
  Boxes,
  ArrowRight,
  Sparkles,
  Layers,
  X,
  CheckCircle2,
  Cpu,
  PanelLeft,
  FolderOpen,
  Plus,
  Search,
  Clock,
  LogIn,
  LogOut,
  ChevronRight,
  ExternalLink,
  Lock,
  ShieldAlert,
  ChevronDown,
  LayoutTemplate,
  Wand2,
  Sliders,
  Code2,
  GitBranch,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface DemoProject {
  id: string;
  name: string;
  updatedAt: string;
  status: "Draft" | "Published";
  pagesCount: number;
}

const INITIAL_PROJECTS: DemoProject[] = [
  {
    id: "demo-saas-landing",
    name: "AI SaaS Launchpad",
    updatedAt: "10 mins ago",
    status: "Draft",
    pagesCount: 3,
  },
  {
    id: "minimalist-portfolio",
    name: "Architectural Studio",
    updatedAt: "2 hours ago",
    status: "Published",
    pagesCount: 5,
  },
  {
    id: "ecommerce-horizon",
    name: "Apex Fashion Store",
    updatedAt: "Yesterday",
    status: "Draft",
    pagesCount: 4,
  },
];

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const user = session?.user;

  const [isPlanningModalOpen, setIsPlanningModalOpen] = useState(false);
  const [isProjectsDrawerOpen, setIsProjectsDrawerOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [authGateNotice, setAuthGateNotice] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Protected action handlers
  const handleToggleProjects = () => {
    if (!isAuthenticated) {
      setAuthGateNotice("My Projects workspace");
      return;
    }
    setIsProjectsDrawerOpen(!isProjectsDrawerOpen);
  };

  const handleStartPlanning = () => {
    if (!isAuthenticated) {
      setAuthGateNotice("AI Website Planning");
      return;
    }
    console.log("Start Planning Mode");
    setIsPlanningModalOpen(true);
  };

  const handleStartBuilder = () => {
    if (!isAuthenticated) {
      setAuthGateNotice("Visual Drag-and-Drop Builder");
      return;
    }
    console.log("Start Builder Mode");
    router.push("/builder/demo");
  };

  const handleOpenProject = (projectId: string) => {
    if (!isAuthenticated) {
      setAuthGateNotice(`Project (${projectId})`);
      return;
    }
    setIsProjectsDrawerOpen(false);
    router.push(`/builder/${projectId}`);
  };

  const filteredProjects = INITIAL_PROJECTS.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col justify-between selection:bg-neutral-800 selection:text-white relative">
      {/* 1. Header */}
      <header className="h-16 border-b border-[#1F1F1F] px-6 lg:px-12 flex items-center justify-between bg-[#000000]/80 backdrop-blur-md sticky top-0 z-30">
        {/* Left: Projects Drawer Trigger + GenWeb Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleProjects}
            className={`p-2 rounded-lg border transition flex items-center justify-center relative ${
              isProjectsDrawerOpen
                ? "bg-neutral-800 border-neutral-600 text-white"
                : "bg-neutral-950 border-[#1F1F1F] text-neutral-300 hover:text-white hover:border-neutral-700 hover:bg-neutral-900"
            }`}
            title={isAuthenticated ? "Open My Projects" : "Sign in required to view projects"}
            aria-label="Toggle My Projects"
          >
            <PanelLeft className="w-4 h-4" />
            {!isAuthenticated && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-neutral-600 rounded-full border border-black flex items-center justify-center">
                <Lock className="w-1.5 h-1.5 text-neutral-300" />
              </span>
            )}
          </button>

          <div className="h-4 w-px bg-[#1F1F1F]" />

          {/* GenWeb Brand Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-[#1F1F1F] flex items-center justify-center text-white shadow-inner">
              <Layers className="w-4 h-4 text-neutral-200" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-wider uppercase text-white">
                GenWeb
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-[#1F1F1F]">
                Studio
              </span>
            </div>
          </div>
        </div>

        {/* Right Header: Dynamic Google Auth Section */}
        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <Link
              href="/signin"
              className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold bg-white text-black hover:bg-neutral-200 rounded-lg transition shadow-sm active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
          ) : (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2.5 p-1 pl-1.5 pr-2 rounded-full bg-neutral-950 border border-[#1F1F1F] hover:border-neutral-700 transition focus:outline-none"
              >
                {/* Profile Picture */}
                <div className="w-7 h-7 rounded-full overflow-hidden bg-neutral-800 border border-neutral-700 relative">
                  {user?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-white bg-indigo-600">
                      {user?.name?.[0] || user?.email?.[0] || "U"}
                    </div>
                  )}
                </div>

                <span className="text-xs font-medium text-neutral-200 hidden sm:inline max-w-[120px] truncate">
                  {user?.name || user?.email}
                </span>

                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-2.5 border-b border-[#1F1F1F] mb-1">
                    <p className="text-xs font-semibold text-white truncate">
                      {user?.name || "Authenticated User"}
                    </p>
                    <p className="text-[11px] text-neutral-400 truncate">{user?.email}</p>
                    <span className="inline-block mt-1 text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-neutral-900 text-indigo-400 border border-neutral-800">
                      Google Account
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsProjectsDrawerOpen(true);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-neutral-300 hover:text-white hover:bg-neutral-900 transition flex items-center gap-2"
                  >
                    <FolderOpen className="w-3.5 h-3.5 text-neutral-400" />
                    <span>My Projects</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      router.push("/builder/demo");
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-neutral-300 hover:text-white hover:bg-neutral-900 transition flex items-center gap-2"
                  >
                    <Boxes className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Open Canvas Studio</span>
                  </button>

                  <div className="h-px bg-[#1F1F1F] my-1" />

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 transition flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Slide-out / Floating "My Projects" Block (Requires Sign-In) */}
      {isProjectsDrawerOpen && isAuthenticated && (
        <>
          <div
            onClick={() => setIsProjectsDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity animate-in fade-in"
          />

          <aside className="fixed top-0 left-0 bottom-0 w-full max-w-sm sm:max-w-md bg-[#0A0A0A] border-r border-[#1F1F1F] z-50 flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="p-5 border-b border-[#1F1F1F] flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-[#1F1F1F] flex items-center justify-center text-neutral-200">
                  <FolderOpen className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white tracking-wide">My Projects</h2>
                  <p className="text-[11px] text-neutral-400">
                    Logged in as <span className="text-white font-medium">{user?.name || user?.email}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsProjectsDrawerOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 border-b border-[#1F1F1F] space-y-3 bg-[#0A0A0A]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenProject("new-project-" + Date.now().toString().slice(-4))}
                  className="flex-1 py-2 px-3 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Blank Project</span>
                </button>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black border border-[#1F1F1F] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 px-1 pb-1">
                Workspace Projects ({filteredProjects.length})
              </div>

              {filteredProjects.length === 0 ? (
                <div className="py-12 text-center text-xs text-neutral-500 space-y-2">
                  <p>No projects match your search.</p>
                </div>
              ) : (
                filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => handleOpenProject(project.id)}
                    className="group bg-black/60 hover:bg-neutral-900/80 border border-[#1F1F1F] hover:border-neutral-700 rounded-xl p-3.5 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white group-hover:text-white">
                          {project.name}
                        </span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                            project.status === "Published"
                              ? "bg-emerald-950/60 text-emerald-400 border-emerald-900/60"
                              : "bg-neutral-900 text-neutral-400 border-[#1F1F1F]"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {project.updatedAt}
                        </span>
                        <span>•</span>
                        <span>{project.pagesCount} pages</span>
                      </div>
                    </div>

                    <div className="w-7 h-7 rounded-lg bg-neutral-950 border border-[#1F1F1F] flex items-center justify-center text-neutral-500 group-hover:text-white group-hover:border-neutral-600 transition">
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-[#1F1F1F] bg-black/40 flex items-center justify-between text-[11px] text-neutral-500">
              <span>Database: Connected Schema</span>
              <button
                onClick={() => router.push("/builder/demo")}
                className="text-neutral-300 hover:text-white flex items-center gap-1 transition"
              >
                <span>Demo Canvas</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </aside>
        </>
      )}

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col items-center px-6 py-12 lg:py-16 max-w-6xl mx-auto w-full space-y-24">
        {/* Hero Header & Core Starting Gateways */}
        <div className="w-full flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-950 border border-[#1F1F1F] text-[11px] text-neutral-300 font-mono tracking-tight">
            <Sparkles className="w-3.5 h-3.5 text-neutral-200" />
            <span>AI-Driven Architecture & Drag-and-Drop Canvas</span>
          </div>

          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Architect, Generate & Visually Craft Websites with AI.
            </h1>
            <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              GenWeb Studio bridges conversational AI planning with no-code visual drag-and-drop precision. 
              Discover your sitemap, synthesize 3–4 parallel layout variations, and refine every section live on an interactive canvas.
            </p>
          </div>

          {!isAuthenticated && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-950/90 border border-neutral-800 text-xs text-neutral-400">
              <Lock className="w-3.5 h-3.5 text-neutral-400" />
              <span>Studio options require signing in with Google to access your workspaces.</span>
            </div>
          )}

          {/* Two Core Entry Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl pt-6 text-left">
            {/* Option 1: Plan Your Website */}
            <div
              onClick={handleStartPlanning}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleStartPlanning();
              }}
              className="group relative bg-[#0A0A0A] border border-[#1F1F1F] hover:border-neutral-700 rounded-2xl p-8 flex flex-col justify-between transition-all duration-200 cursor-pointer hover:bg-neutral-950 shadow-2xl focus:outline-none focus:ring-1 focus:ring-neutral-600"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-black border border-[#1F1F1F] flex items-center justify-center group-hover:border-neutral-700 group-hover:scale-105 transition-all">
                    <Compass className="w-6 h-6 text-neutral-200 group-hover:text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    {!isAuthenticated && (
                      <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-900 text-neutral-400 border border-neutral-800">
                        <Lock className="w-2.5 h-2.5" />
                        Protected
                      </span>
                    )}
                    <span className="text-[10px] uppercase tracking-wider font-mono px-2.5 py-1 rounded-full bg-black text-neutral-400 border border-[#1F1F1F]">
                      Discovery & Sitemap
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-white group-hover:text-white flex items-center gap-2">
                    Plan Your Website
                  </h2>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Interactive AI-guided discovery. Answer high-level questions about your business, audience, and goals to generate a structured sitemap, content plan, and style blueprint.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#1F1F1F]/60">
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Sitemap hierarchy & page breakdown</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Content specifications & brand tone</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex items-center justify-between text-xs font-semibold text-neutral-300 group-hover:text-white">
                <span>{isAuthenticated ? "Start Planning Session" : "Sign In to Plan"}</span>
                <div className="w-7 h-7 rounded-full bg-black border border-[#1F1F1F] flex items-center justify-center group-hover:border-neutral-500 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>

            {/* Option 2: Generate & Build Website */}
            <div
              onClick={handleStartBuilder}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleStartBuilder();
              }}
              className="group relative bg-[#0A0A0A] border border-[#1F1F1F] hover:border-neutral-700 rounded-2xl p-8 flex flex-col justify-between transition-all duration-200 cursor-pointer hover:bg-neutral-950 shadow-2xl focus:outline-none focus:ring-1 focus:ring-neutral-600"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-black border border-[#1F1F1F] flex items-center justify-center group-hover:border-neutral-700 group-hover:scale-105 transition-all">
                    <Boxes className="w-6 h-6 text-neutral-200 group-hover:text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    {!isAuthenticated && (
                      <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-900 text-neutral-400 border border-neutral-800">
                        <Lock className="w-2.5 h-2.5" />
                        Protected
                      </span>
                    )}
                    <span className="text-[10px] uppercase tracking-wider font-mono px-2.5 py-1 rounded-full bg-black text-neutral-400 border border-[#1F1F1F]">
                      Multi-Layout & Visual Canvas
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-white group-hover:text-white flex items-center gap-2">
                    Generate & Build Website
                  </h2>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Synthesize 3–4 parallel layout variations with AI, then inspect and refine every block using the visual drag-and-drop canvas engine with granular editing precision.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#1F1F1F]/60">
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-500" />
                    <span>3–4 parallel AI layout variations</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Puck visual drag-and-drop editor</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex items-center justify-between text-xs font-semibold text-neutral-300 group-hover:text-white">
                <span>{isAuthenticated ? "Open Visual Builder" : "Sign In to Build"}</span>
                <div className="w-7 h-7 rounded-full bg-black border border-[#1F1F1F] flex items-center justify-center group-hover:border-neutral-500 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Detailed Architecture / "What is GenWeb Studio?" Section */}
        <section className="w-full max-w-5xl border-t border-[#1F1F1F] pt-20 space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-400">
              Architecture & Vision
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              A Studio Engineered for AI Precision & Visual Control
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Traditional site builders force you to drag every element manually. Standard AI generators give you brittle, one-shot code you can&apos;t easily edit. GenWeb Studio combines both worlds into a unified creation loop.
            </p>
          </div>

          {/* The 3-Step Creation Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 space-y-4 hover:border-neutral-700 transition">
              <div className="w-10 h-10 rounded-xl bg-black border border-[#1F1F1F] flex items-center justify-center text-white">
                <Wand2 className="w-4 h-4 text-neutral-300" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-neutral-500">
                  Phase 01
                </span>
                <h3 className="text-base font-semibold text-white">
                  Intelligent Discovery & Planning
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Instead of guessing layouts, the AI acts as your digital architect. It queries your business model, value proposition, and audience to synthesize structured sitemaps and content hierarchies.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 space-y-4 hover:border-neutral-700 transition">
              <div className="w-10 h-10 rounded-xl bg-black border border-[#1F1F1F] flex items-center justify-center text-white">
                <GitBranch className="w-4 h-4 text-neutral-300" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-neutral-500">
                  Phase 02
                </span>
                <h3 className="text-base font-semibold text-white">
                  Parallel Multi-Layout Synthesis
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Say goodbye to single-take AI hallucinations. The engine synthesizes 3 to 4 distinct visual variations simultaneously—from high-contrast editorial to bold minimalist layouts—so you pick the best direction.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 space-y-4 hover:border-neutral-700 transition">
              <div className="w-10 h-10 rounded-xl bg-black border border-[#1F1F1F] flex items-center justify-center text-white">
                <Sliders className="w-4 h-4 text-neutral-300" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-neutral-500">
                  Phase 03
                </span>
                <h3 className="text-base font-semibold text-white">
                  Visual Canvas & Surgical Refinement
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Selected layouts load into our interactive drag-and-drop canvas powered by Puck. Rearrange blocks, adjust properties, or prompt the AI to surgically regenerate individual sections without breaking the page.
                </p>
              </div>
            </div>
          </div>

          {/* Key Advantages Grid */}
          <div className="bg-[#050505] border border-[#1F1F1F] rounded-2xl p-8 lg:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F1F1F] pb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Why GenWeb Studio?</h3>
                <p className="text-xs text-neutral-400">Core architectural differences from standard website builders.</p>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-black text-neutral-400 border border-[#1F1F1F] self-start sm:self-auto">
                Next-Gen Architecture
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <LayoutTemplate className="w-4 h-4 text-neutral-300" />
                  <span>Structured Block Trees</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  We don&apos;t output messy raw HTML. We construct clean, serialized component trees with strict schemas that never break.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Zap className="w-4 h-4 text-neutral-300" />
                  <span>Surgical AI Edits</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Want a punchier hero headline or new pricing tier? Edit just that block with AI instead of regenerating the entire page.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <ShieldCheck className="w-4 h-4 text-neutral-300" />
                  <span>Session Protected</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Every workspace, sitemap draft, and canvas revision is securely authenticated and isolated under your Google identity.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Code2 className="w-4 h-4 text-neutral-300" />
                  <span>Production Ready</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Exportable, performant React and Next.js App Router code ready to deploy anywhere on modern cloud infrastructure.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 4. Footer */}
      <footer className="border-t border-[#1F1F1F] py-6 px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4 mt-12 bg-black">
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-neutral-400" />
          <span>Next.js App Router • Tailwind CSS • @measured/puck • Drizzle ORM • Google OAuth</span>
        </div>
        <div className="font-mono text-[11px] text-neutral-500">
          Status: {isAuthenticated ? `Signed In (${user?.name || user?.email})` : "Unauthenticated"}
        </div>
      </footer>

      {/* Auth Gate Notification Modal */}
      {authGateNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] w-full max-w-sm rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-[#1F1F1F] flex items-center justify-center text-white">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Authentication Required</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                You must be signed in with Google to access <strong className="text-white">{authGateNotice}</strong>.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <Link
                href="/signin"
                onClick={() => setAuthGateNotice(null)}
                className="w-full py-2.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Go to Sign In</span>
              </Link>

              <button
                type="button"
                onClick={() => setAuthGateNotice(null)}
                className="w-full py-1.5 text-xs text-neutral-500 hover:text-neutral-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Planning Mode Modal */}
      {isPlanningModalOpen && isAuthenticated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] w-full max-w-lg rounded-2xl p-6 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1F1F1F]">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-white" />
                <h3 className="font-semibold text-sm text-white">AI Planning Workflow</h3>
              </div>
              <button
                onClick={() => setIsPlanningModalOpen(false)}
                className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-900 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Logged in as <strong className="text-white">{user?.name || user?.email}</strong>. This interactive stub connects to <code className="text-neutral-200 bg-neutral-900 px-1 py-0.5 rounded">src/app/api/ai/plan/route.ts</code>.
            </p>

            <div className="bg-black border border-[#1F1F1F] rounded-lg p-3 space-y-2">
              <label className="text-[11px] font-medium text-neutral-300 block">
                Website Prompt / Idea:
              </label>
              <textarea
                rows={3}
                placeholder="e.g. A dark, luxury portfolio for an architectural photographer featuring full-screen hero imagery..."
                className="w-full bg-neutral-950 border border-[#1F1F1F] rounded-md p-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                defaultValue="A sleek, high-contrast AI website studio showcase."
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsPlanningModalOpen(false)}
                className="px-3 py-1.5 rounded-lg border border-[#1F1F1F] text-xs text-neutral-400 hover:text-white hover:bg-neutral-900 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  console.log("Submit Planning Request");
                  setIsPlanningModalOpen(false);
                  router.push("/builder/demo");
                }}
                className="px-3 py-1.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition flex items-center gap-1.5"
              >
                <span>Continue to Builder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
