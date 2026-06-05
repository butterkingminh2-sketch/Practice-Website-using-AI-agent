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
          transition={{ duration: 0.5, ease: 'easeOut' } as any} // eslint-disable-line @typescript-eslint/no-explicit-any
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
