// app/layout.tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Space_Grotesk, DM_Sans } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'group. — IT × Design',
  description: 'A 10-member student team blending technology and creativity.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} font-body bg-brand-bg text-brand-fg antialiased`}>
        {children}
      </body>
    </html>
  )
}
