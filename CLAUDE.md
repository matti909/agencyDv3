# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 digital agency landing page built with TypeScript, React 18, and Tailwind CSS v4. The site showcases digital services with a modern dark theme, animated UI components, Spanish content, and MDX-powered service detail pages.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with custom CSS variables (OKLCH color system)
- **UI Components**: shadcn/ui (New York style) + Radix UI primitives
- **Animations**: Framer Motion + GSAP (`gsap`, `@gsap/react`)
- **3D**: Three.js via `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
- **Content**: MDX (`@next/mdx`, `@mdx-js/react`) for service detail pages
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Fonts**: JetBrains Mono (Google Fonts), Playfair Display (Google Fonts)
- **Analytics**: Vercel Analytics
- **Package Manager**: pnpm

## Development Commands

```bash
pnpm dev      # Development server at http://localhost:3000
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Lint (disabled during builds)
```

## Architecture

### Routes

- `/` — Single-page landing (home with all sections)
- `/servicios` — Services listing page (Server Component)
- `/servicios/[slug]` — Individual service detail (MDX-powered, static params)

### MDX Content System

Service pages are driven by MDX files in `content/servicios/`. Each file exports a `metadata` object and the page content:

```mdx
export const metadata = {
  title: "...",
  description: "...",
  icon: "Globe",
  category: "Desarrollo Web",
  featured: true,
  price: "Desde $499",
}

# Heading
...
```

- `lib/get-services.ts` — Loads MDX modules; `getAllServices()` and `getServiceBySlug(slug)` are the data-access functions
- `mdx-components.tsx` — Global MDX component overrides (headings, lists, links, images, code)
- `next.config.mjs` uses `@next/mdx` with `pageExtensions` including `md`/`mdx`

To add a new service: create `content/servicios/<slug>.mdx` and add its slug to the array in `lib/get-services.ts`.

### Component Patterns

- **Client Components**: All interactive sections use `"use client"` directive
- **Server Components**: `/servicios` and `/servicios/[slug]` are async Server Components
- **Animations**: Framer Motion `useInView` for scroll-triggered animations; stagger with `delay: index * 0.1`, duration ~0.6s, `once: true`
- **3D Hero**: `components/hero-3d.tsx` wraps a Three.js `<Canvas>` with `<ParticleLogo />` and bloom post-processing
- **Theming**: Dark mode only — `<html className="dark">` in root layout
- **i18n**: Spanish content hardcoded (`lang="es"`)

### Key Components

```
app/
├── layout.tsx              # Root layout: JetBrains Mono, dark theme, Vercel Analytics
├── page.tsx                # Home: composes all section components
├── globals.css             # @import tailwindcss, tw-animate-css; OKLCH vars; custom classes
├── servicios/page.tsx      # Services listing (Server Component)
└── servicios/[slug]/page.tsx  # Service detail with MDX Content

components/
├── hero.tsx                # Hero section with animated text, gradient orbs
├── hero-3d.tsx             # Three.js Canvas with ParticleLogo + Bloom
├── particle-logo.tsx       # Three.js particle logo geometry
├── infinity-logo.tsx       # Infinity logo component
├── services.tsx            # Service cards grid
├── navigation.tsx          # Fixed navbar with scroll detection, mobile menu
├── about.tsx / optimizations.tsx / tech-marquee.tsx / contact.tsx / footer.tsx
└── ui/                     # shadcn/ui primitives

content/servicios/          # MDX service pages (presencia-digital, automatizacion-ia, etc.)
lib/
├── utils.ts                # cn() utility (clsx + tailwind-merge)
└── get-services.ts         # MDX data access functions
```

### Styling System

- **Theme**: OKLCH variables in `app/globals.css` under `:root` and `.dark`
- **Custom classes**: `.gradient-button` (gradient bg button), `.grid-background` (grid pattern)
- **shadcn aliases** in `components.json`: `@/components`, `@/lib/utils`, `@/components/ui`, `@/hooks`
- **Color usage**: Gradient combinations (blue-400, purple-400, pink-400); semantic tokens `text-foreground`, `text-muted-foreground`, `bg-card`, `border-border`

## Key Configuration

- `next.config.mjs`: ESLint/TypeScript errors suppressed during builds; images unoptimized; MDX enabled
- `tsconfig.json`: `@/*` path alias maps to project root; strict mode
- Vercel Analytics requires `VERCEL` env to activate
