import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * A button that subtly "attracts" itself toward the cursor when
 * hovering near it, as if it were magnetic. Creates a delightful,
 * premium micro-interaction.
 */
function MagneticButton({ children, className = '', intensity = 0.35, ...rest }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 200, damping: 20, mass: 0.5 }
  const sx = useSpring(x, springConfig)
  const sy = useSpring(y, springConfig)

  // Subtle scale on hover
  const scale = useSpring(1, springConfig)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * intensity)
    y.set((e.clientY - centerY) * intensity)
    scale.set(1.05)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    scale.set(1)
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: sx, y: sy, scale }}
      className={className}
      {...rest}
    >
      {children}
    </motion.button>
  )
}

export default MagneticButton
