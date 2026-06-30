import { motion } from 'framer-motion'

const publications = [
  {
    title: 'Automated Bacterial Identification & Resistance Analysis',
    status: 'Data Collection & Modeling',
    summary: 'Early work on machine-learning-driven identification and interpretation from inhibition-zone datasets.',
  },
  {
    title: 'AI for Bioremediation Decision Support',
    status: 'Draft Stage',
    summary: 'Framework integrating explainable CNN outputs for actionable environmental remediation workflows.',
  },
  {
    title: 'Bioluminescence: Mechanisms, Applications & Future Directions',
    status: 'Draft Stage',
    summary: 'Exploring the biochemical basis of bioluminescence across species, with a focus on emerging applications in biosensing, medical imaging, and synthetic biology.',
  },
]

function Publications() {
  return (
    <section id="publications" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">Publications</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Current scholarly writing and manuscripts under development.</p>
        </motion.div>

        <div className="mt-8 space-y-4">
          {publications.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-heading text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <span className="rounded-full bg-accentAmber/15 px-3 py-1 text-xs font-semibold text-accentAmber">{item.status}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.summary}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Publications
