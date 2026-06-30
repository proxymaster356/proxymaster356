import { useRef, useState, Suspense } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiLock, FiX } from 'react-icons/fi'
import { Canvas } from '@react-three/fiber'
import DNAParticles from './DNAParticles'

const projects = [
  {
    title: 'Wearable AI Navigation Assistant',
    description:
      'Assistive wearable solution for contextual guidance and safer mobility using multimodal AI processing.',
    tech: ['YOLOv8', 'Ollama', 'Gemini API', 'TTS'],
    status: 'Completed',
    highlight: 'IIT Mandi Startup Trek Finalist',
  },
  {
    title: 'BioIntel',
    description:
      'Agricultural intelligence system combining custom language models with live sensor streams for farmer recommendations.',
    tech: ['Custom-trained LLM', 'Sensor Integration', 'Recommendation Engine'],
    status: 'Completed',
    highlight: 'Codexify winner',
  },
  {
    title: 'Dual-Factor Attendance System',
    description:
      'Secure and automated attendance pipeline with hardware identity and face-based verification synced to cloud sheets.',
    tech: ['RFID', 'Face Recognition', 'Google Sheets'],
    status: 'Completed',
    github: 'https://github.com/proxymaster356/smart-attendance-system',
  },
  {
    title: 'Bacteria Colony Counting System',
    description: 'Computer vision-based colony quantification to improve speed and consistency in microbial analysis.',
    tech: ['Computer Vision', 'OpenCV'],
    status: 'Completed',
  },
  {
    title: 'Automated Bacterial ID & Antibiotic Resistance Analyzer',
    description:
      'Model-assisted bacterial classification and susceptibility interpretation using zone-of-inhibition data.',
    tech: ['Machine Learning', 'Zone of Inhibition Data'],
    status: 'In Progress',
  },
  {
    title: 'EcoRemed AI',
    description:
      'Explainable AI framework using deep convolutional models for bioremediation-focused environmental analysis.',
    tech: ['CNN', 'Deep Learning', 'Explainable AI'],
    status: 'In Progress',
  },
]

/** Private / Public Repo Modal */
function RepoModal({ project, onClose }) {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 16 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative', width: '100%', maxWidth: '360px', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.97)', padding: '1.5rem', boxShadow: '0 25px 60px rgba(0,0,0,0.4)' }}
        className="dark:!bg-slate-900"
      >
        <button
          type="button"
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem' }}
          className="rounded-full p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white"
          aria-label="Close"
        >
          <FiX size={16} />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accentTeal/15">
            <FiLock className="text-accentTeal" size={18} />
          </div>
          <div>
            <p className="font-heading text-base font-semibold text-slate-900 dark:text-white">
              {project.github ? 'Public Repository' : 'Private Repository'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{project.title}</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {project.github
            ? 'This repository is publicly available on GitHub.'
            : 'This repository is currently private. The source code is not publicly accessible.'}
        </p>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center gap-2 rounded-xl border border-accentTeal/30 bg-accentTeal/10 px-4 py-2.5 text-sm font-medium text-accentTeal transition-colors hover:bg-accentTeal/20"
          >
            <FiGithub size={15} />
            View on GitHub
          </a>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full rounded-xl border border-slate-200/60 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
        >
          Close
        </button>
      </motion.div>
    </motion.div>,
    document.body,
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

/**
 * 3D TiltCard — follows mouse position for perspective tilt + spotlight.
 */
function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    setTilt({ rotateX, rotateY })
    setSpotlight({ x, y })
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setTilt({ rotateX: 0, rotateY: 0 }) }}
      animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      className={`group relative overflow-hidden rounded-2xl border border-white/30 bg-white/60 p-5 shadow-card-light backdrop-blur-xl transition-shadow duration-300 hover:shadow-card-hover-light dark:border-white/[0.08] dark:bg-white/[0.04] dark:shadow-card-dark dark:hover:shadow-card-hover-dark ${className}`}
    >
      {/* Spotlight radial gradient */}
      <div
        className="pointer-events-none absolute -inset-px z-0 rounded-2xl opacity-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(500px circle at ${spotlight.x}px ${spotlight.y}px, rgba(0,191,166,0.1), transparent 40%)`,
        }}
      />
      <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.article>
  )
}

function Projects() {
  const [repoModal, setRepoModal] = useState(null)

  return (
    <section id="projects" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto mb-10 max-w-6xl text-center">
        <h2 className="section-heading text-4xl">Skills & Projects</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          A unified 3D visualization of my core competencies and highlighted work.
        </p>
      </div>

      {/* 3D DNA Hero Section */}
      <div className="mx-auto relative flex h-[700px] w-full max-w-6xl overflow-hidden rounded-3xl bg-[#091024] shadow-2xl ring-1 ring-white/10">
        
        {/* Glow effect matching reference */}
        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-blue-500/30 blur-[100px]" />
        
        {/* 3D Canvas */}
        <div className="absolute inset-0 md:w-3/4">
          <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
            <Suspense fallback={null}>
              <DNAParticles />
            </Suspense>
          </Canvas>
        </div>

        {/* Overlay Text & Button (Right Side) */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-end justify-center pr-10 md:pr-32">
          <h2 className="text-3xl font-bold tracking-widest text-white/50 drop-shadow-md md:text-5xl uppercase">
            Interactive
          </h2>
          <h1 className="text-5xl font-bold tracking-widest text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] md:text-7xl mt-2">
            PORTFOLIO
          </h1>
          <p className="mt-4 max-w-sm text-right text-sm text-white/70">
            Explore my skills (cyan) and projects (magenta) by hovering over the glowing nodes on the DNA strands.
          </p>
          <button className="pointer-events-auto mt-8 rounded-[2rem] border-2 border-white/60 bg-transparent px-8 py-2 text-lg font-medium text-white transition-all hover:bg-white/10 hover:border-white hover:shadow-[0_0_20px_rgba(0,191,255,0.4)] backdrop-blur-md">
            View Details
          </button>
        </div>
      </div>

    </section>
  )
}

export default Projects
