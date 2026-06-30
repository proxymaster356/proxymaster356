import { motion } from 'framer-motion'

const researchTracks = [
  {
    title: 'Biomedical Computer Vision',
    points: ['Colony counting automation', 'Pattern detection in lab imaging', 'Model reliability in biological contexts'],
  },
  {
    title: 'Assistive AI & IoT Systems',
    points: ['Wearable navigation intelligence', 'Sensor fusion for real-time decisioning', 'Human-centered accessibility design'],
  },
  {
    title: 'Agri-Bio Intelligence',
    points: ['LLM-assisted farmer advisory', 'Real-time biosensor data use', 'Actionable recommendation pipelines'],
  },
]

function Research() {
  return (
    <section id="research" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">Research</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Active themes and ongoing exploration at the intersection of biotech and intelligent systems.</p>
        </motion.div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {researchTracks.map((track, index) => (
            <motion.article
              key={track.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="glass-card rounded-2xl p-5"
            >
              <h3 className="font-heading text-lg font-semibold text-accentTeal">{track.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {track.points.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Research
