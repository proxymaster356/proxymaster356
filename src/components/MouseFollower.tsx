import { useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

/* ──────────────────────────────────────────────
   Floating particles that lazily follow the mouse
   ────────────────────────────────────────────── */

const PARTICLES = [
  { id: 1, size: 8,  color: 'teal',  lag: 0.02, offsetX: -40,  offsetY: -30,  shape: 'circle' },
  { id: 2, size: 12, color: 'amber', lag: 0.015, offsetX: 50,   offsetY: -60,  shape: 'circle' },
  { id: 3, size: 6,  color: 'teal',  lag: 0.025, offsetX: -70,  offsetY: 40,   shape: 'circle' },
  { id: 4, size: 14, color: 'amber', lag: 0.01,  offsetX: 30,   offsetY: 70,   shape: 'square' },
  { id: 5, size: 10, color: 'teal',  lag: 0.018, offsetX: -90,  offsetY: -80,  shape: 'circle' },
  { id: 6, size: 7,  color: 'amber', lag: 0.022, offsetX: 80,   offsetY: 30,   shape: 'diamond' },
  { id: 7, size: 16, color: 'teal',  lag: 0.008, offsetX: -30,  offsetY: 90,   shape: 'circle' },
  { id: 8, size: 5,  color: 'amber', lag: 0.03,  offsetX: 60,   offsetY: -40,  shape: 'circle' },
]

const colorMap = {
  teal:  { bg: 'rgba(0,168,150,0.5)',  glow: 'rgba(0,168,150,0.25)' },
  amber: { bg: 'rgba(255,183,3,0.5)',  glow: 'rgba(255,183,3,0.25)' },
}

function Particle({ particle, mouseX, mouseY }) {
  const { size, color, lag, offsetX, offsetY, shape } = particle
  const stiffness = lag * 800
  const damping = lag * 1200

  const springConfig = { stiffness: stiffness, damping: damping, mass: 0.5 }
  const x = useSpring(useMotionValue(0), springConfig)
  const y = useSpring(useMotionValue(0), springConfig)

  useEffect(() => {
    const unsubX = mouseX.on('change', (v) => x.set(v + offsetX))
    const unsubY = mouseY.on('change', (v) => y.set(v + offsetY))
    return () => { unsubX(); unsubY() }
  }, [mouseX, mouseY, x, y, offsetX, offsetY])

  const { bg, glow } = colorMap[color]
  const borderRadius = shape === 'circle' ? '50%' : shape === 'diamond' ? '4px' : '3px'
  const rotation = shape === 'diamond' ? 45 : 0

  return (
    <motion.div
      style={{
        x,
        y,
        width: size,
        height: size,
        borderRadius,
        rotate: rotation,
        background: bg,
        boxShadow: `0 0 ${size * 2}px ${glow}`,
      }}
      className="pointer-events-none fixed left-0 top-0 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.4, delay: particle.id * 0.05 }}
    />
  )
}

/* Cursor glow ring */
function CursorGlow({ mouseX, mouseY }) {
  const springConfig = { stiffness: 100, damping: 40, mass: 0.2 }
  const x = useSpring(useMotionValue(0), springConfig)
  const y = useSpring(useMotionValue(0), springConfig)

  useEffect(() => {
    const unsubX = mouseX.on('change', (v) => x.set(v - 20))
    const unsubY = mouseY.on('change', (v) => y.set(v - 20))
    return () => { unsubX(); unsubY() }
  }, [mouseX, mouseY, x, y])

  return (
    <motion.div
      style={{ x, y }}
      className="pointer-events-none fixed left-0 top-0 z-40 h-10 w-10 rounded-full border border-accentTeal/30 bg-accentTeal/5 backdrop-blur-[1px]"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    />
  )
}

function MouseFollower() {
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)
  const [isVisible, setIsVisible] = useState(false)

  const handleMouseMove = useCallback((e) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
    if (!isVisible) setIsVisible(true)
  }, [mouseX, mouseY, isVisible])

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  // Hide on touch devices
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  if (isTouchDevice) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <CursorGlow mouseX={mouseX} mouseY={mouseY} />
          {PARTICLES.map((p) => (
            <Particle key={p.id} particle={p} mouseX={mouseX} mouseY={mouseY} />
          ))}
        </>
      )}
    </AnimatePresence>
  )
}

export default MouseFollower
