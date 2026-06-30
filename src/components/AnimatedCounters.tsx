import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiCode, FiCpu, FiLayers, FiStar, FiZap, FiTarget } from 'react-icons/fi'

/**
 * An animated stats section with counting numbers that tick up
 * when they scroll into view. Adds a data-driven "at a glance" feel.
 */
const stats = [
  { label: 'Projects Built', value: 8, suffix: '+', icon: FiCode, color: '#00BFA6' },
  { label: 'Research Papers', value: 3, suffix: '+', icon: FiLayers, color: '#8B5CF6' },
  { label: 'Tech Skills', value: 18, suffix: '+', icon: FiCpu, color: '#FFB703' },
  { label: 'Current GPA', value: 8.67, suffix: '', decimals: 2, icon: FiStar, color: '#00BFA6' },
  { label: 'IoT Prototypes', value: 4, suffix: '+', icon: FiZap, color: '#8B5CF6' },
  { label: 'Competitions', value: 5, suffix: '+', icon: FiTarget, color: '#FFB703' },
]

function CountUp({ end, decimals = 0, duration = 2000, started }) {
  const [count, setCount] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!started) return

    const startTime = performance.now()
    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * end)
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [end, duration, started])

  return <>{decimals > 0 ? count.toFixed(decimals) : Math.round(count)}</>
}

function AnimatedCounters() {
  const sectionRef = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-white/30 bg-white/60 p-6 text-center shadow-card-light backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover-light dark:border-white/[0.08] dark:bg-white/[0.04] dark:shadow-card-dark dark:hover:shadow-card-hover-dark"
              >
                {/* Background accent pulse */}
                <div
                  className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-25"
                  style={{ backgroundColor: stat.color }}
                />
                <Icon className="mx-auto mb-3 text-2xl" style={{ color: stat.color }} />
                <div className="font-heading text-4xl font-bold" style={{ color: stat.color }}>
                  <CountUp end={stat.value} decimals={stat.decimals || 0} started={started} />
                  {stat.suffix}
                </div>
                <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">{stat.label}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default AnimatedCounters
