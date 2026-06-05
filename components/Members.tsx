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
