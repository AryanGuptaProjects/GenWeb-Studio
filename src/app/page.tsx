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
          {/* Button left to GenWeb: Toggles the "My Projects" block */}
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
            /* Unauthenticated: Show Sign In button */
            <Link
              href="/signin"
              className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold bg-white text-black hover:bg-neutral-200 rounded-lg transition shadow-sm active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
          ) : (
            /* Authenticated: Show User Profile Picture & Dropdown */
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
                  {/* User summary header */}
                  <div className="p-2.5 border-b border-[#1F1F1F] mb-1">
                    <p className="text-xs font-semibold text-white truncate">
                      {user?.name || "Authenticated User"}
                    </p>
                    <p className="text-[11px] text-neutral-400 truncate">{user?.email}</p>
                    <span className="inline-block mt-1 text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-neutral-900 text-indigo-400 border border-neutral-800">
                      Google Account
                    </span>
                  </div>

                  {/* Actions */}
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

                  {/* Sign Out */}
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
          {/* Backdrop overlay */}
          <div
            onClick={() => setIsProjectsDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity animate-in fade-in"
          />

          {/* Drawer Block */}
          <aside className="fixed top-0 left-0 bottom-0 w-full max-w-sm sm:max-w-md bg-[#0A0A0A] border-r border-[#1F1F1F] z-50 flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
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

            {/* Quick Actions & Search */}
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

              {/* Search input */}
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

            {/* Projects List */}
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

            {/* Drawer Footer */}
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

      {/* 2. Main Centerpiece */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-6xl mx-auto w-full">
        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-2xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950 border border-[#1F1F1F] text-[11px] text-neutral-400 font-mono tracking-tight mb-2">
            <Sparkles className="w-3 h-3 text-neutral-300" />
            <span>AI Architecture & Visual Canvas Engine</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            How would you like to build?
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Select a pathway to initiate website ideation, AI-guided discovery, or direct visual canvas authoring.
          </p>

          {!isAuthenticated && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-950/80 border border-neutral-800 text-xs text-neutral-400 mt-2">
              <Lock className="w-3.5 h-3.5 text-neutral-400" />
              <span>Studio options require signing in to access your projects and canvas.</span>
            </div>
          )}
        </div>

        {/* Two Core Entry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
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
              {/* Badge & Icon */}
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

              {/* Title & Description */}
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-white group-hover:text-white flex items-center gap-2">
                  Plan your website
                </h2>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Interactive AI-guided discovery. Answer high-level questions about your business, audience, and goals to generate a structured sitemap, content plan, and style blueprint.
                </p>
              </div>

              {/* Feature Highlights */}
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

            {/* Action Footer */}
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
              {/* Badge & Icon */}
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

              {/* Title & Description */}
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-white group-hover:text-white flex items-center gap-2">
                  Generate & Build Website
                </h2>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Synthesize 3–4 parallel layout variations with AI, then inspect and refine every block using the visual drag-and-drop canvas engine with granular editing precision.
                </p>
              </div>

              {/* Feature Highlights */}
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

            {/* Action Footer */}
            <div className="pt-8 flex items-center justify-between text-xs font-semibold text-neutral-300 group-hover:text-white">
              <span>{isAuthenticated ? "Open Visual Builder" : "Sign In to Build"}</span>
              <div className="w-7 h-7 rounded-full bg-black border border-[#1F1F1F] flex items-center justify-center group-hover:border-neutral-500 transition-colors">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Footer */}
      <footer className="border-t border-[#1F1F1F] py-4 px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2">
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-neutral-400" />
          <span>Next.js App Router • Tailwind CSS • @measured/puck • Drizzle ORM • Google OAuth</span>
        </div>
        <div className="font-mono text-[11px] text-neutral-500">
          Status: {isAuthenticated ? `Signed In (${user?.name || user?.email})` : "Unauthenticated"}
        </div>
      </footer>

      {/* Auth Gate Notification Modal (Shown when unauthenticated user clicks protected feature) */}
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

      {/* Planning Mode Modal (Only accessible when signed in) */}
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
