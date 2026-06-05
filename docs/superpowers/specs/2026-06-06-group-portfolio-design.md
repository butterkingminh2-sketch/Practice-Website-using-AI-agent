# Group Portfolio Website — Design Spec

**Date:** 2026-06-06
**Project:** Group Portfolio Website
**Stack:** Next.js (React) + Framer Motion
**Status:** Approved

---

## 1. Project Overview

A people-first portfolio website for a 10-member student group studying IT + Design. The primary goal is to introduce each team member and showcase their individual skills. The site should feel playful, creative, and expressive — signalling both technical competence and design sensibility.

**Key constraints:**
- 10 members must all be presented at equal visual weight
- People-first: members and their skills are the hero content, not projects
- Must be impressive for professors and recruiters reviewing student work

---

## 2. Site Structure

Single-page site with three sections, navigable via sticky nav anchor links:

| Section | Purpose |
|---|---|
| **Hero** | Group name, tagline, CTA to Members section |
| **About** | Group mission/story + stat highlights |
| **Members** | Full 2×5 grid of member cards with expand interaction |

No projects page, no contact section — out of scope for this iteration.

---

## 3. Design System

### 3.1 Color Palette — "Pop Candy"

| Role | Token | Hex |
|---|---|---|
| Background | `--bg` | `#FAFAF8` |
| Foreground / Text | `--fg` | `#2D2D2D` |
| Primary accent | `--indigo` | `#6C63FF` |
| Secondary accent | `--coral` | `#FF6584` |
| Tertiary accent | `--mint` | `#43D9AD` |
| Muted text | `--muted` | `#9CA3AF` |
| Surface / card bg | `--surface` | `#F3F4F6` |

**Usage rules:**
- Indigo: primary CTAs, active nav, section labels, stat highlights
- Coral: secondary highlights, hover accents, gradient pairs
- Mint: tertiary callouts, dark-section accents (used on the About dark bg)
- Member cards each get a unique gradient drawn from pairs of the three accent colors (10 distinct combos possible: indigo→violet, coral→rose, mint→cyan, indigo→coral, coral→mint, mint→indigo, indigo→violet blend, coral→pink, mint→teal, indigo→mint)
- About section uses `--fg` (`#2D2D2D`) as background with white text — the single dark block creates visual rhythm

### 3.2 Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / Headings | **Space Grotesk** | 700–800 | Letter-spacing: −1px to −2px on large sizes |
| Body / UI | **DM Sans** | 300–500 | Line-height: 1.6–1.75 |

**Type scale:**

| Name | Size | Font | Weight |
|---|---|---|---|
| Hero H1 | clamp(42px, 6vw, 72px) | Space Grotesk | 800 |
| Section H2 | 36px | Space Grotesk | 800 |
| Card name | 12–14px | Space Grotesk | 700 |
| Body | 15–17px | DM Sans | 400 |
| Label / tag | 11px | DM Sans | 700, uppercase, 1.5px tracking |
| Muted / meta | 12–13px | DM Sans | 400–500 |

Source: Google Fonts (`Space+Grotesk:wght@400;500;600;700;800` + `DM+Sans:ital,wght@0,300;0,400;0,500;1,400`)

---

## 4. Layout & Components

### 4.1 Navigation
- Sticky, top-fixed
- Frosted glass: `background: rgba(250,250,248,0.92)` + `backdrop-filter: blur(12px)`
- Logo: `Space Grotesk 800`, indigo dot accent
- Links: `DM Sans 500`, 60% opacity at rest → 100% on hover
- Padding: `20px 48px`

### 4.2 Hero Section
- Full-width, max-width 900px centered
- Animated group tag pill (pulsing indigo dot + label)
- H1 with gradient text on key words: `linear-gradient(135deg, #6C63FF, #FF6584)`
- Subheading paragraph in muted color, max-width 520px
- CTA button: indigo bg, Space Grotesk 600, 12px border-radius, hover lifts with indigo box-shadow
- Decorative background: 3 soft blurred color blobs (indigo, coral, mint) — absolute positioned top-right, `filter: blur(40px)`, 18% opacity

### 4.3 About Section
- Full-width dark block (`#2D2D2D` background)
- Two-column grid (1fr 1fr), max-width 900px, 60px gap
- Left: H2 headline with mint accent word + body copy
- Right: 2×2 stat card grid — each card has a large Space Grotesk number, small label, glass-dark surface
- Stats to populate: 10 Members, IT+Design, ∞ Ideas, 01 Team (placeholders — group to confirm)

### 4.4 Members Section
- Section label + H2 heading
- **Grid:** `grid-template-columns: repeat(5, 1fr)`, 16px gap → 2 rows of 5 cards
- **Member Card anatomy:**
  - Square avatar area (aspect-ratio 1:1) with unique gradient per member, initials in Space Grotesk 800
  - Info strip below: name (Space Grotesk 700 12px) + role (DM Sans 11px muted)
  - Hover overlay: dark semi-transparent layer fades in, shows name/skills summary + "Click to expand" pill
  - Click: opens full-detail modal (see §4.5)
- Card border-radius: 16px; overflow hidden

### 4.5 Member Modal (Expanded Card)
Triggered by clicking any member card. Rendered as a centered overlay modal:
- Close button top-right
- Large avatar / initials block with member's gradient
- Full name + role (Space Grotesk)
- Bio paragraph (DM Sans, 2–4 sentences per member)
- Skills list: pill tags in the member's accent color
- Social links (optional): GitHub, LinkedIn icons

---

## 5. Animation Spec

**Library:** Framer Motion (`motion` components + `useInView` / `whileInView`)

| Location | Animation | Details |
|---|---|---|
| **Page load** | Hero fade + slide up | `opacity: 0→1`, `y: 20→0`, `duration: 0.6s`, `ease: easeOut` |
| **Hero blobs** | Continuous float | Infinite `y` keyframe loop, slow (8–12s), subtle — adds life without distraction |
| **Hero tag pill** | Pulsing dot | Indigo dot scales 1→0.8→1, 2s infinite |
| **About section** | Slide in from left | `x: -40→0`, `opacity: 0→1` on scroll entry, `duration: 0.5s` |
| **About stats** | Staggered count-up | Each stat card fades in with `staggerChildren: 0.1s` |
| **Member cards** | Staggered entrance | `whileInView`, `staggerChildren: 0.05s` per card, `y: 30→0` + fade |
| **Member card hover** | Lift + shadow | `whileHover: { y: -6, scale: 1.02 }`, box-shadow deepens |
| **Hover overlay** | Fade in | CSS `opacity: 0→1` on parent hover, `transition: 0.2s` |
| **Modal open** | Scale + fade | `initial: { opacity:0, scale:0.95 }` → `animate: { opacity:1, scale:1 }` |
| **Modal close** | Reverse scale | Same in reverse, `duration: 0.2s` |

**Principle:** Expressive on hero and member cards; calm/functional everywhere else. No animation should exceed 0.6s or loop intrusively. All scroll animations use `once: true` — they fire on entry and don't replay.

---

## 6. Responsive Behaviour

| Breakpoint | Members grid | Notes |
|---|---|---|
| ≥ 1024px (desktop) | 5 columns | Default layout |
| 768–1023px (tablet) | 3–4 columns | Wrap naturally |
| < 768px (mobile) | 2 columns | Cards stack to 2-wide grid |

Nav collapses to a hamburger menu on mobile (implementation detail for build phase).

---

## 7. Content Requirements

Each member needs to supply:
- Full name
- Role / title (e.g. "UI Designer", "Frontend Dev")
- Profile photo OR the site uses initials-based gradient avatar as fallback
- Short bio (2–4 sentences)
- Skills list (4–8 items)
- Optional: GitHub and/or LinkedIn URL

Group needs to supply:
- Official group name (placeholder: "group.")
- Tagline (placeholder: "We build things that look good and work great.")
- About copy (2–3 sentences)
- Stat values to confirm (members count is 10; others TBD)

---

## 8. Tech Stack & Dependencies

| Concern | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion |
| Fonts | Google Fonts (Space Grotesk + DM Sans) |
| Icons | Lucide React |
| Deployment | Vercel (recommended for Next.js) |

---

## 9. Out of Scope

- Projects / portfolio work showcase
- Contact form
- Dark mode toggle
- Authentication or CMS
- Multi-language support
