// __mocks__/framer-motion.tsx
/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
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
