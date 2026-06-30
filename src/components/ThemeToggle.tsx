import { AnimatePresence, motion } from 'framer-motion'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300/40 bg-white/70 text-slate-700 transition-all duration-300 hover:scale-105 hover:border-accentTeal/70 dark:border-white/15 dark:bg-slate-900/70 dark:text-slate-100"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -40, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 40, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          {theme === 'dark' ? <FiSun className="text-accentAmber" /> : <FiMoon className="text-accentTeal" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export default ThemeToggle
