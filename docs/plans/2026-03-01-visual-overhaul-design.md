# Sector Z Visual Overhaul Design

## Problem

The site is technically solid but visually generic. Inter font, cyan-on-black palette, centered symmetric layouts, and invisible film grain make it indistinguishable from SaaS landing pages. An atmospheric horror game studio's website should evoke tension and atmosphere.

## Design Decisions

**Typography**: Cinematic Horror direction
**Colors**: Ember & Shadow palette
**Glitch intensity**: Subtle Unease (90% polished, 10% broken)

## 1. Typography System

**Fonts (Google Fonts):**
- Display/Headlines: Dela Gothic One — heavy, imposing, blocky
- Body/UI: DM Sans — clean geometric sans-serif

**Application:**
- `.text-cinematic`: Dela Gothic One, letter-spacing -0.04em, line-height 1.0
- Body text: DM Sans, line-height 1.6
- Nav links: DM Sans 500 weight, letter-spacing 0.02em
- Buttons: DM Sans 600 weight
- Logo "Sector Z": Dela Gothic One

**Layout.tsx changes:**
- Replace `Inter` import with `Dela_Gothic_One` and `DM_Sans`
- Set CSS variables `--font-display` and `--font-body`

## 2. Color Palette

Replace all CSS variables in `globals.css`:

```css
:root {
  --background:    #06060a;
  --foreground:    #e8e4df;
  --accent:        #ff4d2a;
  --accent-hover:  #ff6b4a;
  --accent-cool:   #4a7aff;
  --gray-900:      #0a0a12;
  --gray-800:      #12121c;
  --gray-700:      #1e1e2a;
  --gray-600:      #2e2e3c;
  --gray-500:      #4a4a5c;
  --gray-400:      #6b6578;
  --gray-300:      #8a8698;
  --gray-200:      #b0acba;
  --gray-100:      #d4d0dc;
}
```

All existing Tailwind `text-accent`, `bg-accent`, `border-accent` references update automatically through CSS variables.

Secondary accent `--accent-cool` (#4a7aff) used for: progress bar gradient end, secondary badges, cool-warm contrast moments.

## 3. Atmospheric Background System

### Film Grain Enhancement
- Increase opacity from 0.03 to 0.07
- Add CSS animation that shifts grain pattern position every 0.1s
- Gives the grain a "living" quality

### Gradient Mesh Atmosphere
- New `.atmosphere` utility class
- Layered radial gradients using accent colors at 0.03-0.06 opacity
- Creates pools of colored light against dark backgrounds
- Applied to major section backgrounds

### Floating Ember Particles
- Pure CSS particle system using `@keyframes`
- 12-15 small dots (2-3px) that drift upward
- Varying speeds (15s-30s duration), opacity (0.1-0.4), horizontal positions
- Fixed overlay, `pointer-events: none`
- Looks like embers/dust motes floating in darkness
- Hidden when `prefers-reduced-motion: reduce`

### Enhanced Vignette
- Stronger edge darkening on hero and CTA sections
- `from-transparent via-black/30 to-black/70` (up from /20 and /60)

## 4. Custom Cursor

### Elements
- Inner dot: 8px, accent-colored, `position: fixed`, `pointer-events: none`
- Outer ring: 32px, accent border (1px), slight delay via CSS `transition: 0.15s`
- On interactive hover: ring scales to 48px, dot hides
- `mix-blend-mode: difference` on ring for universal contrast

### Implementation
- Lightweight `mousemove` event listener updating CSS custom properties
- Two fixed-position divs positioned via `transform: translate(var(--cx), var(--cy))`
- Hidden on touch devices via `@media (pointer: coarse)` — show default cursor
- Implemented as a `CustomCursor` client component in layout

## 5. Glitch Micro-interactions

### Logo Glitch
- CSS `@keyframes glitch` with long duration (8s), brief effect window (0.15s)
- Horizontal position offset (2px left, then 2px right, then back)
- Text-shadow splits into `--accent` (left) and `--accent-cool` (right)
- Applied to logo in Header component

### Nav Link Chromatic Aberration
- On hover: text-shadow with two shadows
  - `--accent` offset -1px horizontally
  - `--accent-cool` offset +1px horizontally
- 0.2s transition on/off
- CSS only, no JS needed

### Card Scan-line
- `::after` pseudo-element on `.feature-card` and `.devlog-card`
- On hover: gradient line (white at 0.05 opacity) sweeps top to bottom over 0.6s
- Single pass using `animation-fill-mode: forwards`
- `pointer-events: none` on the pseudo-element

## 6. Layout Adjustments

### Hero Section
- Desktop: headline left-aligned with `text-left`, `max-w-3xl`, no `mx-auto`
- Subtext left-aligned below headline
- Mobile: remains centered
- Creates dramatic negative space on the right

### Feature Cards (SharpSystemsSection)
- First card spans 2 columns on desktop: `lg:col-span-2`
- Grid becomes `lg:grid-cols-3` with first card taking `lg:col-span-2`
- Creates visual hierarchy and asymmetry

### Devlog Cards
- Alternating rotation: odd cards `rotate(1deg)`, even cards `rotate(-1deg)`
- Applied via inline style or nth-child CSS
- Creates "scattered photographs" feel

### CraftingWorlds Content
- Content block constrained to left 40% of viewport on desktop
- Right 60% is pure parallax imagery
- Mobile: full width, stacked

## 7. Loading Experience

### Page Entry Animation
- `<main>` starts with `opacity: 0; transform: translateY(8px)`
- On mount, root layout sets `data-loaded="true"` attribute via `useEffect`
- CSS transition: `opacity 0.8s ease-out, transform 0.8s ease-out`
- A gradient scan-line pseudo-element sweeps down during the reveal

### Logo First Appearance
- Hero section logo glitch fires once on first scroll into view (already handled by existing ScrollTrigger)
- Initial word-reveal animation unchanged, but now in Dela Gothic One for much more impact

## Files to Modify

1. `src/app/globals.css` — colors, grain, particles, glitch keyframes, cursor, scan-line, atmosphere
2. `src/app/layout.tsx` — font imports, cursor component, loading data attribute
3. `src/components/layout/Header.tsx` — logo font, glitch class, nav hover styles
4. `src/components/layout/Footer.tsx` — updated color references if hardcoded
5. `src/components/scroll-story/HeroSection.tsx` — left-aligned layout
6. `src/components/scroll-story/SharpSystemsSection.tsx` — asymmetric grid
7. `src/components/scroll-story/DevlogReelSection.tsx` — card rotation
8. `src/components/scroll-story/CraftingWorldsSection.tsx` — left-constrained content
9. `src/components/scroll-story/FinalCTASection.tsx` — updated accent references
10. `src/components/ui/Button.tsx` — sharp corners, font update

## New Files

1. `src/components/ui/CustomCursor.tsx` — cursor dot + ring component
2. `src/components/ui/EmberParticles.tsx` — floating particle overlay
3. `src/components/ui/PageReveal.tsx` — loading/entry animation wrapper
