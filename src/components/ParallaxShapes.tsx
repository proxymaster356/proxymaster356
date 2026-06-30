import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Decorative geometric shapes that float with subtle parallax.
 * Placed behind content (z-0) to add depth to the page.
 * Inspired by modern SaaS / design portfolio hero patterns.
 */
const shapes = [
  { type: 'hexagon', top: '8%', left: '5%', size: 60, color: 'rgba(0,191,166,0.08)', rotate: 12, speed: 0.15 },
  { type: 'circle', top: '25%', right: '8%', size: 40, color: 'rgba(139,92,246,0.1)', rotate: 0, speed: 0.25 },
  { type: 'square', top: '45%', left: '7%', size: 35, color: 'rgba(255,183,3,0.08)', rotate: 45, speed: 0.2 },
  { type: 'triangle', top: '65%', right: '5%', size: 50, color: 'rgba(0,191,166,0.06)', rotate: -15, speed: 0.18 },
  { type: 'circle', top: '80%', left: '12%', size: 28, color: 'rgba(139,92,246,0.07)', rotate: 0, speed: 0.22 },
  { type: 'cross', top: '15%', right: '15%', size: 30, color: 'rgba(255,183,3,0.06)', rotate: 22, speed: 0.12 },
  { type: 'hexagon', top: '92%', right: '10%', size: 45, color: 'rgba(0,191,166,0.05)', rotate: -30, speed: 0.16 },
  { type: 'donut', top: '55%', left: '3%', size: 50, color: 'rgba(139,92,246,0.06)', rotate: 0, speed: 0.3 },
]

function ShapeSVG({ type, size, color }) {
  const half = size / 2
  switch (type) {
    case 'hexagon': {
      const pts = Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 3) * i - Math.PI / 2
        return `${half + half * 0.9 * Math.cos(a)},${half + half * 0.9 * Math.sin(a)}`
      }).join(' ')
      return (
        <svg width={size} height={size}>
          <polygon points={pts} fill="none" stroke={color} strokeWidth="1.5" />
        </svg>
      )
    }
    case 'circle':
      return (
        <svg width={size} height={size}>
          <circle cx={half} cy={half} r={half - 2} fill={color} />
        </svg>
      )
    case 'square':
      return (
        <svg width={size} height={size}>
          <rect x="2" y="2" width={size - 4} height={size - 4} rx="4" fill="none" stroke={color} strokeWidth="1.5" />
        </svg>
      )
    case 'triangle': {
      const pts = `${half},4 ${size - 4},${size - 4} 4,${size - 4}`
      return (
        <svg width={size} height={size}>
          <polygon points={pts} fill="none" stroke={color} strokeWidth="1.5" />
        </svg>
      )
    }
    case 'cross':
      return (
        <svg width={size} height={size}>
          <line x1={half} y1="4" x2={half} y2={size - 4} stroke={color} strokeWidth="1.5" />
          <line x1="4" y1={half} x2={size - 4} y2={half} stroke={color} strokeWidth="1.5" />
        </svg>
      )
    case 'donut':
      return (
        <svg width={size} height={size}>
          <circle cx={half} cy={half} r={half - 4} fill="none" stroke={color} strokeWidth="2" />
          <circle cx={half} cy={half} r={half * 0.4} fill={color} />
        </svg>
      )
    default:
      return null
  }
}

function FloatingShape({ shape, index }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 3000], [0, -300 * shape.speed])

  const positionStyle = {}
  if (shape.top) positionStyle.top = shape.top
  if (shape.left) positionStyle.left = shape.left
  if (shape.right) positionStyle.right = shape.right

  return (
    <motion.div
      style={{ ...positionStyle, y }}
      initial={{ opacity: 0, rotate: shape.rotate - 20 }}
      animate={{ opacity: 1, rotate: shape.rotate }}
      transition={{ duration: 1.5, delay: index * 0.15, ease: 'easeOut' }}
      className="pointer-events-none absolute z-0"
    >
      <ShapeSVG type={shape.type} size={shape.size} color={shape.color} />
    </motion.div>
  )
}

function ParallaxShapes() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {shapes.map((shape, i) => (
        <FloatingShape key={`shape-${i}`} shape={shape} index={i} />
      ))}
    </div>
  )
}

export default ParallaxShapes
