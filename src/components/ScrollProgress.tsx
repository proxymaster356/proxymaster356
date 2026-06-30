import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * A sleek scroll-progress indicator fixed at the very top of the viewport.
 * Uses a gradient line that grows from left to right as the user scrolls.
 */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.1 })

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-gradient-to-r from-accentTeal via-accentPurple to-accentAmber"
    />
  )
}

export default ScrollProgress
