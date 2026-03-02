# Sector Z Visual Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the Sector Z website from a generic dark-mode template into a distinctive, atmospheric horror game studio identity through typography, color, atmospheric effects, glitch interactions, asymmetric layouts, and a loading experience.

**Architecture:** All changes are CSS-first where possible, with three new lightweight client components (CustomCursor, EmberParticles, PageReveal) mounted in the root layout. Existing component modifications are minimal — mostly className changes. The color/font foundation in globals.css + layout.tsx must land first since everything else references those variables.

**Tech Stack:** Next.js 15 / React 19 / Tailwind CSS v4 / GSAP / Google Fonts (Dela Gothic One, DM Sans)

---

### Task 1: Foundation — Typography and Color Palette

**Files:**
- Modify: `src/app/layout.tsx` (lines 2, 7-11, 33, 40)
- Modify: `src/app/globals.css` (lines 3-17, 19-34, 36-42, 108-112)

**Step 1: Update font imports in layout.tsx**

Replace the Inter import and font config with Dela Gothic One + DM Sans:

```tsx
import { Dela_Gothic_One, DM_Sans } from 'next/font/google';

const delaGothic = Dela_Gothic_One({
	variable: '--font-display',
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
});

const dmSans = DM_Sans({
	variable: '--font-body',
	subsets: ['latin'],
	display: 'swap',
});
```

Update the body className to use both font variables:

```tsx
<body className={`${delaGothic.variable} ${dmSans.variable} font-sans antialiased`}>
```

Remove `bg-black text-white` from the body className (handled by CSS variables now).

**Step 2: Update CSS variables in globals.css**

Replace the `:root` block (lines 3-17) with:

```css
:root {
	--background: #06060a;
	--foreground: #e8e4df;
	--accent: #ff4d2a;
	--accent-hover: #ff6b4a;
	--accent-cool: #4a7aff;
	--gray-900: #0a0a12;
	--gray-800: #12121c;
	--gray-700: #1e1e2a;
	--gray-600: #2e2e3c;
	--gray-500: #4a4a5c;
	--gray-400: #6b6578;
	--gray-300: #8a8698;
	--gray-200: #b0acba;
	--gray-100: #d4d0dc;
}
```

**Step 3: Update @theme inline block**

Replace the `@theme inline` block (lines 19-34) with:

```css
@theme inline {
	--color-background: var(--background);
	--color-foreground: var(--foreground);
	--color-accent: var(--accent);
	--color-accent-hover: var(--accent-hover);
	--color-accent-cool: var(--accent-cool);
	--color-gray-900: var(--gray-900);
	--color-gray-800: var(--gray-800);
	--color-gray-700: var(--gray-700);
	--color-gray-600: var(--gray-600);
	--color-gray-500: var(--gray-500);
	--color-gray-400: var(--gray-400);
	--color-gray-300: var(--gray-300);
	--color-gray-200: var(--gray-200);
	--color-gray-100: var(--gray-100);
	--font-sans: var(--font-body);
	--font-display: var(--font-display);
}
```

**Step 4: Update body and .text-cinematic styles**

Replace the body style (lines 36-42) with:

```css
body {
	background: var(--background);
	color: var(--foreground);
	font-family: var(--font-body), system-ui, -apple-system, sans-serif;
	font-size: 16px;
	line-height: 1.6;
}
```

Replace `.text-cinematic` (lines 108-112) with:

```css
.text-cinematic {
	font-family: var(--font-display), system-ui, sans-serif;
	font-weight: 400;
	letter-spacing: -0.04em;
	line-height: 1.0;
}
```

Note: Dela Gothic One only has weight 400 so we set font-weight to 400. The font itself is already very heavy/bold.

**Step 5: Run dev server to verify fonts load and colors render**

Run: `npm run dev`
Expected: Site loads with new blue-black background, warm white text, ember-orange accents, heavy display font on headings, DM Sans on body text.

**Step 6: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat: replace typography and color palette with Cinematic Horror theme

Swap Inter for Dela Gothic One (display) + DM Sans (body).
Replace cyan-on-black palette with Ember & Shadow colors."
```

---

### Task 2: Atmospheric CSS — Grain, Atmosphere, Glitch, Scan-line, Cursor Styles

**Files:**
- Modify: `src/app/globals.css` (multiple sections)

**Step 1: Enhance film grain with animation**

Replace the `.film-grain::before` block (lines 74-105) with:

```css
/* Film grain overlay utility */
.film-grain::before {
	content: '';
	position: absolute;
	top: -50%;
	left: -50%;
	width: 200%;
	height: 200%;
	opacity: 0.07;
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
```

**Step 2: Add atmosphere utility class**

Add after the film grain block:

```css
/* Atmospheric gradient mesh */
.atmosphere {
	position: relative;
}

.atmosphere::before {
	content: '';
	position: absolute;
	inset: 0;
	background:
		radial-gradient(ellipse at 20% 50%, rgba(255, 77, 42, 0.04) 0%, transparent 60%),
		radial-gradient(ellipse at 80% 20%, rgba(74, 122, 255, 0.03) 0%, transparent 50%),
		radial-gradient(ellipse at 50% 80%, rgba(255, 107, 74, 0.03) 0%, transparent 55%);
	pointer-events: none;
	z-index: 0;
}
```

**Step 3: Add glitch keyframes for logo**

Add after the atmosphere block:

```css
/* Logo glitch animation */
@keyframes glitch {
	0%, 95%, 100% {
		transform: translate(0);
		text-shadow: none;
	}
	96% {
		transform: translate(-2px, 0);
		text-shadow: 2px 0 var(--accent), -2px 0 var(--accent-cool);
	}
	97% {
		transform: translate(2px, 0);
		text-shadow: -2px 0 var(--accent), 2px 0 var(--accent-cool);
	}
	98% {
		transform: translate(-1px, 0);
		text-shadow: 1px 0 var(--accent), -1px 0 var(--accent-cool);
	}
	99% {
		transform: translate(0);
		text-shadow: none;
	}
}

.glitch-text {
	animation: glitch 8s ease-in-out infinite;
	display: inline-block;
}
```

**Step 4: Add nav link chromatic aberration hover**

```css
/* Nav chromatic aberration hover */
.nav-link-glitch {
	transition: text-shadow 0.2s ease-out;
}

.nav-link-glitch:hover {
	text-shadow: -1px 0 var(--accent), 1px 0 var(--accent-cool);
}
```

**Step 5: Add card scan-line effect**

```css
/* Card scan-line hover effect */
.scan-line-hover {
	position: relative;
	overflow: hidden;
}

.scan-line-hover::after {
	content: '';
	position: absolute;
	top: -100%;
	left: 0;
	width: 100%;
	height: 8px;
	background: linear-gradient(
		to bottom,
		transparent,
		rgba(255, 255, 255, 0.05),
		transparent
	);
	pointer-events: none;
	z-index: 10;
	transition: none;
}

.scan-line-hover:hover::after {
	animation: scanLine 0.6s ease-out forwards;
}

@keyframes scanLine {
	from { top: -8px; }
	to { top: 100%; }
}
```

**Step 6: Add custom cursor CSS**

```css
/* Custom cursor */
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

/* Hide custom cursor on touch devices */
@media (pointer: coarse) {
	.cursor-dot,
	.cursor-ring {
		display: none;
	}
}
```

**Step 7: Add page reveal CSS**

```css
/* Page reveal animation */
.page-reveal {
	opacity: 0;
	transform: translateY(8px);
	transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.page-reveal[data-loaded="true"] {
	opacity: 1;
	transform: translateY(0);
}

.page-reveal::before {
	content: '';
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 4px;
	background: linear-gradient(90deg, var(--accent), var(--accent-cool));
	z-index: 9998;
	transform: scaleX(1);
	transform-origin: left;
	transition: transform 0.8s ease-out 0.1s;
}

.page-reveal[data-loaded="true"]::before {
	transform: scaleX(0);
	transform-origin: right;
}
```

**Step 8: Update progress bar to use accent-cool gradient**

Replace `.progress-bar__fill` background (line 173):

```css
.progress-bar__fill {
	width: 100%;
	height: 0%;
	background: linear-gradient(to bottom, var(--accent), var(--accent-cool));
	transition: height 0.1s ease-out;
}
```

**Step 9: Update reduced motion overrides**

Add to the existing `@media (prefers-reduced-motion: reduce)` block:

```css
	.glitch-text {
		animation: none;
	}

	.film-grain::before {
		animation: none;
	}

	.scan-line-hover::after {
		animation: none;
	}

	.page-reveal {
		opacity: 1;
		transform: none;
		transition: none;
	}

	.page-reveal::before {
		display: none;
	}
```

**Step 10: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add atmospheric CSS — enhanced grain, glitch, scan-line, cursor, page reveal

Living film grain animation, gradient mesh atmosphere utility, logo glitch
keyframes, nav chromatic aberration, card scan-line sweep, custom cursor
styles, and page reveal animation."
```

---

### Task 3: CustomCursor Component

**Files:**
- Create: `src/components/ui/CustomCursor.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Create CustomCursor component**

```tsx
'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Don't render on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      // Update dot immediately
      if (dotRef.current) {
        dotRef.current.style.setProperty('--cx', `${e.clientX}px`);
        dotRef.current.style.setProperty('--cy', `${e.clientY}px`);
      }
    };

    // Smooth ring follow with lerp
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.setProperty('--cx', `${ringPos.current.x}px`);
        ringRef.current.style.setProperty('--cy', `${ringPos.current.y}px`);
      }
      rafId.current = requestAnimationFrame(animate);
    };

    // Hover detection for interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')) {
        document.body.classList.add('cursor-hover');
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')) {
        document.body.classList.remove('cursor-hover');
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    rafId.current = requestAnimationFrame(animate);

    // Hide default cursor
    document.documentElement.style.cursor = 'none';
    const style = document.createElement('style');
    style.textContent = 'a, button, input, textarea, select, [role="button"] { cursor: none !important; }';
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafId.current);
      document.documentElement.style.cursor = '';
      style.remove();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
```

**Step 2: Add CustomCursor to layout.tsx**

Import at top of layout.tsx:

```tsx
import { CustomCursor } from '@/components/ui/CustomCursor';
```

Add inside `<body>`, after `<Footer />`:

```tsx
<CustomCursor />
```

**Step 3: Verify cursor works**

Run: `npm run dev`
Expected: Small accent-colored dot follows cursor immediately, larger ring follows with slight delay. Ring expands on buttons/links. Hidden on mobile.

**Step 4: Commit**

```bash
git add src/components/ui/CustomCursor.tsx src/app/layout.tsx
git commit -m "feat: add custom cursor with dot + ring interaction

Accent-colored dot with delayed ring follow. Ring expands on interactive
elements. Hidden on touch devices via pointer: coarse media query."
```

---

### Task 4: EmberParticles Component

**Files:**
- Create: `src/components/ui/EmberParticles.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Create EmberParticles component**

```tsx
'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 2,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * -30,
    opacity: 0.1 + Math.random() * 0.3,
  }));
}

export function EmberParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Respect reduced motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setVisible(!mq.matches);
    const handler = (e: MediaQueryListEvent) => setVisible(!e.matches);
    mq.addEventListener('change', handler);

    setParticles(generateParticles(14));

    return () => mq.removeEventListener('change', handler);
  }, []);

  if (!visible || particles.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: `var(--accent)`,
            opacity: p.opacity,
            animation: `emberFloat ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes emberFloat {
          0% {
            transform: translateY(0) translateX(0);
            opacity: var(--ember-opacity, 0.2);
          }
          50% {
            transform: translateY(-50vh) translateX(20px);
          }
          100% {
            transform: translateY(-110vh) translateX(-10px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
```

**Step 2: Add EmberParticles to layout.tsx**

Import at top:

```tsx
import { EmberParticles } from '@/components/ui/EmberParticles';
```

Add inside `<body>`, after `<CustomCursor />`:

```tsx
<EmberParticles />
```

**Step 3: Verify particles render**

Run: `npm run dev`
Expected: Small ember-colored dots float slowly upward across the viewport. Subtle, not distracting. Disappear when prefers-reduced-motion is enabled.

**Step 4: Commit**

```bash
git add src/components/ui/EmberParticles.tsx src/app/layout.tsx
git commit -m "feat: add floating ember particles overlay

14 CSS-animated particles drift upward at varying speeds/opacities.
Respects prefers-reduced-motion. Fixed overlay, pointer-events: none."
```

---

### Task 5: Page Reveal + Layout Assembly

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Make layout.tsx a client-boundary wrapper for page reveal**

Create a client wrapper component inline in layout.tsx. Update the body content to:

```tsx
import { PageRevealWrapper } from '@/components/ui/PageRevealWrapper';
```

Create `src/components/ui/PageRevealWrapper.tsx`:

```tsx
'use client';

import { useEffect, useRef } from 'react';

export function PageRevealWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Small delay to ensure paint, then reveal
    const timer = setTimeout(() => {
      ref.current?.setAttribute('data-loaded', 'true');
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={ref} className="page-reveal">
      {children}
    </div>
  );
}
```

**Step 2: Wrap main content in layout.tsx**

Update the body in layout.tsx to wrap `<main>` with the reveal:

```tsx
<body className={`${delaGothic.variable} ${dmSans.variable} font-sans antialiased`}>
  <PageRevealWrapper>
    <Header />
    <main id="main-content">{children}</main>
    <Footer />
  </PageRevealWrapper>
  <CustomCursor />
  <EmberParticles />
</body>
```

Note: CustomCursor and EmberParticles stay outside the reveal wrapper so they're always visible.

**Step 3: Verify page reveal works**

Run: `npm run dev`
Expected: On page load, content fades in over 0.8s with slight upward motion. A colored gradient line at the top shrinks away during reveal.

**Step 4: Commit**

```bash
git add src/components/ui/PageRevealWrapper.tsx src/app/layout.tsx
git commit -m "feat: add page reveal animation on load

Content fades in with upward motion over 0.8s. Gradient accent line
sweeps across top during reveal. Disabled for reduced motion."
```

---

### Task 6: Header — Logo Glitch + Nav Chromatic Aberration

**Files:**
- Modify: `src/components/layout/Header.tsx` (lines 51-56, 60-68, 104-115)

**Step 1: Update logo with glitch class and display font**

Replace the logo Link (lines 51-56):

```tsx
<Link
  href="/"
  className="text-2xl text-cinematic text-white hover:text-accent transition-colors glitch-text"
>
  SECTOR Z
</Link>
```

Changes: Added `text-cinematic` (uses Dela Gothic One), `glitch-text` class, uppercased text.

**Step 2: Add chromatic aberration to nav links**

Replace the desktop nav link className (line 64):

```tsx
className="nav-link-glitch text-white hover:text-accent transition-colors text-sm font-medium tracking-wide"
```

**Step 3: Update mobile nav links too**

Replace the mobile nav link className (line 110):

```tsx
className="block px-3 py-2 nav-link-glitch text-white hover:text-accent transition-colors text-base font-medium"
```

**Step 4: Update scrolled header background**

Replace `bg-black/95` (line 44) with:

```tsx
'bg-background/95 backdrop-blur-md border-b border-white/10'
```

And `bg-black/95` in mobile menu (line 104):

```tsx
className="lg:hidden border-t border-white/10 bg-background/95 backdrop-blur-md"
```

**Step 5: Update footer logo to match**

In `src/components/layout/Footer.tsx`, update the footer logo Link (line 71):

```tsx
<Link href="/" className="text-xl text-cinematic text-white">
  SECTOR Z
</Link>
```

**Step 6: Verify**

Run: `npm run dev`
Expected: Logo shows in heavy Dela Gothic One with periodic glitch flicker. Nav links show subtle red/blue color split on hover. Footer logo matches.

**Step 7: Commit**

```bash
git add src/components/layout/Header.tsx src/components/layout/Footer.tsx
git commit -m "feat: header logo glitch + nav chromatic aberration hover

Logo uses Dela Gothic One with 8s glitch cycle. Nav links show subtle
red-blue text-shadow split on hover. Footer logo updated to match."
```

---

### Task 7: Button — Sharp Corners

**Files:**
- Modify: `src/components/ui/Button.tsx` (line 32)

**Step 1: Replace rounded-full with sharp corners**

In Button.tsx, replace line 32:

```tsx
variant !== 'link' && 'rounded-sm',
```

Changed `rounded-full` to `rounded-sm` for angular, horror-appropriate buttons.

**Step 2: Also update the base font weight**

In the baseStyles string (line 12), change `font-medium` to `font-semibold`:

```tsx
const baseStyles = 'inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50';
```

Also added `tracking-wide` and changed `ring-offset-black` to `ring-offset-background`.

**Step 3: Update the inline CTA buttons in DevlogReelSection and FinalCTASection**

In `src/components/scroll-story/DevlogReelSection.tsx` line 188, replace `rounded-full` with `rounded-sm`:

```tsx
<button className="bg-accent text-black px-6 py-3 rounded-sm font-semibold hover:bg-accent-hover transition-colors">
```

**Step 4: Commit**

```bash
git add src/components/ui/Button.tsx src/components/scroll-story/DevlogReelSection.tsx
git commit -m "feat: sharp button corners + heavier font weight

Replace rounded-full with rounded-sm for angular horror aesthetic.
Increase font weight to semibold with wider tracking."
```

---

### Task 8: Hero — Left-Aligned Layout

**Files:**
- Modify: `src/components/scroll-story/HeroSection.tsx` (lines 121, 124, 129, 138)

**Step 1: Update vignette gradient**

Replace line 121 vignette overlay:

```tsx
<div className="hero-vignette absolute inset-0 bg-gradient-radial from-transparent via-black/30 to-black/70 pointer-events-none" />
```

Stronger vignette: via-black/30 (was /20), to-black/70 (was /60).

**Step 2: Left-align hero content on desktop**

Replace the content wrapper div (line 124):

```tsx
<div className="relative z-10 text-center lg:text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:min-h-screen">
  <div className="max-w-3xl">
```

**Step 3: Update headline flex alignment**

Replace line 129:

```tsx
<div className="flex flex-wrap justify-center lg:justify-start gap-2 lg:gap-3">
```

**Step 4: Update subtext**

Replace line 138:

```tsx
<p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
```

**Step 5: Close the new inner div**

Add `</div>` before the closing of the content wrapper:

The full content block becomes:

```tsx
{/* Content */}
<div className="relative z-10 text-center lg:text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-screen">
  <div className="max-w-3xl">
    <h1
      ref={headlineRef}
      className="text-cinematic text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight"
    >
      <div className="flex flex-wrap justify-center lg:justify-start gap-2 lg:gap-3">
        {headlineWords.map((word, index) => (
          <span key={index} className="word-reveal">
            <span className="word-reveal__inner">{word}</span>
          </span>
        ))}
      </div>
    </h1>

    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
      Step inside our world where every shadow tells a story and every choice echoes through reality.
    </p>
  </div>
</div>
```

**Step 6: Commit**

```bash
git add src/components/scroll-story/HeroSection.tsx
git commit -m "feat: left-align hero content on desktop for dramatic negative space

Headline and subtext shift to left alignment on lg breakpoint.
Mobile remains centered. Enhanced vignette darkness."
```

---

### Task 9: SharpSystems — Asymmetric Grid + Scan-line

**Files:**
- Modify: `src/components/scroll-story/SharpSystemsSection.tsx` (lines 118, 123)

**Step 1: Make first card span 2 columns**

Update the card className (line 123) to conditionally add col-span:

```tsx
{features.map((feature, index) => (
  <div
    key={index}
    className={cn(
      'feature-card scan-line-hover bg-black border border-gray-800 rounded-lg overflow-hidden will-change-transform',
      index === 0 && 'lg:col-span-2'
    )}
  >
```

This requires importing `cn` at the top of the file:

```tsx
import { cn } from '@/lib/utils';
```

**Step 2: Add atmosphere class to section**

Add `atmosphere` class to the section (line 102):

```tsx
className="scroll-section relative min-h-screen bg-gray-900 py-20 lg:py-32 atmosphere"
```

**Step 3: Commit**

```bash
git add src/components/scroll-story/SharpSystemsSection.tsx
git commit -m "feat: asymmetric grid + scan-line hover + atmosphere on SharpSystems

First feature card spans 2 columns on desktop. All cards get scan-line
hover effect. Section gets atmospheric gradient mesh overlay."
```

---

### Task 10: DevlogReel — Card Rotation

**Files:**
- Modify: `src/components/scroll-story/DevlogReelSection.tsx` (line 146)

**Step 1: Add alternating rotation to devlog cards**

Update the devlog card div (line 146) to include inline rotation style:

```tsx
{devlogPosts.map((post, index) => (
  <div
    key={index}
    className="horizontal-scroll__item devlog-card scan-line-hover bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover-lift will-change-transform"
    style={{ transform: `rotate(${index % 2 === 0 ? 1 : -1}deg)` }}
  >
```

Added `scan-line-hover` class and alternating 1deg/-1deg rotation.

**Step 2: Commit**

```bash
git add src/components/scroll-story/DevlogReelSection.tsx
git commit -m "feat: alternating card rotation + scan-line on devlog reel

Cards tilt 1deg/-1deg alternating for scattered photograph feel.
Added scan-line hover effect to all cards."
```

---

### Task 11: CraftingWorlds — Left-Constrained Content

**Files:**
- Modify: `src/components/scroll-story/CraftingWorldsSection.tsx` (lines 154-155)

**Step 1: Constrain content to left 40% on desktop**

Replace the content inner wrapper (lines 154-155):

```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
  <div className="max-w-3xl lg:max-w-[40%]">
```

**Step 2: Add atmosphere class to section**

Update section className (line 110):

```tsx
className="scroll-section relative min-h-screen overflow-hidden bg-black atmosphere"
```

**Step 3: Commit**

```bash
git add src/components/scroll-story/CraftingWorldsSection.tsx
git commit -m "feat: constrain CraftingWorlds content to left 40% on desktop

Content hugs left edge on desktop, leaving 60% for parallax imagery.
Added atmosphere gradient mesh overlay."
```

---

### Task 12: FinalCTA — Font Classes + Atmosphere

**Files:**
- Modify: `src/components/scroll-story/FinalCTASection.tsx` (lines 105, 127, 142)

**Step 1: Add atmosphere to section**

Update section className (line 105):

```tsx
className="scroll-section relative min-h-screen overflow-hidden bg-black atmosphere"
```

**Step 2: Add text-cinematic to the CTA heading**

Update h2 (line 142):

```tsx
<h2 className="text-cinematic text-2xl md:text-3xl text-white mb-4">
```

Note: Remove the separate `font-bold` since text-cinematic handles the weight.

**Step 3: Commit**

```bash
git add src/components/scroll-story/FinalCTASection.tsx
git commit -m "feat: add atmosphere + cinematic font to FinalCTA section"
```

---

### Task 13: Visual Verification

**Files:** None (verification only)

**Step 1: Start dev server**

Run: `npm run dev`

**Step 2: Check each section visually**

Verify all of the following render correctly:
- [ ] Fonts: Dela Gothic One on all headings, DM Sans on body text
- [ ] Colors: Blue-black background (#06060a), warm white text, ember-orange accents
- [ ] Film grain: Visible at 0.07 opacity with subtle drift animation
- [ ] Atmosphere: Colored gradient pools on SharpSystems, CraftingWorlds, FinalCTA sections
- [ ] Logo: Periodic glitch flicker every ~8 seconds in header
- [ ] Nav links: Red/blue chromatic aberration on hover
- [ ] Custom cursor: Dot + ring, ring expands on interactive elements
- [ ] Ember particles: Floating upward across viewport
- [ ] Page reveal: Content fades in on initial load with gradient line
- [ ] Hero: Left-aligned on desktop, centered on mobile
- [ ] SharpSystems: First card spans 2 columns, cards have scan-line hover
- [ ] DevlogReel: Cards slightly rotated alternating
- [ ] CraftingWorlds: Content constrained to left 40%
- [ ] Buttons: Sharp corners (rounded-sm), semibold weight
- [ ] Progress bar: Gradient from ember to blue
- [ ] Footer: Logo uses display font, matches header style
- [ ] Reduced motion: Disable animations when prefers-reduced-motion is set

**Step 3: Run build to check for TypeScript/build errors**

Run: `npm run build`
Expected: Build completes with no errors.

**Step 4: Commit any fixes if needed**

If any visual issues are found, fix them and commit with an appropriate message.
