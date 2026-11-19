# GenWeb Studio ⚡

> **An AI-powered, visual website builder and layout synthesis engine** designed with the architectural rigor of modern studio tools like Wix Studio and Framer.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16%20App%20Router-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%20v4-38B2AC?logo=tailwind-css)
![NextAuth.js](https://img.shields.io/badge/Auth-NextAuth.js%20v5-purple)
![Drizzle ORM](https://img.shields.io/badge/ORM-Drizzle%20ORM-C5F74F)

---

## 🌟 Overview

**GenWeb Studio** bridges the gap between conversational AI website ideation and pixel-precise visual manipulation. Instead of generating rigid, static code blobs, GenWeb structures website sitemaps into editable component trees that can be synthesized in parallel and edited in a visual drag-and-drop canvas.

### Core Workflow
1. **AI Discovery & Sitemap Planning:** Formulate target audience, brand tone, and sitemap hierarchy using structured AI schema generation.
2. **Parallel Layout Synthesis:** Generate 3–4 distinct layout variations with contrasting visual architectures.
3. **Visual Drag-and-Drop Canvas:** Select, inspect, reorder, and style modular blocks using a visual editor powered by `@measured/puck`.
4. **Session Authentication & Security:** Google OAuth identity layer protecting workspace routes, projects, and editor instances.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Visual Canvas Engine:** [`@measured/puck`](https://github.com/measured/puck) (Custom-configured component blocks with full type safety)
- **Authentication:** [NextAuth.js (Auth.js v5)](https://authjs.dev/) with Google OAuth Provider & CSRF-protected session management
- **Database & ORM:** [Drizzle ORM](https://orm.drizzle.team/) with PostgreSQL (`jsonb` serialization for visual canvas trees)
- **AI & Schemas:** [Vercel AI SDK](https://sdk.vercel.ai/) and [Zod](https://zod.dev/) for structured validation
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with a minimalist `#000000` pure black and `#1F1F1F` border studio aesthetic
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

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
│   │   ├── signin/                    # Dedicated Google OAuth and credentials sign-in
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
└── .env.example                       # Environment variable templates
```

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/genweb-studio.git
cd genweb-studio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env.local` file by copying the template:
```bash
cp .env.example .env.local
```

Fill in the required credentials:
```env
# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"

# NextAuth Secret (Generate via: openssl rand -base64 32)
AUTH_SECRET="your-secure-random-32-char-secret"
NEXTAUTH_URL="http://localhost:3000"

# PostgreSQL Database (Optional for local UI dev)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/genweb"
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Security & Data Integrity

- **OAuth 2.0:** All user sessions are authenticated via Google OAuth with HTTP-only cookies and CSRF tokens.
- **Access Control:** Workspace routes, canvas visual editors, and the project manager drawer require authenticated sessions.
- **Environment Isolation:** Secrets and private API keys are kept in `.env.local` and never tracked in Git.

---

## 📄 License

This project is licensed under the MIT License.
