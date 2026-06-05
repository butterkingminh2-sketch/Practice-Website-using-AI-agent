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
