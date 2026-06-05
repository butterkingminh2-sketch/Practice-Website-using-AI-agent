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
