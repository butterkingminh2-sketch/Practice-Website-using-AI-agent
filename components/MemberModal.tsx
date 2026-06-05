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
            transition={{ duration: 0.2 } as any}
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
