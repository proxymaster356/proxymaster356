import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiBookOpen, FiAward, FiTarget, FiX } from 'react-icons/fi'

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

/* ── Highlight events ── */
const events = [
  {
    title: 'IIT Mandi Innovation Participation',
    type: 'Finalist',
    details: 'Presented wearable AI navigation assistant with practical assistive use-case validation.',
  },
  {
    title: 'Technical Showcases & Hack Sessions',
    type: 'Participant',
    details: 'Demonstrated AI and IoT prototypes in collaborative innovation environments.',
  },
]

/* ── Certificate categories ── */
const certificateCategories = [
  {
    heading: 'Research & Publications',
    icon: FiBookOpen,
    color: '#FFB703',
    items: [
      { name: 'Poster Presentation', image: '/certificates/debmalya-publication.jpg' },
      { name: 'IRIS Photography Club Certificate', image: '/certificates/iris-certificate.jpg' },
    ],
  },
  {
    heading: 'Workshops & Volunteering',
    icon: FiAward,
    color: '#8B5CF6',
    items: [
      { name: 'Volunteer — Driveblaze Event', image: '/certificates/volunteer-driveblaze.png' },
      { name: 'Certificate of Volunteering', image: '/certificates/debopam-cert-1.jpg' },
      { name: 'Biospectrum Workshop', image: '/certificates/img5.jpg' },
    ],
  },
  {
    heading: 'Academic & Participation Certificates',
    icon: FiTarget,
    color: '#00BFA6',
    items: [
      { name: 'Certificate of Participation — Code to Cure, UEM Biotech', image: '/certificates/cert-photo-2.jpg' },
      { name: 'IEEE Certificate of Participation — SPARKTANK', image: '/certificates/cert-photo-3.jpg' },
      { name: 'HackSnippet 3.0 Hackathon — UEM Kolkata', image: '/certificates/2nd-sem-cert.png' },
      { name: 'UEMCOS 2024 — International Conference', image: '/certificates/40.jpg' },
      
    ],
  },
]

function Events() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <section id="events" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">Events & Certificates</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Competitions, showcases, workshops, and certifications earned along the journey.
          </p>
        </motion.div>

        {/* ── Highlight Events ── */}
        <div className="mt-8 space-y-4">
          {events.map((event, index) => (
            <motion.article
              key={event.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-heading text-lg font-semibold text-slate-900 dark:text-white">{event.title}</h3>
                <span className="rounded-full bg-accentTeal/15 px-3 py-1 text-xs font-semibold text-accentTeal">{event.type}</span>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{event.details}</p>
            </motion.article>
          ))}
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
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img
                        src={cert.image}
                        alt={cert.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        style={{ imageOrientation: 'from-image' }}
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                        <span className="scale-0 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-slate-900 shadow-lg transition-transform duration-300 group-hover:scale-100">
                          View Certificate
                        </span>
                      </div>
                    </div>
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

export default Events
