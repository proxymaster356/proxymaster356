import { motion } from 'framer-motion'
import { FiArrowUp, FiGithub, FiInstagram, FiLinkedin, FiHeart } from 'react-icons/fi'

const links = [
  { href: 'https://github.com/proxymaster356', icon: FiGithub, label: 'GitHub' },
  { href: 'https://instagram.com/dutta_debopam', icon: FiInstagram, label: 'Instagram' },
  { href: 'https://www.linkedin.com/in/debopam-dutta-bb220b323/', icon: FiLinkedin, label: 'LinkedIn' },
]

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/20 bg-white/40 px-4 py-10 backdrop-blur-xl dark:border-white/[0.06] dark:bg-white/[0.02] sm:px-6 lg:px-8">
      {/* Subtle gradient top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accentTeal/40 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center sm:text-left"
          >
            <span className="font-heading text-2xl font-bold text-accentTeal">DD</span>
            <p className="mt-1 flex items-center justify-center gap-1 text-sm text-slate-600 dark:text-slate-300 sm:justify-start">
              Designed & built with <FiHeart className="inline text-red-400" /> by Debopam Dutta
            </p>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            {links.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="group rounded-full border border-white/30 p-2.5 text-slate-600 transition-all hover:border-accentTeal/30 hover:text-accentTeal hover:shadow-glow-teal dark:border-white/10 dark:text-slate-300"
              >
                <Icon className="transition-transform group-hover:scale-110" />
              </a>
            ))}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="group rounded-full border border-accentTeal/50 bg-accentTeal/10 p-2.5 text-accentTeal transition-all hover:-translate-y-1 hover:shadow-glow-teal"
            >
              <FiArrowUp className="transition-transform group-hover:-translate-y-0.5" />
            </button>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 border-t border-white/10 pt-4 text-center text-xs text-slate-500 dark:text-slate-500"
        >
          &copy; {new Date().getFullYear()} Debopam Dutta. All rights reserved.
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
