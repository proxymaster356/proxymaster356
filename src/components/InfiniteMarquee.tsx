import { motion } from 'framer-motion'

/**
 * An infinitely scrolling horizontal marquee of keywords / tech stack.
 * Creates a dynamic, Apple-keynote-style visual divider between sections.
 * Renders two duplicate strips that loop seamlessly via CSS animation.
 */
const keywords = [
  'YOLOv8', 'Computer Vision', 'TensorFlow', 'PyTorch', 'Deep Learning',
  'LLMs', 'Arduino', 'Raspberry Pi', 'ESP32', 'Biosensors',
  'React.js', 'Python', 'OpenCV', 'NLP', 'Bioinformatics',
  'IoT', 'RFID', 'Machine Learning', 'CNN', 'Explainable AI',
  'Gemini API', 'MATLAB', 'Git', 'Ollama', 'Edge Computing',
]

function InfiniteMarquee() {
  return (
    <div className="relative overflow-hidden py-8">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-backgroundLight dark:from-backgroundDark" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-backgroundLight dark:from-backgroundDark" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex"
      >
        {/* Two identical strips for seamless loop */}
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="marquee-strip flex shrink-0 items-center gap-6"
            aria-hidden={copy === 1}
          >
            {keywords.map((word) => (
              <span
                key={`${copy}-${word}`}
                className="whitespace-nowrap rounded-full border border-accentTeal/20 bg-accentTeal/5 px-5 py-2 text-sm font-medium text-accentTeal/80 backdrop-blur-sm transition-colors hover:border-accentTeal/40 hover:bg-accentTeal/10 hover:text-accentTeal dark:border-accentTeal/15 dark:bg-accentTeal/[0.04]"
              >
                {word}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default InfiniteMarquee
