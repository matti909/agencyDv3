# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 digital agency landing page built with TypeScript, React 18, and Tailwind CSS v4. The site showcases digital services (landing pages, e-commerce, appointment systems, etc.) with a modern dark theme, animated UI components, and Spanish content.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4.1.9 with custom CSS variables (OKLCH color system)
- **UI Components**: shadcn/ui (New York style) + Radix UI primitives
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Fonts**: Geist Sans + Geist Mono
- **Analytics**: Vercel Analytics
- **Package Manager**: pnpm

## Development Commands

```bash
# Development server (default: http://localhost:3000)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Linting (currently disabled during builds)
pnpm lint
```

## Architecture

### File Structure

```
app/
├── layout.tsx          # Root layout with Geist fonts, dark theme, Spanish metadata
├── page.tsx            # Home page - imports all section components
└── globals.css         # Tailwind imports, theme variables (OKLCH), custom classes

components/
├── navigation.tsx      # Fixed navbar with scroll detection, mobile menu
├── hero.tsx           # Hero section with animated text rotation, gradient orbs
├── services.tsx       # Service cards grid with icons (6 services)
├── about.tsx          # About section
├── optimizations.tsx  # Optimizations showcase
├── tech-marquee.tsx   # Technology logos marquee
├── contact.tsx        # Contact form/section
├── footer.tsx         # Footer component
└── ui/                # shadcn/ui components (45+ components)

hooks/
├── use-toast.ts       # Toast notifications hook
└── use-mobile.ts      # Mobile detection hook

lib/
└── utils.ts           # cn() utility (clsx + tailwind-merge)
```

### Component Patterns

- **Client Components**: All page sections use `"use client"` directive for interactivity (animations, state)
- **Animations**: Framer Motion with `initial`, `animate`, `exit` variants. Use `useInView` for scroll-triggered animations
- **Theming**: Dark mode only (set in root `<html>` via `className="dark"`)
- **Responsive**: Mobile-first with Tailwind breakpoints (sm, md, lg)
- **i18n**: Spanish content hardcoded (site lang="es")

### Styling System

- **Theme Variables**: OKLCH color system in `app/globals.css` with `:root` and `.dark` variants
- **Custom Classes**:
  - `.gradient-button` - Gradient background button styles
  - `.grid-background` - Background grid pattern
- **shadcn Config**: Located in `components.json` with aliases:
  - `@/components`, `@/lib/utils`, `@/components/ui`, `@/hooks`

## Key Configuration Details

### next.config.mjs
- ESLint and TypeScript errors ignored during builds
- Images unoptimized (for static export compatibility)

### tsconfig.json
- Path alias: `@/*` maps to project root
- ES6 target, strict mode enabled
- JSX preserved for Next.js compiler

### Build & Deployment Notes
- Build errors are suppressed in config (fix before deploying to production)
- pnpm is the package manager (see pnpm-lock.yaml)
- No git repository initialized yet
- Vercel Analytics integrated (requires VERCEL env to work)

## Working with Components

### Adding shadcn/ui Components
The project uses shadcn/ui (New York style). When adding components, use the configured aliases from `components.json`.

### Animation Guidelines
- Use Framer Motion's `useInView` hook for sections (see `services.tsx:50`)
- Stagger animations with `delay: index * 0.1` pattern
- Keep duration around 0.6s for smoothness
- Use `once: true` to prevent re-triggering on scroll

### Color Usage
- Primary colors: Use gradient combinations (blue-400, purple-400, pink-400)
- Text: `text-foreground`, `text-muted-foreground`, `text-primary`
- Backgrounds: `bg-background`, `bg-card`, `bg-primary/10`
- Borders: `border-border`, hover states with `border-primary/50`

## Common Tasks

### Adding a New Section
1. Create component in `components/` with `"use client"` directive
2. Import in `app/page.tsx`
3. Add section ID for navigation (e.g., `id="servicios"`)
4. Use Framer Motion with `useInView` for scroll animations
5. Update `navigation.tsx` navLinks array if needed

### Modifying Theme Colors
Edit CSS variables in `app/globals.css` under `:root` (light) and `.dark` (dark mode). Use OKLCH format for better color interpolation.

### Form Handling
Use React Hook Form + Zod (see dependencies). Example pattern:
```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
```
