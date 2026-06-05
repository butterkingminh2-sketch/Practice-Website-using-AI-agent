// components/Hero.tsx
'use client'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay } as any,
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
