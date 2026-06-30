import { motion } from 'framer-motion'

const competencies = [
  { label: 'Team Collaboration', value: 95 },
  { label: 'Data Structures & Algorithms', value: 80 },
  { label: 'Communication', value: 80 },
  { label: 'Time Management', value: 75 },
]

function Ring({ label, value, index }) {
  const radius = 46
  const circumference = 2 * Math.PI * radius
  const progress = (value / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="flex flex-col items-center"
    >
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={radius} className="fill-none stroke-slate-300/20 dark:stroke-slate-700" strokeWidth="9" />
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            className="fill-none stroke-accentTeal"
            strokeWidth="9"
            strokeLinecap="round"
            initial={{ strokeDasharray: `0 ${circumference}` }}
            whileInView={{ strokeDasharray: `${progress} ${circumference}` }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: 'easeOut', delay: index * 0.1 }}
          />
        </svg>
        <span className="absolute inset-0 grid place-content-center text-2xl font-bold text-accentTeal">{value}%</span>
      </div>
      <p className="mt-3 text-center text-sm font-medium text-slate-700 dark:text-slate-200">{label}</p>
    </motion.div>
  )
}

function CoreCompetencies() {
  return (
    <section id="core-competencies" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="glass-card mx-auto max-w-6xl rounded-3xl p-6 sm:p-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-center section-heading mx-auto"
        >
          Core Competencies
        </motion.h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {competencies.map((item, index) => (
            <Ring key={item.label} label={item.label} value={item.value} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoreCompetencies
