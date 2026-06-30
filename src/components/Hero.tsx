import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from './MagneticButton'

const roles = ['Biotech Engineer', 'AI Developer', 'Computer Vision Enthusiast', 'IoT Builder']

const profileImages = [
  { src: '/profile-1.jpeg', color: '#00BFA6', shape: 'circle' },
  { src: '/profile-2.jpeg', color: '#FFB703', shape: 'square' },
  { src: '/profile-3.jpeg', color: '#8B5CF6', shape: 'circle' },
  { src: '/profile-4.jpeg', color: '#00BFA6', shape: 'square' },
  { src: '/profile-5.jpeg', color: '#FFB703', shape: 'circle' },
]

const SCALE_MAP = [1, 1.1, 0.93, 1.07, 1.04]
const ORBIT_RADIUS = 210
const orbitPositions = profileImages.map((_, i) => {
  const angle = (i * 72 + 54) * (Math.PI / 180)
  return { x: Math.cos(angle) * ORBIT_RADIUS, y: Math.sin(angle) * ORBIT_RADIUS }
})

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

/* Stagger container — children animate in sequence */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
}

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  /* Typewriter */
  useEffect(() => {
    const currentRole = roles[roleIndex]
    const speed = isDeleting ? 45 : 85
    const timeout = setTimeout(() => {
      if (!isDeleting && typedText.length < currentRole.length) {
        setTypedText(currentRole.slice(0, typedText.length + 1))
      } else if (isDeleting && typedText.length > 0) {
        setTypedText(currentRole.slice(0, typedText.length - 1))
      } else if (!isDeleting && typedText.length === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 1200)
      } else {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
      }
    }, speed)
    return () => clearTimeout(timeout)
  }, [typedText, isDeleting, roleIndex])

  /* Auto-cycle images every 3.5 s */
  useEffect(() => {
    const id = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % profileImages.length)
    }, 3500)
    return () => clearInterval(id)
  }, [])

  const activeColor = profileImages[activeImage].color
  const activeShape = profileImages[activeImage].shape

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-4 pt-24 sm:px-6 lg:px-8">
      {/* Ambient glow orbs */}
      <div className="glow-dot -left-32 top-1/4 bg-accentTeal" />
      <div className="glow-dot -right-32 bottom-1/4 bg-accentPurple" />
      <div className="glow-dot bottom-0 left-1/3 bg-accentAmber opacity-10" />

      {/* Animated color wash that follows active image color */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        animate={{ background: `radial-gradient(ellipse at 70% 40%, ${activeColor}18 0%, transparent 60%)` }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />

      {/* Gradient mesh */}
      <div className="absolute inset-0 -z-10 bg-mesh" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(0,191,166,0.18),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.12),transparent_45%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,transparent,rgba(0,191,166,0.06),rgba(139,92,246,0.04),transparent)] bg-[length:200%_200%] dark:bg-[linear-gradient(120deg,rgba(6,11,24,0.8),rgba(0,191,166,0.15),rgba(139,92,246,0.08),rgba(6,11,24,0.8))] animate-gradientShift" />
      <div className="absolute inset-0 -z-10 opacity-[0.02] dark:opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M60 0H0v60\' fill=\'none\' stroke=\'%2300BFA6\' stroke-width=\'0.5\'/%3E%3C/svg%3E")', backgroundSize: '60px 60px' }} />

      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.2fr_0.8fr]">

        {/* ── Left: staggered text ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.p
            variants={fadeUp}
            className="mb-4 inline-flex rounded-full border border-accentTeal/30 bg-accentTeal/10 px-4 py-1.5 text-sm font-medium text-accentTeal shadow-glow-teal backdrop-blur-sm"
          >
            UEM Kolkata · Biotechnology Engineering
          </motion.p>

          {/* Name with gradient sweep reveal */}
          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl font-bold uppercase tracking-wide sm:text-5xl lg:text-6xl"
          >
            <motion.span
              className="inline-block bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-slate-400"
              initial={{ backgroundPosition: '100% 50%' }}
              animate={{ backgroundPosition: '0% 50%' }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              style={{ backgroundSize: '200% 100%' }}
            >
              Debopam Dutta
            </motion.span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.p variants={fadeUp} className="mt-4 h-8 text-lg font-semibold sm:text-xl">
            <span className="bg-gradient-to-r from-accentTeal to-accentAmber bg-clip-text text-transparent">
              {typedText}
            </span>
            <span className="ml-1 inline-block h-6 w-[2px] animate-pulse bg-accentTeal align-middle" />
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg"
          >
            Building intelligent systems at the intersection of biology and technology.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
            <MagneticButton
              onClick={() => scrollToSection('projects')}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-accentTeal to-accentTeal/80 px-7 py-3 text-sm font-semibold text-white shadow-glow-teal transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <span className="relative z-10">View Projects</span>
              <span className="absolute inset-0 bg-gradient-to-r from-accentTeal via-accentPurple to-accentTeal bg-[length:200%_100%] opacity-0 transition-opacity duration-500 group-hover:animate-shimmer group-hover:opacity-100" />
            </MagneticButton>
            <MagneticButton
              onClick={() => window.open('/resume%20cv%20.pdf', '_blank')}
              className="rounded-full border border-accentAmber/40 bg-accentAmber/10 px-7 py-3 text-sm font-semibold text-accentAmber backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-accentAmber/60 hover:bg-accentAmber/15 hover:shadow-glow-amber"
            >
              Download CV
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* ── Right: photo orbiter ── */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate="show"
          className="relative hidden items-center justify-center lg:flex"
          style={{ minHeight: '30rem' }}
        >
          {/* Color wash pulse */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.25, 0.55, 0.25],
              backgroundColor: `${activeColor}1A`,
              borderRadius: activeShape === 'square' ? '20%' : '50%',
            }}
            transition={{ scale: { repeat: Infinity, duration: 4, ease: 'easeInOut' }, opacity: { repeat: Infinity, duration: 4, ease: 'easeInOut' }, backgroundColor: { duration: 1 }, borderRadius: { duration: 0.8 } }}
            className="absolute h-[30rem] w-[30rem] blur-3xl"
          />

          {/* Ring 1 — clockwise */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
            className="absolute transition-all duration-700"
            style={{
              width: ORBIT_RADIUS * 2 + 48,
              height: ORBIT_RADIUS * 2 + 48,
              border: `2px solid ${activeColor}30`,
              borderRadius: activeShape === 'square' ? '24%' : '50%',
            }}
          />

          {/* Ring 2 — counter-clockwise dashed */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 35, ease: 'linear' }}
            className="absolute transition-all duration-700"
            style={{
              width: ORBIT_RADIUS * 2 + 90,
              height: ORBIT_RADIUS * 2 + 90,
              border: `1px dashed ${activeColor}20`,
              borderRadius: activeShape === 'square' ? '20%' : '50%',
            }}
          />

          {/* Center profile image */}
          <motion.div
            animate={{
              scale: SCALE_MAP[activeImage],
              borderRadius: activeShape === 'square' ? '16%' : '50%',
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="relative z-10 h-80 w-80 overflow-hidden border-4 transition-[box-shadow,border-color] duration-700"
            style={{
              borderColor: `${activeColor}80`,
              boxShadow: `0 0 30px ${activeColor}4D, 0 0 80px ${activeColor}26, 0 0 120px ${activeColor}1A`,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={profileImages[activeImage].src}
                alt="Debopam Dutta"
                className="h-full w-full object-cover object-top"
                initial={{ opacity: 0, scale: 1.08, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              />
            </AnimatePresence>
          </motion.div>

          {/* Orbiting selector dots */}
          {profileImages.map((img, i) => {
            const pos = orbitPositions[i]
            const isActive = activeImage === i
            const size = isActive ? 48 : 30
            const dotRadius = img.shape === 'square' ? '25%' : '50%'
            return (
              <motion.button
                key={i}
                type="button"
                onClick={() => setActiveImage(i)}
                animate={{ width: size, height: size, borderRadius: dotRadius }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                whileHover={{ scale: 1.35 }}
                whileTap={{ scale: 0.8 }}
                className="absolute z-20 cursor-pointer overflow-hidden border-2"
                style={{
                  left: `calc(50% + ${pos.x}px - ${size / 2}px)`,
                  top: `calc(50% + ${pos.y}px - ${size / 2}px)`,
                  borderColor: isActive ? img.color : `${img.color}55`,
                  boxShadow: isActive ? `0 0 18px ${img.color}66, 0 0 44px ${img.color}33` : `0 0 6px ${img.color}22`,
                  background: `${img.color}18`,
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                aria-label={`Switch to profile photo ${i + 1}`}
              >
                <img src={img.src} alt="" className="h-full w-full object-cover" />
                {isActive && (
                  <motion.div
                    layoutId="active-dot-ring"
                    className="absolute inset-0 border-2"
                    style={{ borderColor: img.color, borderRadius: dotRadius }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  />
                )}
              </motion.button>
            )
          })}

          {/* Connector lines */}
          <svg
            className="pointer-events-none absolute z-[5]"
            style={{ width: ORBIT_RADIUS * 2 + 90, height: ORBIT_RADIUS * 2 + 90, overflow: 'visible' }}
          >
            {orbitPositions.map((pos, i) => (
              <line
                key={i}
                x1="50%" y1="50%"
                x2={`${50 + (pos.x / (ORBIT_RADIUS * 2 + 90)) * 100}%`}
                y2={`${50 + (pos.y / (ORBIT_RADIUS * 2 + 90)) * 100}%`}
                stroke={profileImages[i].color}
                strokeOpacity={activeImage === i ? 0.35 : 0.06}
                strokeWidth={activeImage === i ? 2 : 0.5}
                strokeDasharray={activeImage === i ? '6 4' : '3 5'}
                style={{ transition: 'all 0.6s ease' }}
              />
            ))}
          </svg>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
