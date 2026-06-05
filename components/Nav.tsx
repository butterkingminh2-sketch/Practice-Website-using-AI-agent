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
