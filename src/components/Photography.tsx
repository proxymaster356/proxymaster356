import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'

const photos = [
  'WhatsApp Image 2026-03-07 at 13.44.27.jpeg',
  'WhatsApp Image 2026-03-07 at 13.44.27 (1).jpeg',
  'WhatsApp Image 2026-03-07 at 13.44.28.jpeg',
  'WhatsApp Image 2026-03-07 at 13.44.28 (1).jpeg',
  'WhatsApp Image 2026-03-07 at 13.44.28 (2).jpeg',
  'WhatsApp Image 2026-03-07 at 13.44.45.jpeg',
  'WhatsApp Image 2026-03-07 at 13.45.52.jpeg',
  'WhatsApp Image 2026-03-07 at 13.47.04.jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.54.jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.54 (1).jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.55.jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.55 (1).jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.56.jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.56 (1).jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.57.jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.57 (1).jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.57 (2).jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.58.jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.58 (1).jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.58 (2).jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.59.jpeg',
  'WhatsApp Image 2026-03-07 at 14.15.59 (1).jpeg',
  'WhatsApp Image 2026-03-07 at 14.16.00.jpeg',
  'WhatsApp Image 2026-03-07 at 14.16.00 (1).jpeg',
  'WhatsApp Image 2026-03-07 at 14.16.00 (2).jpeg',
  'WhatsApp Image 2026-03-07 at 14.16.00 (3).jpeg',
  'WhatsApp Image 2026-03-07 at 14.16.01.jpeg',
  'WhatsApp Image 2026-03-07 at 14.16.01 (1).jpeg',
  'WhatsApp Image 2026-03-07 at 14.16.01 (2).jpeg',
  'WhatsApp Image 2026-03-07 at 14.16.02.jpeg',
  'WhatsApp Image 2026-03-07 at 14.16.02 (1).jpeg',
  'WhatsApp Image 2024-09-14 at 23.36.02_5fff57b3.jpg',
  'DSC_1528.JPG',
  'IMG_20210327_232547-EDIT.jpg',
  'IMG_20210905_213211.jpg',
  'IMG_20231024_121128.jpg',
  'IMG_20231025_141032.jpg',
  'IMG_20231026_132139.jpg',
  'IMG_20231028_103505.jpg',
  'IMG_20240814_225827.jpg',
  'SAVE_20201127_223702.jpg',
  'SAVE_20240807_201313.jpg',
]

const buildPhotoPath = (filename) => `/photography/${encodeURIComponent(filename)}`
const formatCaption = (filename) => filename.replace(/\.[^/.]+$/, '').replace(/[_-]+/g, ' ')

function PhotoLightbox({ image, onClose }) {
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

function Photography() {
  const [previewImage, setPreviewImage] = useState(null)

  return (
    <section id="photography" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">Photography</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">The only hobby that survived engineering, because clicking pictures is way easier than clicking the right answer.📸😂</p>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((file, index) => (
            <motion.div
              key={file}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="group glass-card overflow-hidden rounded-2xl p-3"
            >
              <div className="overflow-hidden rounded-xl">
                <button
                  type="button"
                  onClick={() => setPreviewImage({ src: buildPhotoPath(file), alt: formatCaption(file) })}
                  className="block w-full"
                >
                  <img
                    src={buildPhotoPath(file)}
                    alt={formatCaption(file)}
                    loading="lazy"
                    className="h-52 w-full cursor-zoom-in object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {previewImage && (
          <PhotoLightbox image={previewImage} onClose={() => setPreviewImage(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Photography
