import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MouseFollower from './components/MouseFollower'
import ScrollProgress from './components/ScrollProgress'
import ParallaxShapes from './components/ParallaxShapes'
import PageTransition from './components/PageTransition'
import HomePage from './pages/HomePage'
import AchievementsPage from './pages/AchievementsPage'
import PostersPage from './pages/PostersPage'
import EventsPage from './pages/EventsPage'
import PhotographyPage from './pages/PhotographyPage'

function App() {
  const location = useLocation()
  const [activeSection, setActiveSection] = useState('home')
  const resolvedActiveSection = location.pathname === '/' ? activeSection : ''

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="relative overflow-x-hidden">
      <ScrollProgress />
      <MouseFollower />
      <ParallaxShapes />
      {/* Global ambient background mesh */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-mesh" />
      <Navbar activeSection={resolvedActiveSection} />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><HomePage setActiveSection={setActiveSection} /></PageTransition>} />
            <Route path="/achievements" element={<PageTransition><AchievementsPage /></PageTransition>} />
            <Route path="/posters" element={<PageTransition><PostersPage /></PageTransition>} />
            <Route path="/events" element={<PageTransition><EventsPage /></PageTransition>} />
            <Route path="/photography" element={<PageTransition><PhotographyPage /></PageTransition>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App
