'use client'
import { Member } from '@/lib/types'

interface Props {
  member: Member
  onClick: () => void
}

export default function MemberCard({ member, onClick }: Props) {
  return (
    <div
      data-testid="member-card"
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
        <span className="font-body font-normal text-white/70 text-[11px]">{member.skills.slice(0, 3).join(' · ')}</span>
        <span className="border border-white/40 text-white text-[10px] px-2.5 py-1 rounded-full font-body">
          Click to expand
        </span>
      </div>
    </div>
  )
}
