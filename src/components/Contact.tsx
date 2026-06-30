import { motion } from 'framer-motion'
import { FiGithub, FiInstagram, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi'

const socials = [
  { label: 'GitHub', value: 'proxymaster356', link: 'https://github.com/proxymaster356', icon: FiGithub },
  { label: 'Instagram', value: 'dutta_debopam', link: 'https://instagram.com/dutta_debopam', icon: FiInstagram },
  { label: 'LinkedIn', value: 'Debopam Dutta', link: 'https://www.linkedin.com/in/debopam-dutta-bb220b323/', icon: FiLinkedin },
]

function Contact() {
  return (
    <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
        className="glass-card mx-auto grid max-w-6xl gap-8 rounded-3xl p-6 sm:p-8 lg:grid-cols-2"
      >
        <div>
          <h2 className="section-heading">Contact</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Let’s collaborate on intelligent systems in biotech and AI.</p>

          <div className="mt-6 space-y-4 text-sm">
            <a
              href="mailto:debopamdutta99@gmail.com"
              className="flex items-center gap-3 text-slate-700 transition-colors hover:text-accentTeal dark:text-slate-200"
            >
              <FiMail className="text-accentTeal" /> debopamdutta99@gmail.com
            </a>
            <a
              href="tel:+918116324958"
              className="flex items-center gap-3 text-slate-700 transition-colors hover:text-accentTeal dark:text-slate-200"
            >
              <FiPhone className="text-accentTeal" /> +91 8116324958
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {socials.map(({ label, value, link, icon: Icon }) => (
              <a
                key={label}
                href={link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-accentTeal/35 bg-accentTeal/10 px-4 py-2 text-sm font-medium text-accentTeal transition-transform hover:-translate-y-0.5"
              >
                <Icon />
                {value}
              </a>
            ))}
          </div>
        </div>

        <form
          action="mailto:debopamdutta99@gmail.com"
          method="post"
          encType="text/plain"
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full rounded-xl border border-white/30 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-accentTeal focus:ring-2 focus:ring-accentTeal/20 dark:border-white/10 dark:bg-white/[0.04]"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full rounded-xl border border-white/30 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-accentTeal focus:ring-2 focus:ring-accentTeal/20 dark:border-white/10 dark:bg-white/[0.04]"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
            className="w-full rounded-xl border border-white/30 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-accentTeal focus:ring-2 focus:ring-accentTeal/20 dark:border-white/10 dark:bg-white/[0.04]"
          />
          <button
            type="submit"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-accentTeal to-accentTeal/80 px-6 py-3 text-sm font-semibold text-white shadow-glow-teal transition-all hover:-translate-y-0.5"
          >
            <span className="relative z-10">Send Message</span>
          </button>
        </form>
      </motion.div>
    </section>
  )
}

export default Contact
