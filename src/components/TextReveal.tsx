import { motion } from 'framer-motion'

/**
 * Animated text reveal — each word (or character) cascades in with
 * blur, scale, and vertical offset. Used for section headings.
 *
 * Usage:
 *   <TextReveal text="My Section Title" />
 *   <TextReveal text="Hello World" charMode />  ← per-character
 */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(8px)',
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

function TextReveal({ text, className = '', charMode = false }) {
  const units = charMode ? text.split('') : text.split(' ')

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className={`inline-flex flex-wrap ${className}`}
    >
      {units.map((unit, i) => (
        <motion.span
          key={`${unit}-${i}`}
          variants={wordVariants}
          className="inline-block"
          style={{ marginRight: charMode ? 0 : '0.3em' }}
        >
          {unit}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default TextReveal
