# Group Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a people-first single-page portfolio website for a 10-member IT + Design student group using Next.js 14, Tailwind CSS v3, and Framer Motion.

**Architecture:** Single-page App Router site with three anchor-linked sections (Hero, About, Members). A 2×5 member card grid drives the main interaction — each card expands into a Framer Motion modal with bio, skills, and social links. All animations are scroll-triggered via `whileInView` with `once: true`.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS v3, Framer Motion, Lucide React, Google Fonts (Space Grotesk + DM Sans), Vercel deployment.

**Spec:** `docs/superpowers/specs/2026-06-06-group-portfolio-design.md`

---

## File Map

| File | Responsibility |
|---|---|
| `app/layout.tsx` | Root layout — Google Fonts, metadata, CSS variable body classes |
| `app/page.tsx` | Home page — composes Nav + Hero + About + Members |
| `app/globals.css` | Tailwind base + CSS custom properties |
| `tailwind.config.js` | Custom brand colors + font family tokens |
| `lib/types.ts` | `Member` TypeScript interface |
| `data/members.ts` | Array of 10 placeholder Member objects |
| `components/Nav.tsx` | Sticky frosted-glass navbar with anchor links + mobile hamburger |
| `components/Hero.tsx` | Hero section — floating blobs, gradient headline, Framer Motion entrance |
| `components/About.tsx` | Dark about section — two-column layout, staggered stat cards |
| `components/MemberCard.tsx` | Single member card — gradient avatar, CSS hover overlay, onClick prop |
| `components/MemberModal.tsx` | Full-detail modal — bio, skills pills, social links, AnimatePresence |
| `components/Members.tsx` | Members section — staggered grid, `selectedMember` state, renders modal |
| `jest.config.js` | Jest config using `next/jest` wrapper |
| `jest.setup.ts` | Imports `@testing-library/jest-dom` |
| `__mocks__/framer-motion.tsx` | Framer Motion mock for Jest (strips animation props) |
| `__tests__/data/members.test.ts` | Validates member data shape and count |
| `__tests__/components/MemberCard.test.tsx` | Card renders name/role, calls onClick |
| `__tests__/components/MemberModal.test.tsx` | Modal renders member info, fires onClose |
| `__tests__/components/Members.test.tsx` | Grid renders 10 cards, click opens modal |

---

## Task 1: Project Bootstrap

**Files:**
- Create: `package.json` (via `create-next-app`)
- Create: `tailwind.config.js`
- Create: `jest.config.js`
- Create: `jest.setup.ts`
- Create: `__mocks__/framer-motion.tsx`
- Create: `.gitignore` entry for `.superpowers/`

- [ ] **Step 1: Scaffold Next.js project**

Run from `e:/Practice-Website-using-AI-agent`:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

When prompted, accept all defaults. This installs Next.js 14, TypeScript, Tailwind CSS v3, and ESLint.

- [ ] **Step 2: Install runtime dependencies**

```bash
npm install framer-motion lucide-react
```

- [ ] **Step 3: Install test dependencies**

```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 4: Write `jest.config.js`**

```js
// jest.config.js
const nextJest = require('next/jest')
const createJestConfig = nextJest({ dir: './' })
module.exports = createJestConfig({
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
})
```

- [ ] **Step 5: Write `jest.setup.ts`**

```ts
// jest.setup.ts
import '@testing-library/jest-dom'
```

- [ ] **Step 6: Write Framer Motion mock**

```tsx
// __mocks__/framer-motion.tsx
const React = require('react')

const motion = new Proxy({}, {
  get(_: any, tag: string) {
    return function Mock({ children, initial, animate, exit, whileHover,
      whileInView, transition, variants, viewport, ...rest }: any) {
      return React.createElement(tag, rest, children)
    }
  },
})

const AnimatePresence = ({ children }: any) => children

module.exports = { motion, AnimatePresence, useInView: () => true }
```

- [ ] **Step 7: Update `tailwind.config.js`** with brand tokens

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:      '#FAFAF8',
          fg:      '#2D2D2D',
          indigo:  '#6C63FF',
          coral:   '#FF6584',
          mint:    '#43D9AD',
          muted:   '#9CA3AF',
          surface: '#F3F4F6',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)',    'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 8: Add `.superpowers/` to `.gitignore`**

Open `.gitignore` and append:
```
# Brainstorm mockups
.superpowers/
```

- [ ] **Step 9: Verify test runner works**

```bash
npm test -- --passWithNoTests
```

Expected: `Test Suites: 0 skipped` with no errors.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: bootstrap Next.js 14 project with Tailwind, Framer Motion, and Jest"
```

---

## Task 2: Type Definitions & Member Data

**Files:**
- Create: `lib/types.ts`
- Create: `data/members.ts`
- Create: `__tests__/data/members.test.ts`

- [ ] **Step 1: Write `lib/types.ts`**

```ts
// lib/types.ts
export interface Member {
  id: number
  name: string
  initials: string
  role: string
  bio: string
  skills: string[]
  gradient: string
  github?: string
  linkedin?: string
}
```

- [ ] **Step 2: Write the failing test**

```ts
// __tests__/data/members.test.ts
import { members } from '@/data/members'

describe('members', () => {
  it('contains exactly 10 members', () => {
    expect(members).toHaveLength(10)
  })

  it('each member has all required fields', () => {
    members.forEach((m) => {
      expect(typeof m.id).toBe('number')
      expect(m.name.length).toBeGreaterThan(0)
      expect(m.initials).toHaveLength(2)
      expect(m.role.length).toBeGreaterThan(0)
      expect(m.bio.length).toBeGreaterThan(0)
      expect(m.skills.length).toBeGreaterThan(0)
      expect(m.gradient).toMatch(/linear-gradient/)
    })
  })

  it('all member ids are unique', () => {
    const ids = members.map((m) => m.id)
    expect(new Set(ids).size).toBe(members.length)
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

```bash
npm test members.test
```

Expected: FAIL — `Cannot find module '@/data/members'`

- [ ] **Step 4: Write `data/members.ts`**

```ts
// data/members.ts
import { Member } from '@/lib/types'

export const members: Member[] = [
  {
    id: 1,
    name: 'Member One',
    initials: 'M1',
    role: 'UI Designer',
    bio: 'Passionate about creating intuitive, beautiful user interfaces. Loves bridging the gap between users and technology through thoughtful design.',
    skills: ['Figma', 'CSS', 'React', 'Prototyping'],
    gradient: 'linear-gradient(135deg, #6C63FF, #a78bfa)',
  },
  {
    id: 2,
    name: 'Member Two',
    initials: 'M2',
    role: 'Frontend Developer',
    bio: 'Builds fast, accessible web experiences. Passionate about performance and clean component architecture.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    gradient: 'linear-gradient(135deg, #FF6584, #fb7185)',
  },
  {
    id: 3,
    name: 'Member Three',
    initials: 'M3',
    role: 'Full Stack Developer',
    bio: 'Full stack engineer who enjoys building end-to-end features. Comfortable across the whole stack from database to UI.',
    skills: ['Node.js', 'React', 'PostgreSQL', 'Docker'],
    gradient: 'linear-gradient(135deg, #43D9AD, #34d399)',
  },
  {
    id: 4,
    name: 'Member Four',
    initials: 'M4',
    role: 'Backend Developer',
    bio: 'Specializes in robust APIs and scalable systems. Loves optimizing queries and designing clean data models.',
    skills: ['Node.js', 'Python', 'SQL', 'REST APIs'],
    gradient: 'linear-gradient(135deg, #6C63FF, #818cf8)',
  },
  {
    id: 5,
    name: 'Member Five',
    initials: 'M5',
    role: 'Brand Designer',
    bio: 'Creates visual identities that communicate clearly and feel distinctive. Obsessed with typography and color theory.',
    skills: ['Illustrator', 'Figma', 'Branding', 'Typography'],
    gradient: 'linear-gradient(135deg, #FF6584, #f472b6)',
  },
  {
    id: 6,
    name: 'Member Six',
    initials: 'M6',
    role: 'UX Researcher',
    bio: 'Bridges user needs and product decisions through structured research and testing. Champion of accessibility.',
    skills: ['User Testing', 'Figma', 'Interviews', 'Accessibility'],
    gradient: 'linear-gradient(135deg, #43D9AD, #22d3ee)',
  },
  {
    id: 7,
    name: 'Member Seven',
    initials: 'M7',
    role: 'Mobile Developer',
    bio: 'Builds cross-platform mobile experiences with React Native. Cares deeply about native feel and performance.',
    skills: ['React Native', 'Expo', 'TypeScript', 'iOS/Android'],
    gradient: 'linear-gradient(135deg, #6C63FF, #FF6584)',
  },
  {
    id: 8,
    name: 'Member Eight',
    initials: 'M8',
    role: 'Motion Designer',
    bio: 'Brings interfaces to life through animation. Crafts micro-interactions that delight without distracting.',
    skills: ['After Effects', 'Framer', 'Lottie', 'CSS Animations'],
    gradient: 'linear-gradient(135deg, #FF6584, #43D9AD)',
  },
  {
    id: 9,
    name: 'Member Nine',
    initials: 'M9',
    role: 'Product Manager',
    bio: 'Turns messy problems into clear roadmaps. Facilitates the team with structure, priorities, and a lot of sticky notes.',
    skills: ['Roadmapping', 'Agile', 'Notion', 'Stakeholder Mgmt'],
    gradient: 'linear-gradient(135deg, #43D9AD, #6C63FF)',
  },
  {
    id: 10,
    name: 'Member Ten',
    initials: 'MT',
    role: 'DevOps Engineer',
    bio: "Keeps the team's infrastructure running smoothly. Automates everything that can be automated.",
    skills: ['Docker', 'CI/CD', 'AWS', 'Linux'],
    gradient: 'linear-gradient(135deg, #6C63FF, #43D9AD)',
  },
]
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npm test members.test
```

Expected: PASS — all 3 tests green.

- [ ] **Step 6: Commit**

```bash
git add lib/types.ts data/members.ts __tests__/data/members.test.ts
git commit -m "feat: add Member type and placeholder member data"
```

---

## Task 3: Root Layout & Global Styles

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Write `app/globals.css`**

Replace the file's contents entirely:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg:      #FAFAF8;
  --fg:      #2D2D2D;
  --indigo:  #6C63FF;
  --coral:   #FF6584;
  --mint:    #43D9AD;
  --muted:   #9CA3AF;
  --surface: #F3F4F6;
}

html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 2: Write `app/layout.tsx`**

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'group. — IT × Design',
  description: 'A 10-member student team blending technology and creativity.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} font-body bg-brand-bg text-brand-fg antialiased`}>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Verify the dev server starts**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: blank page (no content yet) with no console errors. Ctrl+C to stop.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "feat: configure root layout with Space Grotesk + DM Sans fonts and CSS variables"
```

---

## Task 4: Navigation Component

**Files:**
- Create: `components/Nav.tsx`

- [ ] **Step 1: Write `components/Nav.tsx`**

```tsx
// components/Nav.tsx
'use client'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = ['Home', 'About', 'Members']

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-brand-bg/90 backdrop-blur-md border-b border-black/5">
      <div className="flex items-center justify-between px-8 md:px-12 py-5">
        <div className="font-display font-extrabold text-lg tracking-tight">
          group<span className="text-brand-indigo">.</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex gap-7">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-body text-sm font-medium text-brand-fg/60 hover:text-brand-fg transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-brand-fg"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden flex flex-col px-8 pb-4 gap-4 border-t border-black/5">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-body text-sm font-medium text-brand-fg/60 hover:text-brand-fg"
              onClick={() => setOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Nav.tsx
git commit -m "feat: add sticky frosted-glass Nav with mobile hamburger"
```

---

## Task 5: Hero Component

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Write `components/Hero.tsx`**

```tsx
// components/Hero.tsx
'use client'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut', delay },
})

export default function Hero() {
  return (
    <section id="home" className="relative px-8 md:px-12 pt-24 pb-20 max-w-4xl mx-auto overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-10 right-0 w-80 h-80 pointer-events-none" aria-hidden>
        <motion.div
          className="absolute w-48 h-48 rounded-full bg-brand-indigo top-5 right-16 blur-[40px] opacity-[0.18]"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-36 h-36 rounded-full bg-brand-coral top-24 right-4 blur-[40px] opacity-[0.18]"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute w-28 h-28 rounded-full bg-brand-mint bottom-5 right-28 blur-[40px] opacity-[0.18]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Tag pill */}
      <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 bg-brand-indigo/10 border border-brand-indigo/20 text-brand-indigo text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-7">
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-brand-indigo inline-block"
          animate={{ opacity: [1, 0.4, 1], scale: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        IT × Design · 10 Members
      </motion.div>

      {/* Headline */}
      <motion.h1
        {...fadeUp(0.1)}
        className="font-display font-extrabold leading-[1.05] tracking-[-2px] text-brand-fg mb-6"
        style={{ fontSize: 'clamp(42px, 6vw, 72px)' }}
      >
        We build things<br />
        that{' '}
        <span className="bg-gradient-to-br from-brand-indigo to-brand-coral bg-clip-text text-transparent">
          look good
        </span>
        <br />
        and{' '}
        <span className="bg-gradient-to-br from-brand-indigo to-brand-coral bg-clip-text text-transparent">
          work great.
        </span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        {...fadeUp(0.2)}
        className="font-body text-[17px] text-brand-muted max-w-lg leading-[1.7] mb-9"
      >
        A multidisciplinary student team blending technology and creativity —
        designing, coding, and shipping work we&apos;re proud of.
      </motion.p>

      {/* CTA */}
      <motion.a
        href="#members"
        {...fadeUp(0.3)}
        whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(108,99,255,0.3)' }}
        className="inline-flex items-center gap-2 bg-brand-indigo text-white font-display font-semibold text-sm px-6 py-3 rounded-xl"
      >
        Meet the team →
      </motion.a>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add Hero section with floating blobs and Framer Motion entrance"
```

---

## Task 6: About Component

**Files:**
- Create: `components/About.tsx`

- [ ] **Step 1: Write `components/About.tsx`**

```tsx
// components/About.tsx
'use client'
import { motion } from 'framer-motion'

const stats = [
  { value: '10',  label: 'Members', color: 'text-brand-indigo' },
  { value: 'IT+', label: 'Design',  color: 'text-brand-coral'  },
  { value: '∞',   label: 'Ideas',   color: 'text-brand-mint'   },
  { value: '01',  label: 'Team',    color: 'text-white'        },
]

export default function About() {
  return (
    <section id="about" className="bg-brand-fg py-[72px] px-8 md:px-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h2 className="font-display font-extrabold text-4xl tracking-tight text-white leading-[1.15] mb-4">
            Who we<br />
            <span className="text-brand-mint">are</span>
          </h2>
          <p className="font-body text-[15px] text-white/60 leading-[1.75]">
            We&apos;re a student group from the IT &amp; Design programme — 10 people who
            love building things together. We combine technical skills with visual
            thinking to create work that&apos;s both functional and beautiful.
          </p>
        </motion.div>

        {/* Right: stat cards */}
        <motion.div
          className="grid grid-cols-2 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
              className="bg-white/5 border border-white/[0.08] rounded-2xl p-5"
            >
              <div className={`font-display font-extrabold text-4xl tracking-tight leading-none mb-1.5 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="font-body text-xs text-white/40 font-medium uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/About.tsx
git commit -m "feat: add dark About section with staggered stat cards"
```

---

## Task 7: MemberCard Component

**Files:**
- Create: `components/MemberCard.tsx`
- Create: `__tests__/components/MemberCard.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// __tests__/components/MemberCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import MemberCard from '@/components/MemberCard'
import { Member } from '@/lib/types'

const member: Member = {
  id: 1,
  name: 'Test User',
  initials: 'TU',
  role: 'UI Designer',
  bio: 'A test bio.',
  skills: ['Figma', 'React'],
  gradient: 'linear-gradient(135deg, #6C63FF, #a78bfa)',
}

describe('MemberCard', () => {
  it('renders the member name and role', () => {
    render(<MemberCard member={member} onClick={jest.fn()} />)
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('UI Designer')).toBeInTheDocument()
  })

  it('renders initials in the avatar', () => {
    render(<MemberCard member={member} onClick={jest.fn()} />)
    expect(screen.getByText('TU')).toBeInTheDocument()
  })

  it('calls onClick when the card is clicked', () => {
    const onClick = jest.fn()
    render(<MemberCard member={member} onClick={onClick} />)
    fireEvent.click(screen.getByText('TU').closest('div')!.parentElement!)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test MemberCard.test
```

Expected: FAIL — `Cannot find module '@/components/MemberCard'`

- [ ] **Step 3: Write `components/MemberCard.tsx`**

```tsx
// components/MemberCard.tsx
'use client'
import { Member } from '@/lib/types'

interface Props {
  member: Member
  onClick: () => void
}

export default function MemberCard({ member, onClick }: Props) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-pointer transition-transform duration-[250ms] ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-2xl"
      onClick={onClick}
    >
      {/* Gradient avatar */}
      <div
        className="w-full aspect-square flex items-center justify-center font-display font-extrabold text-3xl text-white"
        style={{ background: member.gradient }}
      >
        {member.initials}
      </div>

      {/* Info strip */}
      <div className="p-3 bg-white">
        <div className="font-display font-bold text-[12px] text-brand-fg truncate">{member.name}</div>
        <div className="font-body text-[10px] text-brand-muted truncate">{member.role}</div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-brand-fg/85 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl p-3">
        <span className="font-display text-white text-[11px] font-semibold text-center">
          {member.role}<br />
          <span className="font-body font-normal text-white/70">{member.skills.slice(0, 3).join(' · ')}</span>
        </span>
        <span className="border border-white/40 text-white text-[10px] px-2.5 py-1 rounded-full font-body">
          Click to expand
        </span>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test MemberCard.test
```

Expected: PASS — all 3 tests green.

- [ ] **Step 5: Commit**

```bash
git add components/MemberCard.tsx __tests__/components/MemberCard.test.tsx
git commit -m "feat: add MemberCard with gradient avatar and hover overlay"
```

---

## Task 8: MemberModal Component

**Files:**
- Create: `components/MemberModal.tsx`
- Create: `__tests__/components/MemberModal.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// __tests__/components/MemberModal.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import MemberModal from '@/components/MemberModal'
import { Member } from '@/lib/types'

const member: Member = {
  id: 1,
  name: 'Test User',
  initials: 'TU',
  role: 'UI Designer',
  bio: 'A bio about test user.',
  skills: ['Figma', 'React', 'CSS'],
  gradient: 'linear-gradient(135deg, #6C63FF, #a78bfa)',
  github: 'https://github.com/test',
}

describe('MemberModal', () => {
  it('renders nothing when member is null', () => {
    const { container } = render(<MemberModal member={null} onClose={jest.fn()} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders member name, role, bio, and skills when open', () => {
    render(<MemberModal member={member} onClose={jest.fn()} />)
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('UI Designer')).toBeInTheDocument()
    expect(screen.getByText('A bio about test user.')).toBeInTheDocument()
    expect(screen.getByText('Figma')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('renders github link when provided', () => {
    render(<MemberModal member={member} onClose={jest.fn()} />)
    expect(screen.getByText('GitHub ↗')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn()
    render(<MemberModal member={member} onClose={onClose} />)
    fireEvent.click(screen.getByLabelText('Close modal'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when backdrop is clicked', () => {
    const onClose = jest.fn()
    render(<MemberModal member={member} onClose={onClose} />)
    fireEvent.click(screen.getByTestId('modal-backdrop'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test MemberModal.test
```

Expected: FAIL — `Cannot find module '@/components/MemberModal'`

- [ ] **Step 3: Write `components/MemberModal.tsx`**

```tsx
// components/MemberModal.tsx
'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Member } from '@/lib/types'

interface Props {
  member: Member | null
  onClose: () => void
}

export default function MemberModal({ member, onClose }: Props) {
  return (
    <AnimatePresence>
      {member && (
        <>
          {/* Backdrop */}
          <motion.div
            data-testid="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Modal container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="bg-white rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with gradient avatar */}
              <div
                className="h-32 flex items-center justify-center relative"
                style={{ background: member.gradient }}
              >
                <span className="font-display font-extrabold text-5xl text-white">
                  {member.initials}
                </span>
                <button
                  aria-label="Close modal"
                  onClick={onClose}
                  className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                <h3 className="font-display font-bold text-xl text-brand-fg mb-0.5">{member.name}</h3>
                <p className="font-body text-sm text-brand-muted mb-4">{member.role}</p>
                <p className="font-body text-sm text-brand-fg/70 leading-relaxed mb-5">{member.bio}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-body text-[11px] font-medium px-2.5 py-1 rounded-full bg-brand-surface text-brand-fg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Social links */}
                {(member.github || member.linkedin) && (
                  <div className="flex gap-4">
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-xs text-brand-indigo hover:underline"
                      >
                        GitHub ↗
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-xs text-brand-indigo hover:underline"
                      >
                        LinkedIn ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test MemberModal.test
```

Expected: PASS — all 5 tests green.

- [ ] **Step 5: Commit**

```bash
git add components/MemberModal.tsx __tests__/components/MemberModal.test.tsx
git commit -m "feat: add MemberModal with AnimatePresence open/close animation"
```

---

## Task 9: Members Section

**Files:**
- Create: `components/Members.tsx`
- Create: `__tests__/components/Members.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// __tests__/components/Members.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Members from '@/components/Members'

describe('Members', () => {
  it('renders 10 member cards', () => {
    render(<Members />)
    // Each card shows the member's initials
    const cards = screen.getAllByText(/^M\d$|^MT$/)
    expect(cards).toHaveLength(10)
  })

  it('renders the section heading', () => {
    render(<Members />)
    expect(screen.getByText('Meet all 10 of us')).toBeInTheDocument()
  })

  it('opens modal when a card is clicked', () => {
    render(<Members />)
    // Click the first card (M1 initials)
    fireEvent.click(screen.getByText('M1').closest('[data-testid="member-card"]')!)
    expect(screen.getByText('Member One')).toBeInTheDocument()
    expect(screen.getByText('UI Designer')).toBeInTheDocument()
  })

  it('closes modal when backdrop is clicked', () => {
    render(<Members />)
    fireEvent.click(screen.getByText('M1').closest('[data-testid="member-card"]')!)
    expect(screen.getByText('Member One')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('modal-backdrop'))
    expect(screen.queryByText('Member One')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test Members.test
```

Expected: FAIL — `Cannot find module '@/components/Members'`

- [ ] **Step 3: Add `data-testid` to `MemberCard`**

Open `components/MemberCard.tsx` and add `data-testid="member-card"` to the outer div:

```tsx
<div
  data-testid="member-card"
  className="group relative rounded-2xl overflow-hidden cursor-pointer ..."
  onClick={onClick}
>
```

- [ ] **Step 4: Write `components/Members.tsx`**

```tsx
// components/Members.tsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { members } from '@/data/members'
import { Member } from '@/lib/types'
import MemberCard from './MemberCard'
import MemberModal from './MemberModal'

export default function Members() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)

  return (
    <section id="members" className="px-8 md:px-12 py-20 max-w-5xl mx-auto">
      <div className="font-body text-[11px] font-bold tracking-[2px] uppercase text-brand-indigo mb-3">
        The Team
      </div>
      <h2 className="font-display font-extrabold text-4xl tracking-tight text-brand-fg mb-10">
        Meet all 10 of us
      </h2>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {members.map((member) => (
          <motion.div
            key={member.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
          >
            <MemberCard
              member={member}
              onClick={() => setSelectedMember(member)}
            />
          </motion.div>
        ))}
      </motion.div>

      <MemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </section>
  )
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npm test Members.test
```

Expected: PASS — all 4 tests green.

- [ ] **Step 6: Run full test suite**

```bash
npm test
```

Expected: All test suites pass (members.test, MemberCard.test, MemberModal.test, Members.test).

- [ ] **Step 7: Commit**

```bash
git add components/Members.tsx components/MemberCard.tsx __tests__/components/Members.test.tsx
git commit -m "feat: add Members section with staggered grid and modal state"
```

---

## Task 10: Home Page Assembly

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Write `app/page.tsx`**

Replace the entire file:

```tsx
// app/page.tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Members from '@/components/Members'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Members />
      </main>
    </>
  )
}
```

- [ ] **Step 2: Start dev server and verify all sections render**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify:
- Sticky nav with logo and links
- Hero with gradient headline, floating blobs, and CTA button
- Dark About section with stat cards
- Members grid with 10 cards (2 columns on mobile, 5 on desktop)
- Clicking a card opens the modal; clicking backdrop or X closes it
- Clicking nav links scrolls smoothly to each section

Ctrl+C to stop.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble home page with Nav, Hero, About, and Members sections"
```

---

## Task 11: Final Polish & Type-Check

**Files:**
- No new files — verification only

- [ ] **Step 1: Run TypeScript type check**

```bash
npx tsc --noEmit
```

Expected: No errors. If there are errors, fix them before proceeding.

- [ ] **Step 2: Run ESLint**

```bash
npm run lint
```

Expected: No errors or warnings. Fix any reported issues.

- [ ] **Step 3: Run full test suite one final time**

```bash
npm test
```

Expected: All tests pass.

- [ ] **Step 4: Production build check**

```bash
npm run build
```

Expected: Build completes with no errors. Note the output bundle size.

- [ ] **Step 5: Replace placeholder member data with real names**

Open `data/members.ts`. Replace each `Member One` / `Member Two` / etc. with the actual team member names, roles, bios, and skills. Update `initials` to match. Optionally add `github` and `linkedin` fields.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: complete group portfolio — all sections, animations, and tests passing"
```

---

## Spec Coverage Check

| Spec Section | Covered By |
|---|---|
| Color palette (Pop Candy) | Task 1 — `tailwind.config.js` brand colors |
| Typography (Space Grotesk + DM Sans) | Task 3 — `layout.tsx` Google Fonts |
| Type scale | Tasks 4–9 — Tailwind classes per component |
| Navigation | Task 4 — `Nav.tsx` |
| Hero (blobs, headline, CTA, pill) | Task 5 — `Hero.tsx` |
| About (dark section, stats) | Task 6 — `About.tsx` |
| Member card grid (2×5) | Task 9 — `Members.tsx` |
| Member card hover overlay | Task 7 — `MemberCard.tsx` |
| Member modal (bio, skills, links) | Task 8 — `MemberModal.tsx` |
| All Framer Motion animations | Tasks 5, 6, 7, 8, 9 |
| Responsive breakpoints | Tasks 4, 6, 9 (`grid-cols-2 sm:3 md:4 lg:5`) |
| Member data shape | Task 2 — `lib/types.ts` + `data/members.ts` |
| Content placeholders (names, bios) | Task 11 — final data population |
