import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiAward, FiStar, FiTarget, FiTrendingUp, FiX, FiBookOpen } from 'react-icons/fi'

/** Lightbox — rendered via portal so fixed positioning is never broken by parent transforms */
function LightboxModal({ lightbox, onClose }) {
  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(8px)' }}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative', maxHeight: '85vh', width: '90vw', maxWidth: '720px', overflow: 'hidden', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)', background: '#0f172a', boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 10, borderRadius: '9999px', background: 'rgba(0,0,0,0.5)', padding: '0.5rem', color: 'white', border: 'none', cursor: 'pointer' }}
          aria-label="Close"
        >
          <FiX size={18} />
        </button>
        <img
          src={lightbox.image}
          alt={lightbox.name}
          style={{ display: 'block', width: '100%', maxHeight: '75vh', objectFit: 'contain', imageOrientation: 'from-image' }}
        />
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15,23,42,0.9)', padding: '0.75rem 1rem' }}>
          <p style={{ textAlign: 'center', fontSize: '0.875rem', fontWeight: 500, color: '#e2e8f0', margin: 0 }}>{lightbox.name}</p>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}

/* ── Competitions & Recognition ── */
const competitions = [
  {
    title: 'Himalayan Startup Trek — IIT Mandi Catalyst',
    type: 'Finalist',
    period: 'Jan 1-4, 2026',
    details: 'Our team made it to the finals of the Startup Grand Challenge by IIT Mandi Catalyst — the biggest startup event of the Himalayas. The journey involved intense pitching rounds, honest feedback, and masterclasses that genuinely pushed our thinking. Grateful for the learning more than the milestone.',
    icon: FiAward,
    color: '#FFB703',
  },
  {
    title: 'URECKON 2026 — Codexify Hackathon',
    type: '2nd Place',
    period: 'Feb 21–22, 2026',
    details: 'Our team (Abhiraj Saha, Somesh Kumar Sahoo & Saudamini Roy) secured 2nd position at Codexify, a Hackathon event at URECKON 2026, University of Engineering & Management (UEM), Kolkata. Teamwork, late-night brainstorming, and strong execution made it happen.',
    icon: FiTarget,
    color: '#00BFA6',
  },
  {
    title: 'Project Competition — IEM Innovation Council',
    type: '1st Place',
    period: '4 Sep 2025',
    details: 'Awarded Certificate of Achievement for outstanding performance in the Project Competition held by the Department of CST, CSIT, CSE(CS), CSE(NW) in association with IEDC Lab, IEM Newtown, UEM Kolkata.',
    icon: FiStar,
    color: '#F43F5E',
  },
  {
    title: 'IEEE MTT-S SBC UEMK — SPARKTANK',
    type: '1st Place & Diamond Team Certificate',
    period: '26 Jul 2025',
    details: 'Received the Diamond Team Certificate of Appreciation for achievements in SPARKTANK, organised by IEEE MTT-S SBC UEMK in collaboration with the ECE Department, University of Engineering and Management, Kolkata.',
    icon: FiBookOpen,
    color: '#3B82F6',
  },
]

/* ── Certificate images with metadata ── */
const certificateCategories = [
  {
    heading: 'AI & Machine Learning',
    icon: FiTrendingUp,
    color: '#8B5CF6',
    items: [
      { name: 'Foundations of AI & ML — Microsoft', image: '/certificates/ai-ml-microsoft.jpg' },
      { name: 'Introduction to AI — IBM (Coursera)', image: '/certificates/ai-ibm-coursera.jpg' },
    ],
  },
  {
    heading: 'Cybersecurity & Tech',
    icon: FiStar,
    color: '#00BFA6',
    items: [
      { name: 'Cyber Security Certificate', image: '/certificates/cyber-security.jpg' },
      { name: '0xDay Cybersecurity Workshop', image: '/certificates/0xday.jpg' },
    ],
  },
  {
    heading: 'Academic Achievements',
    icon: FiAward,
    color: '#FFB703',
    items: [
      { name: 'Certificate of Achievement — IEM Innovation Council', image: '/certificates/cert-photo-1.jpg' },
      { name: 'IEEE Certificate of Appreciation — SPARKTANK', image: '/certificates/cert-photo-4.jpg' },
      { name: 'Himalayan Startup Trek — IIT Mandi Catalyst Finalist', image: '/certificates/himalayan-startup-trek.jpg' },
      { name: '2nd Place — Codexify Hackathon, URECKON 2026 | UEM Kolkata', image: '/certificates/ureckon-2026-cert.jpg' },
    ],
  },
]

function Certificates() {
  const [lightbox, setLightbox] = useState(null) // { image, name }

  return (
    <section id="achievements" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">Achievements</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Competitions, recognitions, and milestone outcomes in AI, IoT, and biotech.
          </p>
        </motion.div>

        {/* ── Competitions & Recognition ── */}
        <div className="mt-10">
          <motion.h3
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex items-center gap-2 font-heading text-xl font-semibold text-accentAmber"
          >
            <FiAward /> Competitions & Recognition
          </motion.h3>
          <div className="grid gap-5 md:grid-cols-2">
            {competitions.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/30 bg-white/60 p-6 shadow-card-light backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover-light dark:border-white/[0.08] dark:bg-white/[0.04] dark:shadow-card-dark dark:hover:shadow-card-hover-dark"
                >
                  <div
                    className="absolute inset-x-0 top-0 h-[3px]"
                    style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
                  />
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2"
                      style={{
                        borderColor: item.color,
                        backgroundColor: `${item.color}18`,
                        boxShadow: `0 0 12px ${item.color}30`,
                      }}
                    >
                      <Icon style={{ color: item.color }} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-heading text-lg font-semibold text-slate-900 dark:text-white">
                          {item.title}
                        </h4>
                        <span
                          className="rounded-full px-3 py-0.5 text-xs font-semibold"
                          style={{
                            color: item.color,
                            backgroundColor: `${item.color}15`,
                            border: `1px solid ${item.color}30`,
                          }}
                        >
                          {item.type}
                        </span>
                      </div>
                      <p
                        className="mt-0.5 text-xs font-semibold uppercase tracking-wider"
                        style={{ color: item.color }}
                      >
                        {item.period}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {item.details}
                      </p>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>

        {/* ── Certificate Categories with Images ── */}
        {certificateCategories.map((cat, catIndex) => {
          const CatIcon = cat.icon
          return (
            <div key={cat.heading} className="mt-12">
              <motion.h3
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-6 flex items-center gap-2 font-heading text-xl font-semibold"
                style={{ color: cat.color }}
              >
                <CatIcon /> {cat.heading}
              </motion.h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((cert, i) => (
                  <motion.div
                    key={`${cat.heading}-${i}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => setLightbox(cert)}
                    onKeyDown={(e) => e.key === 'Enter' && setLightbox(cert)}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: catIndex * 0.05 + i * 0.06 }}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/30 bg-white/60 shadow-card-light backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover-light dark:border-white/[0.08] dark:bg-white/[0.04] dark:shadow-card-dark dark:hover:shadow-card-hover-dark"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img
                        src={cert.image}
                        alt={cert.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        style={{ imageOrientation: 'from-image' }}
                        loading="lazy"
                      />
                      {/* Hover overlay */}
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                        <span className="scale-0 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-slate-900 shadow-lg transition-transform duration-300 group-hover:scale-100">
                          View Certificate
                        </span>
                      </div>
                    </div>
                    {/* Label */}
                    <div className="p-3">
                      <p className="text-left text-sm font-medium text-slate-700 dark:text-slate-200">
                        {cert.name}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {lightbox && (
          <LightboxModal lightbox={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Certificates
