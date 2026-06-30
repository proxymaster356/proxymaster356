import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'

const posters = [
  {
    title: 'Poster 2',
    event: 'Number 1',
    note: 'Poster showcase image.',
    image: 'number1.jpg',
  },
  {
    title: 'Poster 4',
    event: 'Physics Poster',
    note: 'Poster showcase image.',
    image: 'Physics_poster.png',
  },
]

const buildPosterPath = (filename) => `/photography/${encodeURIComponent(filename)}`

function PosterLightbox({ image, onClose }) {
  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(8px)', padding: '1rem' }}
    >
      <button
        type="button"
        onClick={onClose}
        style={{ position: 'absolute', top: '1rem', right: '1rem' }}
        className="rounded-full border border-white/30 bg-black/40 p-2 text-white"
        aria-label="Close preview"
      >
        <FiX className="text-lg" />
      </button>
      <motion.img
        initial={{ scale: 0.94, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0.7 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        src={image.src}
        alt={image.alt}
        className="max-h-[88vh] w-auto max-w-[92vw] rounded-xl border border-white/20 object-contain"
      />
    </motion.div>,
    document.body,
  )
}

function Posters() {
  const [previewImage, setPreviewImage] = useState(null)

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setPreviewImage(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <section id="posters" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">Posters</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Conference and project posters showcasing research and technical outcomes.</p>
        </motion.div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {posters.map((item) => (
            <article
              key={item.title}
              className="glass-card rounded-2xl p-6"
            >
              <div className="mb-4 overflow-hidden rounded-xl border border-slate-300/20 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setPreviewImage({ src: buildPosterPath(item.image), alt: item.event })}
                  className="block w-full"
                >
                  <img
                    src={buildPosterPath(item.image)}
                    alt={item.event}
                    loading="lazy"
                    className="h-56 w-full cursor-zoom-in object-cover"
                  />
                </button>
              </div>
              <h3 className="font-heading text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm font-medium text-accentAmber">{item.event}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.note}</p>
            </article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {previewImage && (
          <PosterLightbox image={previewImage} onClose={() => setPreviewImage(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Posters
