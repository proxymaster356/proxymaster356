import { useEffect } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import AnimatedCounters from '../components/AnimatedCounters'
import InfiniteMarquee from '../components/InfiniteMarquee'
import Education from '../components/Education'
import Skills from '../components/Skills'
import CoreCompetencies from '../components/CoreCompetencies'
import Projects from '../components/Projects'
import Publications from '../components/Publications'
import Research from '../components/Research'
import Contact from '../components/Contact'

const sectionIds = ['home', 'about', 'education', 'skills', 'core-competencies', 'projects', 'publications', 'research', 'contact']

function HomePage({ setActiveSection }) {
  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: '-20% 0px -20% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => sections.forEach((section) => observer.unobserve(section))
  }, [setActiveSection])

  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash.replace('#', '')
      if (!hash) return
      const target = document.getElementById(hash)
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 30)
      }
    }

    handleHashScroll()
    window.addEventListener('hashchange', handleHashScroll)
    return () => window.removeEventListener('hashchange', handleHashScroll)
  }, [])

  return (
    <>
      <Hero />
      <InfiniteMarquee />
      <About />
      <AnimatedCounters />
      <Education />
      <Skills />
      <CoreCompetencies />
      <Projects />
      <Publications />
      <Research />
      <Contact />
    </>
  )
}

export default HomePage
