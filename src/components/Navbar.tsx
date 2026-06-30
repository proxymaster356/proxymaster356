import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCalendar,
  FiCamera,
  FiFileText,
  FiHome,
  FiImage,
  FiMail,
  FiMenu,
  FiSearch,
  FiTool,
  FiUser,
  FiX,
} from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'

const sectionLinks = [
  { id: 'home', label: 'Home', icon: FiHome },
  { id: 'about', label: 'About Me', icon: FiUser },
  { id: 'education', label: 'Education', icon: FiBookOpen },
  { id: 'skills', label: 'Skill Set', icon: FiTool },
  { id: 'projects', label: 'Projects', icon: FiBriefcase },
  { id: 'publications', label: 'Publications', icon: FiFileText },
  { id: 'research', label: 'Research', icon: FiSearch },
  { id: 'contact', label: 'Contact', icon: FiMail },
]

const pageLinks = [
  { to: '/achievements', label: 'Achievements', icon: FiAward },
  { to: '/posters', label: 'Posters', icon: FiImage },
  { to: '/events', label: 'Events', icon: FiCalendar },
  { to: '/photography', label: 'Photography', icon: FiCamera },
]

const quickSectionLinks = sectionLinks.filter((link) => ['home', 'about', 'projects', 'contact'].includes(link.id))

/** Smooth-scroll to a section, accounting for the fixed navbar height */
function scrollToSection(id) {
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = document.getElementById(id)
  if (el) {
    const navHeight = 72
    const y = el.getBoundingClientRect().top + window.scrollY - navHeight
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

function Navbar({ activeSection }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const isHomePage = location.pathname === '/'

  const handleLinkClick = () => setIsOpen(false)

  /** Navigate to home page first if needed, then scroll to the section */
  const handleSectionClick = useCallback((sectionId) => {
    setIsOpen(false)
    if (isHomePage) {
      scrollToSection(sectionId)
    } else {
      navigate(sectionId === 'home' ? '/' : `/#${sectionId}`)
    }
  }, [isHomePage, navigate])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-white/70 shadow-sm backdrop-blur-2xl transition-all duration-500 dark:border-white/[0.06] dark:bg-backgroundDark/70 dark:shadow-none">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" onClick={handleLinkClick} className="font-heading text-xl font-bold tracking-wide text-accentTeal" aria-label="Debopam Dutta Home">
          DD
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          {quickSectionLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleSectionClick(link.id)}
              className={`text-sm font-medium transition-colors ${
                isHomePage && activeSection === link.id
                  ? 'text-accentTeal'
                  : 'text-slate-600 hover:text-accentTeal dark:text-slate-300 dark:hover:text-accentTeal'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="h-5 w-px bg-slate-300/40 dark:bg-white/20" />
          {pageLinks.map((link) => {
            const Icon = link.icon
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-accentTeal/15 text-accentTeal'
                      : 'text-slate-600 hover:text-accentTeal dark:text-slate-300 dark:hover:text-accentTeal'
                  }`
                }
              >
                <Icon className="text-sm" />
                {link.label}
              </NavLink>
            )
          })}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300/40 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-accentTeal/50 hover:text-accentTeal dark:border-white/15 dark:text-slate-100"
          >
            {isOpen ? <FiX /> : <FiMenu />} Sections
          </button>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300/40 text-slate-700 dark:border-white/15 dark:text-slate-100"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-white/20 bg-white/80 px-4 py-4 backdrop-blur-2xl dark:border-white/[0.06] dark:bg-slate-900/80"
          >
            <div className="mx-auto grid max-w-6xl gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {sectionLinks.map((link) => {
                const Icon = link.icon
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleSectionClick(link.id)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isHomePage && activeSection === link.id
                        ? 'bg-accentTeal/15 text-accentTeal'
                        : 'text-slate-700 hover:bg-accentTeal/10 hover:text-accentTeal dark:text-slate-200'
                    }`}
                  >
                    <Icon className="shrink-0" />
                    {link.label}
                  </button>
                )
              })}
              {pageLinks.map((link) => {
                const Icon = link.icon
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-accentTeal/15 text-accentTeal'
                          : 'text-slate-700 hover:bg-accentTeal/10 hover:text-accentTeal dark:text-slate-200'
                      }`
                    }
                  >
                    <Icon className="shrink-0" />
                    {link.label}
                  </NavLink>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
