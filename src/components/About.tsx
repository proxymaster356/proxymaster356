import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const stats = ['GPA 8.67', '2nd Year B.Tech', 'Tech Enthusiast', ' Biotech Focused', 'AI & IoT Hobbyist', 'Photography Lover']

const funFacts = [
  { emoji: '🧬', text: 'Biotech meets AI' },
  { emoji: '🤖', text: 'Building intelligent systems' },
  { emoji: '📷', text: 'Photography enthusiast' },
  { emoji: '🔬', text: 'Lab + Code life' },
]

function About() {
  const cardRef = useRef(null)
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden mx-auto grid max-w-6xl gap-10 rounded-3xl border border-white/30 bg-white/60 p-6 shadow-card-light backdrop-blur-xl transition-all duration-300 dark:border-white/[0.08] dark:bg-white/[0.04] dark:shadow-card-dark sm:p-8 lg:grid-cols-[0.8fr_1.2fr]"
      >
        {/* Spotlight overlay */}
        <div
          className="pointer-events-none absolute -inset-px z-0 rounded-3xl opacity-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${spotlight.x}px ${spotlight.y}px, rgba(0,191,166,0.1), transparent 40%)`,
          }}
        />

        <div className="relative z-10 flex items-center justify-center">
          <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-accentTeal/40 shadow-glow-teal">
            <img
              src="/profile-1.jpeg"
              alt="Debopam Dutta"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="section-heading">About Me</h2>
          <p className="mt-5 leading-relaxed text-slate-600 dark:text-slate-300">
            I am a Biotechnology Engineering student at UEM Kolkata with a strong focus on building AI-powered,
            computer-vision-driven, and IoT-enabled biomedical systems. My research and project work revolves around
            intelligent assistive devices, biosensing pipelines, and applied machine learning for healthcare,
            agriculture, and biological data interpretation. I enjoy solving high-impact real-world problems by
            integrating biology, embedded systems, and modern AI.
          </p>

          {/* Stat pills */}
          <div className="mt-6 flex flex-wrap gap-3">
            {stats.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="rounded-full border border-accentTeal/30 bg-accentTeal/10 px-4 py-2 text-sm font-medium text-accentTeal"
              >
                {item}
              </motion.span>
            ))}
          </div>

          {/* Fun facts row */}
          <div className="mt-5 flex flex-wrap gap-4">
            {funFacts.map((fact, i) => (
              <motion.div
                key={fact.text}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
              >
                <span className="text-lg">{fact.emoji}</span>
                {fact.text}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default About
