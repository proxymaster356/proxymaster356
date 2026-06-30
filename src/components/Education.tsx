import { motion } from 'framer-motion'
import { FiBookOpen, FiCode } from 'react-icons/fi'

const educationItems = [
  {
    title: 'B.Tech in Biotechnology Engineering',
    institute: 'University of Engineering & Management, Kolkata',
    period: '2024 – Present',
    details: 'Current GPA: 8.67 | Focus: AI in biomedical and biosensing systems',
    icon: FiBookOpen,
    color: '#00BFA6',
    highlights: ['GPA 8.67', 'AI + Biotech Focus'],
  },
  {
    title: 'Research & Innovation Track',
    institute: 'Interdisciplinary Projects',
    period: 'Ongoing',
    details: 'Specialization in computer vision, IoT prototyping, and applied machine learning',
    icon: FiCode,
    color: '#8B5CF6',
    highlights: ['Computer Vision', 'IoT Prototyping', 'ML Applications'],
  },
]

function Education() {
  return (
    <section id="education" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">Education</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Academic foundation and specialization aligned with intelligent biotechnology systems.
          </p>
        </motion.div>

        {/* Animated vertical timeline */}
        <div className="relative mt-12">
          {/* Timeline trunk line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute left-6 top-0 hidden h-full w-[2px] origin-top bg-gradient-to-b from-accentTeal via-accentPurple to-accentAmber md:left-1/2 md:block"
            style={{ marginLeft: '-1px' }}
          />

          <div className="space-y-12">
            {educationItems.map((item, index) => {
              const Icon = item.icon
              const isLeft = index % 2 === 0
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative flex flex-col md:flex-row ${isLeft ? '' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline node dot */}
                  <div className="absolute left-6 top-6 z-20 hidden md:left-1/2 md:block" style={{ marginLeft: '-16px' }}>
                    <motion.div
                      whileInView={{ scale: [0, 1.3, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2"
                      style={{
                        borderColor: item.color,
                        backgroundColor: `${item.color}18`,
                        boxShadow: `0 0 16px ${item.color}40`,
                      }}
                    >
                      <Icon className="text-sm" style={{ color: item.color }} />
                    </motion.div>
                  </div>

                  {/* Spacer for the other half */}
                  <div className="hidden w-1/2 md:block" />

                  {/* Card */}
                  <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="group relative overflow-hidden rounded-2xl border border-white/30 bg-white/60 p-6 shadow-card-light backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover-light dark:border-white/[0.08] dark:bg-white/[0.04] dark:shadow-card-dark dark:hover:shadow-card-hover-dark">
                      {/* Accent top bar */}
                      <div
                        className="absolute inset-x-0 top-0 h-[3px]"
                        style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
                      />

                      {/* Mobile icon */}
                      <div className="mb-3 flex items-center gap-3 md:hidden">
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-full border-2"
                          style={{ borderColor: item.color, backgroundColor: `${item.color}18` }}
                        >
                          <Icon className="text-sm" style={{ color: item.color }} />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: item.color }}>
                          {item.period}
                        </span>
                      </div>

                      <div className="hidden items-center justify-between md:flex">
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: item.color }}>
                          {item.period}
                        </span>
                      </div>

                      <h3 className="mt-2 font-heading text-lg font-semibold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{item.institute}</p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.details}</p>

                      {/* Highlight pills */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.highlights.map((h) => (
                          <span
                            key={h}
                            className="rounded-full px-3 py-1 text-xs font-semibold"
                            style={{
                              color: item.color,
                              backgroundColor: `${item.color}15`,
                              border: `1px solid ${item.color}30`,
                            }}
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
