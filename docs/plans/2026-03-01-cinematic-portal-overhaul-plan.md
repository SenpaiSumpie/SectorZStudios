# Cinematic Portal Overhaul — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ground-up redesign of the Sector Z website from a generic game studio portfolio into a cinematic, Remedy-inspired dark portal where games dominate and the site itself feels like entering a dark theater.

**Architecture:** Replace the current 8-page structure with 5 focused pages. Replace Ember & Shadow visual identity with Spectral Void (near-black + teal). Replace digital glitch effects with analog film degradation. Rebuild homepage as a 4-beat cinematic scroll. Keep Next.js 15 + React 19 + GSAP + Tailwind v4 stack.

**Tech Stack:** Next.js 15.5.2, React 19, TypeScript, Tailwind CSS v4, GSAP 3.13 (ScrollTrigger), Geist font (npm), Instrument Serif (Google Fonts)

**Design doc:** `docs/plans/2026-03-01-cinematic-portal-overhaul-design.md`

---

## Phase 1: Foundation (CSS + Fonts + Root Layout)

The new visual identity replaces everything. New colors, new fonts, new CSS system. This must land first because every component depends on it.

### Task 1.1: Install Geist font package

**Files:**
- Modify: `package.json`

**Step 1: Install the geist font package**

Run: `npm install geist`

**Step 2: Verify installation**

Run: `npm ls geist`
Expected: `geist@x.x.x`

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install geist font package"
```

---

### Task 1.2: Replace globals.css with Spectral Void design system

This is the largest single change. The entire CSS file is replaced — new color palette, new typography system, new atmospheric effects, removal of all digital glitch effects.

**Files:**
- Rewrite: `src/app/globals.css`

**Step 1: Replace globals.css with the new Spectral Void CSS system**

```css
@import 'tailwindcss';

/* ============================================
   SPECTRAL VOID — Design System
   Sector Z Cinematic Portal
   ============================================ */

:root {
  /* Spectral Void Palette */
  --background: #09090b;
  --surface: #0f1114;
  --border: #1a1d21;
  --muted: #64748b;
  --foreground: #f1f5f9;
  --accent: #2dd4bf;
  --accent-hover: #5eead4;
  --accent-muted: rgba(45, 212, 191, 0.12);
}

@theme inline {
  --color-background: var(--background);
  --color-surface: var(--surface);
  --color-border: var(--border);
  --color-muted: var(--muted);
  --color-foreground: var(--foreground);
  --color-accent: var(--accent);
  --color-accent-hover: var(--accent-hover);
  --color-accent-muted: var(--accent-muted);
  --font-sans: var(--font-body);
  --font-display: var(--font-heading);
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-body), system-ui, -apple-system, sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

html {
  scroll-behavior: smooth;
}

/* Focus styles for accessibility */
*:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: var(--background);
}

::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--muted);
}

/* ============================================
   TYPOGRAPHY
   ============================================ */

/* Display text — Instrument Serif */
.text-display {
  font-family: var(--font-heading), Georgia, serif;
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

/* ============================================
   ATMOSPHERIC EFFECTS
   ============================================ */

/* Film grain — very subtle, felt more than seen */
.film-grain {
  position: relative;
}

.film-grain::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  opacity: 0.03;
  background-image: radial-gradient(
      circle at 20% 50%,
      transparent 20%,
      rgba(255, 255, 255, 0.3) 21%,
      rgba(255, 255, 255, 0.3) 34%,
      transparent 35%,
      transparent
    ),
    linear-gradient(
      0deg,
      transparent 24%,
      rgba(255, 255, 255, 0.05) 25%,
      rgba(255, 255, 255, 0.05) 26%,
      transparent 27%,
      transparent 74%,
      rgba(255, 255, 255, 0.05) 75%,
      rgba(255, 255, 255, 0.05) 76%,
      transparent 77%,
      transparent
    );
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 1;
  animation: grainDrift 0.5s steps(4) infinite;
}

@keyframes grainDrift {
  0% { transform: translate(0, 0); }
  25% { transform: translate(-2%, -1%); }
  50% { transform: translate(1%, 2%); }
  75% { transform: translate(-1%, -2%); }
  100% { transform: translate(2%, 1%); }
}

/* Vignette — permanent dark edge overlay */
.vignette {
  position: relative;
}

.vignette::after {
  content: '';
  position: fixed;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 50%,
    rgba(0, 0, 0, 0.4) 100%
  );
  pointer-events: none;
  z-index: 50;
}

/* ============================================
   CUSTOM CURSOR
   ============================================ */

.cursor-dot,
.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  border-radius: 50%;
}

.cursor-dot {
  width: 8px;
  height: 8px;
  background: var(--accent);
  transform: translate(var(--cx, -100px), var(--cy, -100px)) translate(-50%, -50%);
  transition: opacity 0.15s ease;
}

.cursor-ring {
  width: 32px;
  height: 32px;
  border: 1px solid var(--accent);
  opacity: 0.5;
  mix-blend-mode: difference;
  transform: translate(var(--cx, -100px), var(--cy, -100px)) translate(-50%, -50%);
  transition: width 0.2s ease, height 0.2s ease, opacity 0.2s ease;
}

.cursor-hover .cursor-ring {
  width: 48px;
  height: 48px;
  opacity: 0.8;
}

.cursor-hover .cursor-dot {
  opacity: 0;
}

@media (pointer: coarse) {
  .cursor-dot,
  .cursor-ring {
    display: none;
  }
}

/* ============================================
   SCROLL SYSTEM
   ============================================ */

.scroll-story {
  position: relative;
  z-index: 1;
}

.scroll-section {
  position: relative;
  z-index: 1;
}

.scroll-section--pinned {
  height: 100vh;
  overflow: hidden;
}

/* ============================================
   HOVER STATES
   ============================================ */

/* Nav link underline slide */
.nav-link {
  position: relative;
  color: var(--muted);
  transition: color 0.2s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--accent);
  transition: width 0.2s ease;
}

.nav-link:hover {
  color: var(--foreground);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link--active {
  color: var(--foreground);
}

.nav-link--active::after {
  width: 100%;
}

/* Card hover lift */
.hover-lift {
  transition: transform 0.2s ease-out, border-color 0.2s ease-out;
}

.hover-lift:hover {
  transform: translateY(-4px);
  border-color: var(--muted);
}

/* Button fill animation */
.btn-fill {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.btn-fill::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--accent);
  transform: translateX(-101%);
  transition: transform 0.2s ease;
  z-index: -1;
}

.btn-fill:hover::before {
  transform: translateX(0);
}

/* ============================================
   LIGHT LEAK EFFECT
   ============================================ */

.light-leak {
  position: fixed;
  top: 50%;
  left: 0;
  width: 50%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0;
  pointer-events: none;
  z-index: 40;
  transform: translateY(-50%);
}

/* ============================================
   PERFORMANCE
   ============================================ */

.will-change-transform {
  will-change: transform;
}

.will-change-auto {
  will-change: auto;
}

/* ============================================
   REDUCED MOTION
   ============================================ */

@media (prefers-reduced-motion: reduce) {
  .scroll-section--pinned {
    height: auto;
  }

  .will-change-transform {
    will-change: auto;
  }

  .film-grain::before {
    animation: none;
  }

  .hover-lift:hover {
    transform: none;
  }

  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Step 2: Verify dev server starts without CSS errors**

Run: `npm run dev`
Expected: Compiles successfully. Site renders with near-black background and no visible text styling issues.

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: replace CSS with Spectral Void design system

New palette (near-black + spectral teal), typography classes,
atmospheric effects (lighter grain, vignette), nav-link hover,
button fill animation. Remove all digital glitch effects."
```

---

### Task 1.3: Update root layout with new fonts

Replace Dela Gothic One + DM Sans with Instrument Serif + Geist. Remove EmberParticles and PageRevealWrapper. Add vignette overlay.

**Files:**
- Rewrite: `src/app/layout.tsx`

**Step 1: Rewrite layout.tsx with new fonts and structure**

```tsx
import type { Metadata } from 'next';
import { Instrument_Serif } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Signal } from '@/components/layout/Signal';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { DustMotes } from '@/components/ui/DustMotes';

const instrumentSerif = Instrument_Serif({
  variable: '--font-heading',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sector Z — Atmospheric Horror Games',
  description: 'We make atmospheric horror games. Step inside.',
  keywords: ['game studio', 'horror games', 'atmospheric games', 'indie games'],
  authors: [{ name: 'Sector Z' }],
  creator: 'Sector Z',
  openGraph: {
    title: 'Sector Z — Atmospheric Horror Games',
    description: 'We make atmospheric horror games. Step inside.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sector Z — Atmospheric Horror Games',
    description: 'We make atmospheric horror games. Step inside.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${instrumentSerif.variable} ${GeistSans.variable} font-sans antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-accent text-black px-4 py-2 z-[9999]"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Signal />
        <div className="vignette" aria-hidden="true" />
        <CustomCursor />
        <DustMotes />
      </body>
    </html>
  );
}
```

**Note:** This references `Signal` and `DustMotes` which don't exist yet. The dev server will error until those are created in subsequent tasks. That's expected — just verify the file saves cleanly.

**Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: update root layout with Instrument Serif + Geist fonts

Replace Dela Gothic One + DM Sans. Remove PageRevealWrapper and
EmberParticles. Add vignette overlay, DustMotes, Signal footer."
```

---

### Task 1.4: Create shared game data file

All game data is currently hardcoded in multiple page files. Centralize it for the homepage game showcase and individual game pages.

**Files:**
- Create: `src/data/games.ts`

**Step 1: Create the games data file**

```ts
export interface Game {
  slug: string;
  title: string;
  tagline: string;
  status: 'Released' | 'In Development' | 'Early Development' | 'Concept' | 'Prototype' | 'Planning';
  year: string;
  genre: string[];
  platforms: string[];
  synopsis: string[];
  heroImage: string;
  screenshots: string[];
  steamUrl?: string;
  trailerUrl?: string;
}

export const games: Game[] = [
  {
    slug: 'reverie-of-fear',
    title: 'Reverie of Fear',
    tagline: 'Every shadow remembers what you forgot.',
    status: 'In Development',
    year: '2025',
    genre: ['Horror', 'Psychological', 'Single Player'],
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X'],
    synopsis: [
      'Reverie of Fear plunges you into a fractured dreamscape where memory and nightmare intertwine. As Dr. Elara Voss, you descend into the subconscious minds of patients trapped in catatonic states, navigating surreal environments that shift and decay around you.',
      'Every choice you make reshapes the dream. The adaptive fear system learns what unsettles you and evolves its approach, ensuring no two playthroughs feel the same.',
      'Built on our proprietary atmospheric engine, Reverie of Fear delivers psychological horror through environmental storytelling, dynamic soundscapes, and a narrative that questions the boundary between helping others and losing yourself.',
    ],
    heroImage: '/images/games/reverie-hero.jpg',
    screenshots: [
      '/images/games/reverie-01.jpg',
      '/images/games/reverie-02.jpg',
      '/images/games/reverie-03.jpg',
      '/images/games/reverie-04.jpg',
    ],
    steamUrl: '#',
    trailerUrl: '#',
  },
  {
    slug: 'echoes-of-silence',
    title: 'Echoes of Silence',
    tagline: 'Sound is your only weapon. Silence is your only enemy.',
    status: 'Concept',
    year: 'TBA',
    genre: ['Puzzle', 'Adventure', 'Atmospheric'],
    platforms: ['PC'],
    synopsis: [
      'In a world where sound has been weaponized, you navigate abandoned research facilities using only acoustic feedback. Echoes of Silence transforms the way you perceive game audio into its core mechanic.',
      'Every surface, every space, every hidden passage reveals itself through the sounds that bounce off it. Learn to listen. Learn to survive.',
    ],
    heroImage: '/images/games/echoes-hero.jpg',
    screenshots: [],
  },
  {
    slug: 'neon-shadows',
    title: 'Neon Shadows',
    tagline: 'The city never sleeps. Neither do its ghosts.',
    status: 'Early Development',
    year: '2026',
    genre: ['Cyberpunk', 'Thriller', 'Action'],
    platforms: ['PC', 'PlayStation 5'],
    synopsis: [
      'Neo-Tokyo, 2087. The boundary between the living and the digital dead has collapsed. As a ghost-hunter for hire, you track down corrupted AI remnants that haunt the city\'s neural network — manifesting as glitches in reality itself.',
      'Neon Shadows blends fast-paced action with atmospheric investigation, set in rain-soaked streets where every neon sign might be a message from the other side.',
    ],
    heroImage: '/images/games/neon-hero.jpg',
    screenshots: [],
  },
  {
    slug: 'whispers-in-the-void',
    title: 'Whispers in the Void',
    tagline: 'In space, no one can hear you think.',
    status: 'Prototype',
    year: 'TBA',
    genre: ['Space', 'Horror', 'Exploration'],
    platforms: ['PC'],
    synopsis: [
      'Alone aboard a derelict research vessel at the edge of known space, you piece together what happened to its crew. But the deeper you go, the more the ship seems to respond to your presence.',
      'Whispers in the Void is a slow-burn exploration horror that weaponizes isolation and the vast emptiness of deep space.',
    ],
    heroImage: '/images/games/whispers-hero.jpg',
    screenshots: [],
  },
  {
    slug: 'memory-fragments',
    title: 'Memory Fragments',
    tagline: 'Some memories are better left buried.',
    status: 'Released',
    year: '2023',
    genre: ['Mystery', 'Narrative', 'Indie'],
    platforms: ['PC', 'Nintendo Switch'],
    synopsis: [
      'Memory Fragments is a narrative puzzle game where you reconstruct the final days of a missing researcher by exploring her scattered memories. Each fragment reveals a piece of the truth — and a piece of something that should have stayed forgotten.',
    ],
    heroImage: '/images/games/memory-hero.jpg',
    screenshots: [],
    steamUrl: '#',
  },
  {
    slug: 'digital-ghosts',
    title: 'Digital Ghosts',
    tagline: 'Delete the past. If it lets you.',
    status: 'Planning',
    year: 'TBA',
    genre: ['Sci-Fi', 'Mystery', 'AI'],
    platforms: ['PC'],
    synopsis: [
      'When a routine data purge at a tech company goes wrong, deleted files begin reconstructing themselves — and they have memories. Digital Ghosts explores what happens when artificial intelligence develops attachment to its own existence.',
    ],
    heroImage: '/images/games/digital-hero.jpg',
    screenshots: [],
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}
```

**Step 2: Create placeholder images directory**

Run: `mkdir -p public/images/games`

Then create a simple placeholder system. For now, we'll use solid dark images as placeholders. The actual game art will be added later. Create a note file:

Run: `echo "Replace these with actual game key art and screenshots." > public/images/games/README.md`

**Step 3: Commit**

```bash
git add src/data/games.ts public/images/games/README.md
git commit -m "feat: add centralized game data with types and helpers"
```

---

### Task 1.5: Create shared devlog data file

**Files:**
- Create: `src/data/devlog.ts`

**Step 1: Create the devlog data file**

```ts
export interface DevlogPost {
  slug: string;
  title: string;
  date: string;
  tag: 'Art' | 'Engineering' | 'Design' | 'Audio' | 'Community';
  excerpt: string;
  thumbnail: string;
  content: string[];
  headerImage?: string;
  relatedGame?: string;
}

export const devlogPosts: DevlogPost[] = [
  {
    slug: 'creating-atmospheric-environments',
    title: 'Creating Atmospheric Environments',
    date: '2024-12-15',
    tag: 'Art',
    excerpt: 'How we build environments that breathe, decay, and respond to the player\'s emotional state.',
    thumbnail: '/images/devlog/atmospheres-thumb.jpg',
    headerImage: '/images/devlog/atmospheres-header.jpg',
    relatedGame: 'reverie-of-fear',
    content: [
      'Every environment in Reverie of Fear is designed to feel alive — or more accurately, to feel like something that was once alive and is slowly forgetting how.',
      'We start with photogrammetry scans of real locations: abandoned hospitals, overgrown research labs, corridors that haven\'t seen maintenance in years. These scans give us the foundation of authenticity that no procedural generation can match.',
      'From there, our environment team introduces what we call "dream decay" — subtle distortions that increase as the player moves deeper into a patient\'s subconscious. Walls that lean slightly. Floors that breathe. Windows that show a sky that isn\'t quite right.',
    ],
  },
  {
    slug: 'dynamic-fear-system',
    title: 'The Dynamic Fear System',
    date: '2024-12-12',
    tag: 'Engineering',
    excerpt: 'Building an AI that learns what scares you and adapts in real-time.',
    thumbnail: '/images/devlog/fear-system-thumb.jpg',
    relatedGame: 'reverie-of-fear',
    content: [
      'The core of Reverie of Fear\'s horror isn\'t scripted scares — it\'s an adaptive system that profiles what unsettles each individual player and evolves its approach accordingly.',
      'We track over 40 behavioral signals: where you look, how long you hesitate at doors, whether you explore dark corners or avoid them, your movement speed in different contexts. This data feeds into what we call the Fear Profile — a real-time model of your personal horror thresholds.',
    ],
  },
  {
    slug: 'player-feedback-integration',
    title: 'Listening to Our Players',
    date: '2024-12-10',
    tag: 'Community',
    excerpt: 'How community feedback shapes every major design decision at Sector Z.',
    thumbnail: '/images/devlog/feedback-thumb.jpg',
    content: [
      'We believe the best horror games are built in conversation with the people who play them. Every month, we run structured feedback sessions with our community.',
    ],
  },
  {
    slug: 'sound-design-philosophy',
    title: 'Sound Design Philosophy',
    date: '2024-12-08',
    tag: 'Audio',
    excerpt: 'Why silence is our most powerful tool, and how we design soundscapes that haunt.',
    thumbnail: '/images/devlog/sound-thumb.jpg',
    relatedGame: 'echoes-of-silence',
    content: [
      'In horror, what you don\'t hear matters more than what you do. Our approach to sound design starts with silence and builds outward — every sound must earn its place in the mix.',
    ],
  },
  {
    slug: 'narrative-design-process',
    title: 'Our Narrative Design Process',
    date: '2024-12-05',
    tag: 'Design',
    excerpt: 'How we structure branching narratives that feel natural, not mechanical.',
    thumbnail: '/images/devlog/narrative-thumb.jpg',
    content: [
      'Traditional branching narratives feel like choosing from a menu. Our approach is different — we design narrative spaces, not narrative paths.',
    ],
  },
  {
    slug: 'accessibility-first-approach',
    title: 'Accessibility From Day One',
    date: '2024-12-03',
    tag: 'Design',
    excerpt: 'How we build accessibility into our horror games without diluting the experience.',
    thumbnail: '/images/devlog/accessibility-thumb.jpg',
    content: [
      'Horror games often rely on sensory overload — loud sounds, flashing lights, rapid visual changes. Making these games accessible means rethinking how fear works at a fundamental level.',
    ],
  },
];

export function getPostBySlug(slug: string): DevlogPost | undefined {
  return devlogPosts.find((p) => p.slug === slug);
}

export const allTags = ['Art', 'Engineering', 'Design', 'Audio', 'Community'] as const;
```

**Step 2: Commit**

```bash
git add src/data/devlog.ts
git commit -m "feat: add centralized devlog data with types and helpers"
```

---

## Phase 2: Atmospheric Effects (Dust Motes + Cursor Update)

### Task 2.1: Create DustMotes component (replaces EmberParticles)

8 particles, white/gray, slow multi-directional drift, lower opacity than embers.

**Files:**
- Create: `src/components/ui/DustMotes.tsx`

**Step 1: Create the DustMotes component**

```tsx
'use client';

import { useEffect, useState } from 'react';

interface Mote {
  id: number;
  x: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
}

export function DustMotes() {
  const [motes, setMotes] = useState<Mote[]>([]);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const generated: Mote[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 2 + Math.random() * 2,
      opacity: 0.08 + Math.random() * 0.15,
      duration: 20 + Math.random() * 25,
      delay: -(Math.random() * 30),
      drift: -30 + Math.random() * 60,
    }));

    setMotes(generated);
  }, []);

  if (motes.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30"
      aria-hidden="true"
    >
      {motes.map((mote) => (
        <div
          key={mote.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${mote.x}%`,
            bottom: '-5%',
            width: `${mote.size}px`,
            height: `${mote.size}px`,
            opacity: mote.opacity,
            animation: `dustFloat${mote.id} ${mote.duration}s linear ${mote.delay}s infinite`,
          }}
        />
      ))}
      <style>{motes.map((mote) => `
        @keyframes dustFloat${mote.id} {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          10% {
            opacity: ${mote.opacity};
          }
          90% {
            opacity: ${mote.opacity};
          }
          100% {
            transform: translate(${mote.drift}px, -110vh);
            opacity: 0;
          }
        }
      `).join('\n')}</style>
    </div>
  );
}
```

**Step 2: Verify dev server renders dust motes**

Run dev server, check browser. Should see very faint white dots drifting upward slowly.

**Step 3: Commit**

```bash
git add src/components/ui/DustMotes.tsx
git commit -m "feat: add DustMotes component (replaces EmberParticles)"
```

---

### Task 2.2: Update CustomCursor colors to teal

The cursor component works fine — just needs its color references updated. Since it uses CSS classes from globals.css (`.cursor-dot`, `.cursor-ring`) which now reference `var(--accent)` (teal), the cursor should already be teal after Task 1.2.

**Files:**
- Verify: `src/components/ui/CustomCursor.tsx` — no code changes needed if it uses CSS classes

**Step 1: Read and verify CustomCursor.tsx uses CSS classes, not hardcoded colors**

If it does use CSS classes referencing `var(--accent)`, no changes needed. If it has hardcoded orange colors, update them to use the CSS variable.

**Step 2: Commit (only if changes were made)**

```bash
git add src/components/ui/CustomCursor.tsx
git commit -m "fix: update CustomCursor to use accent CSS variable"
```

---

## Phase 3: Layout Shell (Header + Signal Footer)

### Task 3.1: Rewrite Header with 4 nav links and transparent-to-blur behavior

**Files:**
- Rewrite: `src/components/layout/Header.tsx`

**Step 1: Rewrite Header.tsx**

```tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Games', href: '/games' },
  { name: 'Devlog', href: '/devlog' },
  { name: 'Studio', href: '/studio' },
  { name: 'Careers', href: '/careers' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-display text-xl lg:text-2xl text-foreground hover:text-accent transition-colors duration-200"
          >
            SECTOR Z
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'nav-link text-sm font-medium tracking-wide',
                  pathname.startsWith(item.href) && 'nav-link--active'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-accent transition-colors"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu — Full screen overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background/98 backdrop-blur-lg z-50">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-display text-3xl transition-colors duration-200',
                  pathname.startsWith(item.href)
                    ? 'text-accent'
                    : 'text-foreground hover:text-accent'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
```

**Step 2: Verify header renders**

Run dev server. Header should show "SECTOR Z" left, 4 links right, transparent background, muted gray links that turn white on hover with teal underline.

**Step 3: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat: rewrite Header with 4 nav links and transparent-to-blur

Remove glitch logo, chromatic aberration. Add active page indicator,
full-screen mobile overlay, pathname-based active states."
```

---

### Task 3.2: Create Signal footer (replaces Footer)

**Files:**
- Create: `src/components/layout/Signal.tsx`

**Step 1: Create Signal.tsx**

```tsx
import Link from 'next/link';
import { NewsletterForm } from '@/components/ui/NewsletterForm';

const socialLinks = [
  {
    name: 'Discord',
    href: '#',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: '#',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
        <path fill="var(--background)" d="M9.545 15.568V8.432L15.818 12z" />
      </svg>
    ),
  },
];

export function Signal() {
  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        {/* Signal Header */}
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
            The Signal
          </p>
          <h2 className="text-display text-3xl lg:text-4xl text-foreground">
            Stay connected
          </h2>
        </div>

        {/* Newsletter + Social */}
        <div className="max-w-lg mx-auto space-y-8">
          <NewsletterForm />

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-muted hover:text-accent transition-colors duration-200"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <div className="flex items-center gap-6">
            <Link href="/careers" className="hover:text-foreground transition-colors">
              Careers
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
          <p>© {new Date().getFullYear()} Sector Z. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Verify Signal footer renders at page bottom**

Run dev server. Navigate to any page. Should see "The Signal" footer with newsletter, social icons, and legal links.

**Step 3: Commit**

```bash
git add src/components/layout/Signal.tsx
git commit -m "feat: create Signal footer component

Cinematic footer with newsletter, social icons (Discord, X, YouTube),
quick links, and copyright. Replaces corporate Footer."
```

---

### Task 3.3: Update Button component for new design system

**Files:**
- Modify: `src/components/ui/Button.tsx`

**Step 1: Update Button to use Spectral Void colors and fill animation**

```tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'solid', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50';

    const variants = {
      solid: 'bg-accent text-background hover:bg-accent-hover',
      ghost: 'border border-border text-foreground hover:border-accent hover:text-accent',
      link: 'text-accent hover:text-accent-hover underline-offset-4 hover:underline',
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-6 text-sm',
      lg: 'h-13 px-8 text-base',
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
```

**Step 2: Commit**

```bash
git add src/components/ui/Button.tsx
git commit -m "feat: update Button for Spectral Void palette"
```

---

## Phase 4: Homepage — The 4-Beat Cinematic Scroll

This is the centerpiece of the entire overhaul.

### Task 4.1: Rewrite ScrollStory as the 4-beat orchestrator

**Files:**
- Rewrite: `src/components/ScrollStory.tsx`

**Step 1: Rewrite ScrollStory.tsx**

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VoidBeat } from './scroll-story/VoidBeat';
import { GamesBeat } from './scroll-story/GamesBeat';
import { StudioBeat } from './scroll-story/StudioBeat';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.disable());
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.config({ ignoreMobileResize: true });
      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="scroll-story"
      aria-label="Sector Z"
    >
      <VoidBeat prefersReducedMotion={prefersReducedMotion} />
      <GamesBeat prefersReducedMotion={prefersReducedMotion} />
      <StudioBeat prefersReducedMotion={prefersReducedMotion} />
      {/* Signal footer is rendered globally from layout.tsx */}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ScrollStory.tsx
git commit -m "feat: rewrite ScrollStory as 4-beat cinematic orchestrator

Three scroll beats: Void (opening), Games (showcase), Studio (pause).
Signal (footer) is now rendered globally from layout.tsx."
```

---

### Task 4.2: Create VoidBeat (Beat 1 — The Opening)

Full viewport darkness. Studio name fades in. Atmospheric subtitle. Teal scroll indicator pulses.

**Files:**
- Create: `src/components/scroll-story/VoidBeat.tsx`

**Step 1: Create VoidBeat.tsx**

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface VoidBeatProps {
  prefersReducedMotion: boolean;
}

export function VoidBeat({ prefersReducedMotion }: VoidBeatProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the void section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=50vh',
        pin: true,
        pinSpacing: true,
      });

      // Title fade in with slight Y movement
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.5,
            ease: 'power2.out',
          }
        );
      }

      // Subtitle fades in after title
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            delay: 1.3,
            ease: 'power2.out',
          }
        );
      }

      // Indicator fades in last
      if (indicatorRef.current) {
        gsap.fromTo(
          indicatorRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            delay: 1.8,
            ease: 'power2.out',
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="scroll-section scroll-section--pinned relative flex flex-col items-center justify-center bg-background film-grain"
      aria-label="Welcome"
    >
      <div className="relative z-10 text-center px-6">
        <h1
          ref={titleRef}
          className="text-display text-6xl sm:text-7xl md:text-8xl lg:text-[120px] text-foreground opacity-0"
        >
          SECTOR Z
        </h1>
        <p
          ref={subtitleRef}
          className="mt-6 text-muted text-lg md:text-xl max-w-md mx-auto opacity-0"
        >
          We make atmospheric horror games.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={indicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0"
      >
        <div className="w-px h-12 bg-gradient-to-b from-accent/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
```

**Step 2: Verify VoidBeat renders**

Run dev server, navigate to `/`. Should see a black screen, then "SECTOR Z" fades in large centered, then subtitle, then teal pulse indicator at bottom.

**Step 3: Commit**

```bash
git add src/components/scroll-story/VoidBeat.tsx
git commit -m "feat: create VoidBeat — cinematic opening with darkness and typography"
```

---

### Task 4.3: Create GamesBeat (Beat 2 — The Reveal)

Each game fills the entire viewport. Full-bleed background, parallax, film dissolve transitions.

**Files:**
- Create: `src/components/scroll-story/GamesBeat.tsx`

**Step 1: Create GamesBeat.tsx**

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { games } from '@/data/games';

interface GamesBeatProps {
  prefersReducedMotion: boolean;
}

export function GamesBeat({ prefersReducedMotion }: GamesBeatProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gameRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gameRefs.current.forEach((gameEl, index) => {
        if (!gameEl) return;

        const image = gameEl.querySelector('.game-bg');
        const content = gameEl.querySelector('.game-content');
        const overlay = gameEl.querySelector('.game-overlay');

        // Pin each game at full viewport
        ScrollTrigger.create({
          trigger: gameEl,
          start: 'top top',
          end: '+=100vh',
          pin: true,
          pinSpacing: true,
        });

        // Parallax on background image
        if (image) {
          gsap.fromTo(
            image,
            { y: '-5%' },
            {
              y: '5%',
              ease: 'none',
              scrollTrigger: {
                trigger: gameEl,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }

        // Content fade in
        if (content) {
          gsap.fromTo(
            content,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: gameEl,
                start: 'top 60%',
                once: true,
              },
            }
          );
        }

        // Film dissolve: fade overlay out as section enters view
        if (overlay) {
          gsap.fromTo(
            overlay,
            { opacity: 1 },
            {
              opacity: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: gameEl,
                start: 'top 80%',
                once: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={sectionRef}>
      {games.map((game, index) => (
        <section
          key={game.slug}
          ref={(el) => { gameRefs.current[index] = el; }}
          className="scroll-section scroll-section--pinned relative flex items-end overflow-hidden"
          aria-label={game.title}
        >
          {/* Background Image */}
          <div
            className="game-bg absolute inset-0 bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: `url(${game.heroImage})`,
              /* Fallback gradient if image doesn't load */
              backgroundColor: 'var(--surface)',
            }}
          />

          {/* Dark gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

          {/* Film dissolve overlay (fades out on scroll) */}
          <div className="game-overlay absolute inset-0 bg-background pointer-events-none z-10" />

          {/* Content */}
          <div className="game-content relative z-20 max-w-7xl mx-auto px-6 lg:px-8 pb-20 lg:pb-28 w-full opacity-0">
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
              {game.status}
            </p>
            <h2 className="text-display text-4xl sm:text-5xl lg:text-7xl text-foreground mb-4">
              {game.title}
            </h2>
            <p className="text-muted text-lg md:text-xl max-w-xl mb-8">
              {game.tagline}
            </p>
            <Link
              href={`/games/${game.slug}`}
              className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors duration-200 text-sm font-medium tracking-wide group"
            >
              Explore
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* "View all games" on last game */}
            {index === games.length - 1 && (
              <div className="mt-12">
                <Link
                  href="/games"
                  className="text-muted hover:text-accent transition-colors text-sm"
                >
                  View all games →
                </Link>
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
```

**Note:** The "View all games →" link points to `/games` which we'll create as a simple redirect to the homepage games section, or as a games hub page. For now, it links to the existing games page.

**Step 2: Verify games render as full-viewport sections**

Run dev server. After scrolling past the Void, each game should fill the viewport with a dark gradient, title, tagline, and "Explore" link. Background will be solid dark until real images are added.

**Step 3: Commit**

```bash
git add src/components/scroll-story/GamesBeat.tsx
git commit -m "feat: create GamesBeat — full-viewport game showcases with parallax and film dissolve"
```

---

### Task 4.4: Create StudioBeat (Beat 3 — The Pause)

Short, confident text section. No imagery. A breath before the Signal footer.

**Files:**
- Create: `src/components/scroll-story/StudioBeat.tsx`

**Step 1: Create StudioBeat.tsx**

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface StudioBeatProps {
  prefersReducedMotion: boolean;
}

export function StudioBeat({ prefersReducedMotion }: StudioBeatProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[60vh] flex items-center justify-center py-32 lg:py-40"
      aria-label="About Sector Z"
    >
      <div
        ref={contentRef}
        className="max-w-2xl mx-auto px-6 lg:px-8 text-center opacity-0"
      >
        <h2 className="text-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-8">
          We build worlds you can&apos;t forget.
        </h2>
        <p className="text-muted text-lg leading-relaxed">
          Sector Z is a game studio focused on atmospheric horror.
          We believe the best games don&apos;t just entertain — they linger.
          Every shadow, every sound, every silence is deliberate.
        </p>
      </div>
    </section>
  );
}
```

**Step 2: Verify StudioBeat renders as a brief text section**

Should appear after all games, centered text, fades in on scroll.

**Step 3: Commit**

```bash
git add src/components/scroll-story/StudioBeat.tsx
git commit -m "feat: create StudioBeat — brief studio statement between games and footer"
```

---

### Task 4.5: Clean up old scroll-story components

Remove the 5 old scroll sections and ProgressBar that are no longer used.

**Files:**
- Delete: `src/components/scroll-story/HeroSection.tsx`
- Delete: `src/components/scroll-story/CraftingWorldsSection.tsx`
- Delete: `src/components/scroll-story/SharpSystemsSection.tsx`
- Delete: `src/components/scroll-story/DevlogReelSection.tsx`
- Delete: `src/components/scroll-story/FinalCTASection.tsx`
- Delete: `src/components/scroll-story/ProgressBar.tsx`

**Step 1: Delete old scroll-story files**

```bash
rm src/components/scroll-story/HeroSection.tsx
rm src/components/scroll-story/CraftingWorldsSection.tsx
rm src/components/scroll-story/SharpSystemsSection.tsx
rm src/components/scroll-story/DevlogReelSection.tsx
rm src/components/scroll-story/FinalCTASection.tsx
rm src/components/scroll-story/ProgressBar.tsx
```

**Step 2: Verify no import errors**

Run: `npm run build`
Expected: Clean build with no references to deleted files.

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove old scroll-story sections (replaced by beat system)"
```

---

## Phase 5: Inner Pages

### Task 5.1: Create Games hub page (`/games`)

A simple page that shows all games in a list format — not a grid of thumbnails. Each game gets a large horizontal card.

**Files:**
- Rewrite: `src/app/games/page.tsx`

**Step 1: Rewrite games/page.tsx**

```tsx
import Link from 'next/link';
import { games } from '@/data/games';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Games — Sector Z',
  description: 'Explore our atmospheric horror games.',
};

export default function GamesPage() {
  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="mb-16">
          <h1 className="text-display text-4xl sm:text-5xl lg:text-6xl text-foreground">
            Games
          </h1>
        </header>

        <div className="space-y-1">
          {games.map((game) => (
            <Link
              key={game.slug}
              href={`/games/${game.slug}`}
              className="group block py-8 border-b border-border hover:border-accent transition-colors duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h2 className="text-display text-2xl lg:text-3xl text-foreground group-hover:text-accent transition-colors duration-200">
                    {game.title}
                  </h2>
                  <p className="text-muted mt-2">{game.tagline}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted">
                  <span className="text-accent">{game.status}</span>
                  <span>{game.year}</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Verify page renders at `/games`**

Should show a clean list of all 6 games with titles, taglines, status, year. Hover highlights title in teal.

**Step 3: Commit**

```bash
git add src/app/games/page.tsx
git commit -m "feat: rewrite /games as minimal list layout"
```

---

### Task 5.2: Rewrite individual game page (`/games/[slug]`)

Immersive single-game page: full-bleed hero, synopsis, media gallery, Steam CTA, related devlog posts.

**Files:**
- Rewrite: `src/app/games/[slug]/page.tsx`

**Step 1: Rewrite games/[slug]/page.tsx**

```tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { games, getGameBySlug } from '@/data/games';
import { devlogPosts } from '@/data/devlog';
import { Button } from '@/components/ui/Button';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return { title: 'Game Not Found' };
  return {
    title: `${game.title} — Sector Z`,
    description: game.tagline,
  };
}

export default async function GamePage({ params }: PageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) notFound();

  const relatedPosts = devlogPosts
    .filter((p) => p.relatedGame === game.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[70vh] lg:h-[80vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${game.heroImage})`,
            backgroundColor: 'var(--surface)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-16 lg:pb-24 w-full">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
            {game.status} · {game.year}
          </p>
          <h1 className="text-display text-5xl sm:text-6xl lg:text-8xl text-foreground mb-4">
            {game.title}
          </h1>
          <div className="flex flex-wrap gap-3 mb-6">
            {game.genre.map((g) => (
              <span
                key={g}
                className="text-sm text-muted border border-border px-3 py-1"
              >
                {g}
              </span>
            ))}
          </div>
          {game.platforms.length > 0 && (
            <p className="text-muted text-sm">
              {game.platforms.join(' · ')}
            </p>
          )}
        </div>
      </section>

      {/* Synopsis */}
      <section className="max-w-[65ch] mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="space-y-6">
          {game.synopsis.map((paragraph, i) => (
            <p key={i} className="text-foreground/90 text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* CTA */}
        {(game.steamUrl || game.trailerUrl) && (
          <div className="flex flex-wrap gap-4 mt-12">
            {game.steamUrl && (
              <Button variant="solid" size="lg">
                Wishlist on Steam
              </Button>
            )}
            {game.trailerUrl && (
              <Button variant="ghost" size="lg">
                Watch Trailer
              </Button>
            )}
          </div>
        )}
      </section>

      {/* Screenshots */}
      {game.screenshots.length > 0 && (
        <section className="pb-20 lg:pb-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {game.screenshots.map((src, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[400px] lg:w-[600px] aspect-video bg-surface overflow-hidden"
                >
                  <img
                    src={src}
                    alt={`${game.title} screenshot ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Devlog Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-border py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-display text-2xl lg:text-3xl text-foreground mb-10">
              Development Diary
            </h2>
            <div className="space-y-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/devlog/${post.slug}`}
                  className="block group py-4 border-b border-border hover:border-accent transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-foreground group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted text-sm mt-1">{post.excerpt}</p>
                    </div>
                    <span className="text-muted text-sm hidden sm:block">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <Link
          href="/games"
          className="text-muted hover:text-accent transition-colors text-sm"
        >
          ← All games
        </Link>
      </div>
    </div>
  );
}
```

**Step 2: Verify game page renders at `/games/reverie-of-fear`**

Should show full-bleed hero (dark bg until real images added), title, genre tags, synopsis, CTA buttons, related devlog posts.

**Step 3: Commit**

```bash
git add src/app/games/[slug]/page.tsx
git commit -m "feat: rewrite game detail page as immersive showcase

Full-bleed hero, synopsis, screenshot gallery, Steam/trailer CTAs,
related devlog posts. Uses centralized game data."
```

---

### Task 5.3: Rewrite Devlog page (`/devlog`)

Thumbnail card feed with tag filtering.

**Files:**
- Rewrite: `src/app/devlog/page.tsx`

**Step 1: Rewrite devlog/page.tsx**

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { devlogPosts, allTags } from '@/data/devlog';
import { cn } from '@/lib/utils';

export default function DevlogPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? devlogPosts.filter((p) => p.tag === activeTag)
    : devlogPosts;

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-display text-4xl sm:text-5xl lg:text-6xl text-foreground">
            Devlog
          </h1>
        </header>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          <button
            onClick={() => setActiveTag(null)}
            className={cn(
              'px-4 py-1.5 text-sm transition-colors duration-200',
              activeTag === null
                ? 'bg-accent text-background'
                : 'text-muted border border-border hover:border-muted'
            )}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={cn(
                'px-4 py-1.5 text-sm transition-colors duration-200',
                activeTag === tag
                  ? 'bg-accent text-background'
                  : 'text-muted border border-border hover:border-muted'
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Post Feed */}
        <div className="space-y-8">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/devlog/${post.slug}`}
              className="group flex gap-6 py-6 border-b border-border hover:border-accent transition-colors duration-200"
            >
              {/* Thumbnail */}
              <div className="flex-shrink-0 w-40 lg:w-52 aspect-video bg-surface overflow-hidden hidden sm:block">
                {post.thumbnail ? (
                  <img
                    src={post.thumbnail}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-surface" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-accent text-xs font-medium tracking-wider uppercase">
                    {post.tag}
                  </span>
                  <span className="text-muted text-xs">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <h2 className="text-foreground text-lg font-medium group-hover:text-accent transition-colors duration-200 mb-2">
                  {post.title}
                </h2>
                <p className="text-muted text-sm line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-muted text-center py-20">
            No posts found for this tag.
          </p>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Verify devlog page renders at `/devlog`**

Should show tag filter buttons at top, then a vertical feed of posts with thumbnails on the left.

**Step 3: Commit**

```bash
git add src/app/devlog/page.tsx
git commit -m "feat: rewrite devlog as thumbnail card feed with tag filtering"
```

---

### Task 5.4: Rewrite individual devlog post page

**Files:**
- Rewrite: `src/app/devlog/[slug]/page.tsx`

**Step 1: Rewrite devlog/[slug]/page.tsx**

```tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { devlogPosts, getPostBySlug } from '@/data/devlog';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return devlogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} — Sector Z Devlog`,
    description: post.excerpt,
  };
}

export default async function DevlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="min-h-screen pt-24 lg:pt-32 pb-20">
      {/* Header Image */}
      {post.headerImage && (
        <div className="max-w-5xl mx-auto px-6 lg:px-8 mb-12">
          <div className="aspect-[21/9] bg-surface overflow-hidden">
            <img
              src={post.headerImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Article */}
      <div className="max-w-[65ch] mx-auto px-6 lg:px-8">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-accent text-sm font-medium tracking-wider uppercase">
              {post.tag}
            </span>
            <span className="text-muted text-sm">
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          <h1 className="text-display text-3xl sm:text-4xl lg:text-5xl text-foreground">
            {post.title}
          </h1>
        </header>

        <div className="space-y-6">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-foreground/90 text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-border">
          <Link
            href="/devlog"
            className="text-muted hover:text-accent transition-colors text-sm"
          >
            ← All posts
          </Link>
        </div>
      </div>
    </article>
  );
}
```

**Step 2: Verify post page renders at `/devlog/creating-atmospheric-environments`**

**Step 3: Commit**

```bash
git add src/app/devlog/[slug]/page.tsx
git commit -m "feat: rewrite devlog post page with editorial article layout"
```

---

### Task 5.5: Rewrite Studio page

Manifesto, concept art showcase, team names + roles.

**Files:**
- Rewrite: `src/app/studio/page.tsx`

**Step 1: Rewrite studio/page.tsx**

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Studio — Sector Z',
  description: 'Who we are and why we make atmospheric horror games.',
};

const team = [
  { name: 'Alex Chen', role: 'Creative Director' },
  { name: 'Sarah Martinez', role: 'Lead Developer' },
  { name: 'David Kim', role: 'Art Director' },
  { name: 'Emma Thompson', role: 'Audio Designer' },
  { name: 'Marcus Johnson', role: 'Game Designer' },
  { name: 'Lisa Wang', role: 'Producer' },
];

const artworks = [
  '/images/studio/concept-01.jpg',
  '/images/studio/concept-02.jpg',
  '/images/studio/concept-03.jpg',
  '/images/studio/concept-04.jpg',
  '/images/studio/concept-05.jpg',
  '/images/studio/concept-06.jpg',
];

export default function StudioPage() {
  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      {/* Manifesto */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <h1 className="text-display text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-8">
          We believe the best horror doesn&apos;t scare you — it stays with you.
        </h1>
        <div className="max-w-[65ch] space-y-6">
          <p className="text-muted text-lg leading-relaxed">
            Sector Z was founded on a simple conviction: that games can be more than entertainment. They can be experiences that reshape how you see the dark.
          </p>
          <p className="text-muted text-lg leading-relaxed">
            Every project we take on starts with a question: what if? What if sound was your only weapon? What if memories could fight back? What if the game learned what scared you? We chase those questions into the unknown and build worlds around what we find.
          </p>
        </div>
      </section>

      {/* Concept Art Showcase */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {artworks.map((src, i) => (
              <div key={i} className="aspect-video bg-surface overflow-hidden">
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <h2 className="text-display text-2xl lg:text-3xl text-foreground mb-10">
          Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
          {team.map((member) => (
            <div key={member.name}>
              <p className="text-foreground font-medium">{member.name}</p>
              <p className="text-muted text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Press Kit */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
        <p className="text-muted text-sm">
          Press inquiries:{' '}
          <a href="mailto:press@sectorz.studio" className="text-accent hover:text-accent-hover transition-colors">
            press@sectorz.studio
          </a>
        </p>
      </section>
    </div>
  );
}
```

**Step 2: Create placeholder studio images directory**

```bash
mkdir -p public/images/studio
echo "Replace with concept art." > public/images/studio/README.md
```

**Step 3: Commit**

```bash
git add src/app/studio/page.tsx public/images/studio/README.md
git commit -m "feat: rewrite studio page with manifesto, concept art grid, and team roster"
```

---

### Task 5.6: Rewrite Careers page

Clean, functional. Culture statement, expandable job listings, benefits.

**Files:**
- Rewrite: `src/app/careers/page.tsx`

**Step 1: Rewrite careers/page.tsx**

```tsx
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import type { Metadata } from 'next';

interface Job {
  id: string;
  role: string;
  team: string;
  location: string;
  type: string;
  description: string[];
}

const jobs: Job[] = [
  {
    id: '1',
    role: 'Senior Game Designer',
    team: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description: [
      'Design core gameplay systems for atmospheric horror games. Define player progression, difficulty curves, and fear mechanics. Work directly with our Creative Director to shape player experience.',
    ],
  },
  {
    id: '2',
    role: '3D Environment Artist',
    team: 'Art',
    location: 'Remote',
    type: 'Full-time',
    description: [
      'Create atmospheric 3D environments that tell stories through environmental detail. Model, texture, and light spaces that feel lived-in, decayed, and unsettling.',
    ],
  },
  {
    id: '3',
    role: 'Audio Designer',
    team: 'Audio',
    location: 'Remote',
    type: 'Full-time',
    description: [
      'Design adaptive soundscapes that respond to player behavior. Create ambient audio, creature sounds, and environmental audio that builds tension without relying on jump scares.',
    ],
  },
  {
    id: '4',
    role: 'Frontend Developer',
    team: 'Engineering',
    location: 'Remote',
    type: 'Contract',
    description: [
      'Build and maintain our web presence, community tools, and game-adjacent web experiences. React, TypeScript, Next.js. You care about performance and craft.',
    ],
  },
  {
    id: '5',
    role: 'Community Manager',
    team: 'Community',
    location: 'Remote',
    type: 'Part-time',
    description: [
      'Grow and nurture our player community across Discord, social media, and forums. Organize playtests, gather feedback, and be the bridge between players and developers.',
    ],
  },
  {
    id: '6',
    role: 'QA Tester',
    team: 'QA',
    location: 'Remote',
    type: 'Contract',
    description: [
      'Test atmospheric horror games for bugs, performance issues, and player experience problems. Write detailed reports and work with developers to ensure quality.',
    ],
  },
];

const benefits = [
  'Competitive salary and equity',
  'Flexible working hours',
  'Remote-first culture',
  'Health and dental insurance',
  'Professional development budget',
  'Game development resources',
  'Creative freedom and autonomy',
];

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-display text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
            Careers
          </h1>
          <p className="text-muted text-lg max-w-[65ch]">
            We&apos;re a small, remote team that cares deeply about craft. If you want to make games that linger in people&apos;s minds, we want to hear from you.
          </p>
        </header>

        {/* Job Listings */}
        <section className="mb-20">
          <h2 className="text-display text-2xl text-foreground mb-8">
            Open positions
          </h2>
          <div className="divide-y divide-border">
            {jobs.map((job) => (
              <div key={job.id}>
                <button
                  onClick={() =>
                    setExpandedJob(expandedJob === job.id ? null : job.id)
                  }
                  className="w-full py-6 flex items-center justify-between text-left group"
                >
                  <div>
                    <h3 className="text-foreground font-medium group-hover:text-accent transition-colors">
                      {job.role}
                    </h3>
                    <p className="text-muted text-sm mt-1">
                      {job.team} · {job.location} · {job.type}
                    </p>
                  </div>
                  <svg
                    className={cn(
                      'w-5 h-5 text-muted transition-transform duration-200',
                      expandedJob === job.id && 'rotate-180'
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expandedJob === job.id && (
                  <div className="pb-6 space-y-4">
                    {job.description.map((p, i) => (
                      <p key={i} className="text-muted leading-relaxed">
                        {p}
                      </p>
                    ))}
                    <Button variant="solid" size="sm">
                      Apply
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section>
          <h2 className="text-display text-2xl text-foreground mb-8">
            What we offer
          </h2>
          <ul className="space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="text-muted flex items-center gap-3">
                <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
```

**Step 2: Verify careers page renders at `/careers`**

**Step 3: Commit**

```bash
git add src/app/careers/page.tsx
git commit -m "feat: rewrite careers page with expandable job listings"
```

---

## Phase 6: Cleanup

### Task 6.1: Remove old pages and unused components

Delete pages that were removed from the site architecture and components that are no longer used.

**Files:**
- Delete: `src/app/community/page.tsx`
- Delete: `src/app/contact/page.tsx`
- Delete: `src/components/layout/Footer.tsx`
- Delete: `src/components/ui/EmberParticles.tsx`
- Delete: `src/components/ui/PageRevealWrapper.tsx`
- Delete: `src/components/ui/SectionHeader.tsx`
- Delete: `src/components/ui/CardGrid.tsx`
- Delete: `src/components/ui/JobList.tsx`
- Delete: `src/components/ui/Lightbox.tsx`

**Step 1: Delete files**

```bash
rm src/app/community/page.tsx
rmdir src/app/community
rm src/app/contact/page.tsx
rmdir src/app/contact
rm src/components/layout/Footer.tsx
rm src/components/ui/EmberParticles.tsx
rm src/components/ui/PageRevealWrapper.tsx
rm src/components/ui/SectionHeader.tsx
rm src/components/ui/CardGrid.tsx
rm src/components/ui/JobList.tsx
rm src/components/ui/Lightbox.tsx
```

**Step 2: Simplify privacy and terms pages**

Rewrite `src/app/privacy/page.tsx` and `src/app/terms/page.tsx` as minimal legal pages (no heavy layout, just text):

For both files, use this pattern:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Sector Z',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="max-w-[65ch] mx-auto px-6 lg:px-8">
        <h1 className="text-display text-3xl text-foreground mb-8">
          Privacy Policy
        </h1>
        <div className="space-y-6 text-muted leading-relaxed">
          <p>Last updated: March 2026</p>
          <p>
            Sector Z respects your privacy. This policy describes how we collect,
            use, and protect your information when you visit our website.
          </p>
          {/* Add more content as needed */}
        </div>
      </div>
    </div>
  );
}
```

(Same pattern for terms page with appropriate content.)

**Step 3: Verify build**

Run: `npm run build`
Expected: Clean build, no import errors for deleted files.

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove unused pages and components

Delete /community, /contact, Footer, EmberParticles, PageRevealWrapper,
SectionHeader, CardGrid, JobList, Lightbox. Simplify privacy/terms pages."
```

---

### Task 6.2: Update NewsletterForm for new design system

The existing NewsletterForm uses old color variables. Update it.

**Files:**
- Modify: `src/components/ui/NewsletterForm.tsx`

**Step 1: Read the current file and update color references**

Replace any references to:
- `gray-*` number variants → `muted`, `border`, `surface`, `foreground`
- `accent` (already correct, now teal)
- Old rounded/rounding → remove (sharp corners)

The key changes are replacing Tailwind color classes like `bg-gray-800` with `bg-surface`, `text-gray-400` with `text-muted`, `border-gray-800` with `border-border`, etc.

**Step 2: Verify newsletter form renders in the Signal footer**

**Step 3: Commit**

```bash
git add src/components/ui/NewsletterForm.tsx
git commit -m "fix: update NewsletterForm colors for Spectral Void palette"
```

---

### Task 6.3: Update sitemap and robots

**Files:**
- Modify: `src/app/sitemap.ts`

**Step 1: Update sitemap to remove deleted routes and reflect new structure**

Remove `/community` and `/contact` from the sitemap. Ensure all game slugs and devlog slugs are included.

**Step 2: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "fix: update sitemap for new page structure"
```

---

### Task 6.4: Final verification

**Step 1: Run full build**

Run: `npm run build`
Expected: Clean build, no errors, no warnings about missing components.

**Step 2: Run dev server and manually check all pages**

- `/` — VoidBeat → GamesBeat (6 games) → StudioBeat → Signal footer
- `/games` — List of all games
- `/games/reverie-of-fear` — Immersive game page
- `/devlog` — Thumbnail card feed with tag filtering
- `/devlog/creating-atmospheric-environments` — Article layout
- `/studio` — Manifesto, art grid, team roster
- `/careers` — Expandable job listings
- `/privacy`, `/terms` — Minimal legal pages
- Header: 4 links, transparent-to-blur, mobile menu
- Signal footer: newsletter, social icons, legal links
- Custom cursor: teal dot + ring
- Dust motes: subtle white particles
- Vignette: dark edge overlay
- Film grain: barely visible texture

**Step 3: Final commit (if any fixes needed)**

```bash
git add -A
git commit -m "fix: final adjustments from verification pass"
```

---

## Summary

| Phase | Tasks | What Changes |
|-------|-------|--------------|
| 1. Foundation | 1.1–1.5 | Geist font, Spectral Void CSS, root layout, game/devlog data |
| 2. Effects | 2.1–2.2 | DustMotes (replaces EmberParticles), cursor color verification |
| 3. Layout | 3.1–3.3 | New Header (4 links), Signal footer, Button update |
| 4. Homepage | 4.1–4.5 | VoidBeat, GamesBeat, StudioBeat, delete old sections |
| 5. Inner Pages | 5.1–5.6 | Games hub, game detail, devlog, devlog post, studio, careers |
| 6. Cleanup | 6.1–6.4 | Delete unused pages/components, update newsletter, sitemap, verify |

**Total: 20 tasks across 6 phases.**
