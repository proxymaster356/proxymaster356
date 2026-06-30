import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * A card that tracks the mouse and renders a radial spotlight gradient
 * where the cursor is, giving a premium "light-follows-you" effect.
 * Drop-in replacement for plain glass-card divs.
 */
function SpotlightCard({ children, className = '', as = 'div', ...rest }) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const Tag = as === 'article' ? motion.article : motion.div

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`spotlight-card group relative overflow-hidden rounded-2xl border transition-all duration-300
        border-white/30 bg-white/60 shadow-card-light backdrop-blur-xl
        dark:border-white/[0.08] dark:bg-white/[0.04] dark:shadow-card-dark dark:backdrop-blur-xl
        hover:shadow-card-hover-light dark:hover:shadow-card-hover-dark
        hover:border-accentTeal/20 dark:hover:border-accentTeal/20
        ${className}`}
      {...rest}
    >
      {/* Radial spotlight overlay */}
      <div
        className="pointer-events-none absolute -inset-px z-0 rounded-2xl opacity-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,191,166,0.12), transparent 40%)`,
        }}
      />
      {/* Spotlight border glow */}
      <div
        className="pointer-events-none absolute -inset-px z-0 rounded-2xl opacity-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(0,191,166,0.25), transparent 40%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />
      <div className="relative z-10">{children}</div>
    </Tag>
  )
}

export default SpotlightCard
