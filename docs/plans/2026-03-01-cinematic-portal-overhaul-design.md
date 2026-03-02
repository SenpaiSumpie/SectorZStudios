# Sector Z — Cinematic Portal Overhaul Design

**Date**: 2026-03-01
**Approach**: "The Cinematic Portal" — the site IS the game world, not a website about games
**Status**: Approved

## Design Principles

1. **Games first** — every design decision serves game discovery and conversion
2. **Dark cinema** — Remedy-inspired: the site feels like walking into a dark theater
3. **Confidence through restraint** — fewer pages, less text, everything earns its place
4. **Games as events** — each game is a full-viewport immersive experience, not a card in a grid
5. **Analog degradation** — the 10% "broken" is film damage, not digital glitch

## Inspirations

- **Remedy Games** (remedygames.com) — dark/premium, crimson accent, cinematic confidence
- **Archetype Entertainment** (archetype-entertainment.com) — bold type, video hero, clean sections
- **Supergiant Games** (supergiantgames.com) — game-first focus, editorial warmth

---

## Site Architecture (5 Pages)

### 1. Homepage (`/`)
One continuous cinematic scroll in 4 beats:

**Beat 1: "The Void" (Opening)**
- Full viewport, black. 0.5s delay before anything appears
- "SECTOR Z" fades in centered, Instrument Serif, ~120px desktop
- Evocative subtitle fades in after delay (atmospheric phrase, not a tagline)
- Teal scroll indicator pulses at bottom
- No video, no background image. Darkness and typography only.

**Beat 2: "The Games" (The Reveal)**
- Each game occupies 100vh (full viewport)
- Full-bleed key art background, dark gradient overlay
- Game title (Instrument Serif, large), one-line tagline, "Explore" link
- Film dissolve transitions between games (fade to black, fade from black)
- Parallax on background images (10-15% slower than scroll)
- Final game includes "View all games →" link

**Beat 3: "The Studio" (The Pause)**
- Short section (~60-70vh), dark background, no imagery
- 2-3 sentences about what Sector Z is
- Instrument Serif headline, Geist body
- A breath between action and close

**Beat 4: "The Signal" (The Close)**
- Newsletter signup, social links (Discord, X, YouTube), careers link
- Teal accent most visible here — styled as a transmission
- Legal links (privacy, terms) in small muted text at very bottom
- This IS the footer — cinematic, not corporate

### 2. Game Pages (`/games/[slug]`)
Each game gets a full immersive page:
- Full-bleed hero (key art or muted autoplay trailer), dark gradient overlay
- Title block: name (Instrument Serif), genre tags, status badge, platforms
- Synopsis: 2-3 paragraphs, Geist, ~65ch reading width
- Media gallery: horizontal scroll screenshots, click to lightbox
- Primary CTA: "Wishlist on Steam" / "Play Now" (teal accent button)
- Related devlog posts (2-3 cards at bottom)
- Single column, generous vertical spacing, no sidebar

### 3. Devlog (`/devlog`)
- Feed layout: horizontal thumbnail cards (16:9 thumb left, title/date/tag/excerpt right)
- Tag filtering: horizontal button row at top, active = teal fill
- Individual posts (`/devlog/[slug]`): article layout, ~65ch width, optional header image

### 4. Studio (`/studio`)
- Manifesto: large Instrument Serif quote/statement at top
- Concept art showcase: curated grid of 4-6 pieces (no captions)
- Team: name + role grid (no photos, no bios). Clean rows.
- Brief: tech used, press kit download link

### 5. Careers (`/careers`)
- Short culture statement
- Job listings: clean table/list (Role, Team, Location, Type), click to expand
- Benefits: simple list, no icons
- Clear apply CTA per listing

### Removed Pages
- `/community` → folded into "The Signal" footer (Discord link)
- `/contact` → email in footer + careers page
- `/privacy`, `/terms` → simple legal pages linked from footer (no full navigation)

---

## Visual Identity

### Typography
- **Display**: Instrument Serif — elegant, high-contrast serif with sharp details and cinematic gravity. Editorial, sophisticated, slightly dangerous. Like film title cards.
- **Body**: Geist — Vercel's geometric sans-serif. Clean, modern, slight technical edge. Functional and confident.
- **Pairing rationale**: Serif + geometric sans = tension between old-world elegance and modern precision. Neither font is overused in the indie game space.

### Color Palette: "Spectral Void"
```
Background:     #09090b    (near-black, neutral)
Surface:        #0f1114    (elevated surfaces, slight cool tint)
Border:         #1a1d21    (subtle cool-tinted dividers)
Muted:          #64748b    (slate gray, secondary text)
Foreground:     #f1f5f9    (cool white, slight blue cast)
Accent:         #2dd4bf    (spectral teal)
Accent hover:   #5eead4    (lighter teal for hover/active)
Accent muted:   #2dd4bf20  (teal at 12% opacity, for glows/borders)
```

**Usage rules:**
- Teal used sparingly — hover states, accent underlines, occasional word highlights, CTAs
- 90% of the site is black/white/gray
- Cool-tinted neutrals reinforce otherworldly feeling
- No secondary accent color. One color, maximum impact.

### Atmosphere & Effects

**Keep (refined):**
- Film grain — ~0.03 opacity (barely visible, felt more than seen)
- Custom cursor — dot + ring in teal accent

**Replace:**
- Ember particles → **Dust motes** (8 particles, white/gray, slow multi-directional drift, lower opacity)
- Glitch effects → **Light leaks** (thin horizontal teal streaks, ~2px, 0.08 opacity, 0.3s flash during scroll transitions)

**Add:**
- **Vignette overlay** — permanent soft dark vignette on every page (darkens edges, focuses attention)
- **Scroll fog** — subtle dark haze that clears as content enters view on homepage

**Remove:**
- Chromatic aberration on nav links
- Scan-line hover on cards
- Complex page reveal animation (replace with simple fade)

**Philosophy**: 90% polished, 10% broken. The "broken" is analog film degradation — light leaks, lens distortion, dust, film damage. The camera recording this world has been running too long.

---

## Interactions & Animation

### Philosophy
Animations feel like camera movements, not UI transitions. Everything scrubs, pans, or fades. Nothing bounces, slides from the side, or pops.

### Homepage (GSAP ScrollTrigger)
- **Beat 1**: Logo opacity 0→1 (0.8s, slight Y 20px up). Subtitle fades 0.4s after. Teal indicator pulses (CSS).
- **Beat 2**: Each game pinned at 100vh. Background parallax (10-15% slow). Title/tagline fade in with Y. Film dissolve transitions between games (fade to black, fade from black).
- **Beat 3**: Simple fade-in on scroll enter. Restraint IS the statement.
- **Beat 4**: Elements stagger in (opacity + Y). Teal accent glows brighter at bottom.

### Page transitions
- Simple fade (opacity 0→1, 0.3s) on route change. No complex transitions.

### Hover states
- Nav links: color → white, teal underline slides from left (0.2s)
- Game titles/links: teal color shift + slight letter-spacing expansion (0.15s)
- Buttons: teal background fills from left (0.2s)
- Cards (devlog, careers): Y lift (-4px) + border lightens. No image zoom.
- Custom cursor: ring expands on interactive elements

### Header behavior
- Transparent on hero (no background)
- After scrolling past Beat 1: backdrop-blur + dark semi-transparent background
- Smooth transition

---

## Navigation

### Header
- Logo: "SECTOR Z" in Instrument Serif, left. No glitch. Teal on hover.
- Nav (right, desktop): Games, Devlog, Studio, Careers — 4 links only
- Style: Geist 14px medium, muted gray default, white hover, teal underline active
- Mobile: hamburger → full-screen overlay, dark bg, centered links, large type

### Footer ("The Signal")
Universal on every page:
- Newsletter signup
- Social: Discord, X, YouTube (icon-only, teal hover)
- Quick links: Careers, Privacy, Terms
- Studio email
- Copyright
