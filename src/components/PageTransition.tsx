import { motion } from 'framer-motion'

/**
 * Wraps page content with smooth enter/exit transitions.
 * Use inside React Router <Routes>.
 */
const pageVariants = {
  initial: {
    opacity: 0,
    y: 24,
    filter: 'blur(6px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    filter: 'blur(4px)',
    transition: {
      duration: 0.3,
    },
  },
}

function PageTransition({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
