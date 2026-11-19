# GenWeb Studio ⚡

> **An AI-powered, visual website builder and layout synthesis engine** designed with the architectural rigor of modern studio tools like Wix Studio and Framer.

![Next.js](https://img.shields.io/badge/Next.js-16%20App%20Router-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%20v4-38B2AC?logo=tailwind-css)
![Auth](https://img.shields.io/badge/Auth-NextAuth.js%20v5-purple)
![Drizzle ORM](https://img.shields.io/badge/ORM-Drizzle%20ORM-C5F74F)

---

## 🌟 Overview

**GenWeb Studio** bridges the gap between conversational AI website ideation and pixel-precise visual manipulation. Instead of generating rigid, static code blobs, GenWeb structures website sitemaps into editable component trees that can be synthesized in parallel and refined in a visual drag-and-drop canvas.

### Core Workflow
1. **AI Discovery & Sitemap Planning:** Formulate target audience, brand tone, and sitemap hierarchy using structured AI schema generation.
2. **Parallel Layout Synthesis:** Generate 3–4 distinct layout variations with contrasting visual architectures.
3. **Visual Drag-and-Drop Canvas:** Select, inspect, reorder, and style modular blocks using a visual editor powered by `@measured/puck`.
4. **Session Authentication & Security:** Google OAuth identity layer protecting workspace routes, projects, and editor instances.

---

## 🛠️ System Architecture & Engineering Highlights

### 1. Visual Canvas Engine
- Built on `@measured/puck`, delivering a clean drag-and-drop visual interface.
- Modular component registry where each block (e.g., `HeroBlock`) is type-safe and independently customizable.
- Canvas trees serialize into clean, portable JSON structures ready for database persistence and AI mutation.

### 2. Modern Next.js 16 App Router
- Modern React 19 architecture running on Next.js 16 with Turbopack.
- Strict pure black (`#000000`) and subtle dark-gray border (`#1F1F1F`) design system configured via Tailwind CSS v4.
- Suspense boundaries wrapping dynamic visual studio routes (`/builder/[projectId]`) for partial prerendering performance.

### 3. Identity & Access Gates
- Authenticated via **Google OAuth** powered by Auth.js / NextAuth.
- Protected workspace routes: planning workflows, projects drawers, and visual canvas editing are gated by secure session verification.
- HTTP-only session cookies and CSRF protection.

### 4. Database Schema Design (PostgreSQL + Drizzle ORM)
- **`projects` table:** Tracks workspace metadata, ownership, and timestamps.
- **`site_versions` table:** Stores visual layout trees inside PostgreSQL `jsonb` columns, enabling version history and branching without rigid table migrations.

---

## 📂 Project Architecture

```
genweb/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── ai/
│   │   │   │   ├── generate/route.ts  # POST endpoint for parallel layout synthesis
│   │   │   │   └── plan/route.ts      # POST endpoint for structured sitemap generation
│   │   │   └── auth/[...nextauth]/    # NextAuth.js OAuth callback and session routes
│   │   ├── builder/[projectId]/       # Interactive visual canvas route
│   │   ├── signin/                    # Google OAuth sign-in gateway
│   │   ├── globals.css                # Pure black studio theme and custom scrollbars
│   │   ├── layout.tsx                 # Root layout with SessionProvider wrap
│   │   └── page.tsx                   # Studio home screen with interactive workspace cards
│   ├── components/
│   │   └── providers/                 # Client session and context providers
│   ├── db/
│   │   └── schema.ts                  # Drizzle ORM schema (projects, site_versions)
│   ├── lib/
│   │   ├── puck/
│   │   │   └── config.tsx             # Visual editor component registry and block definitions
│   │   └── schemas/
│   │       └── site-plan.ts           # Zod validation schemas for AI planner
│   └── auth.ts                        # NextAuth.js configuration
├── drizzle.config.ts                  # Drizzle kit configuration for PostgreSQL
└── .env.example                       # Template for environment configuration
```

---

## 🔒 Security & Privacy

- All credentials, secrets, and private keys are strictly managed via encrypted environment variables.
- User data and visual canvas revisions are isolated by user identity.

---

## 📄 License

This project is licensed under the MIT License.
