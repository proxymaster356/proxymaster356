import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import SkillMesh from './SkillMesh'

function Skills() {
  return (
    <section id="skills" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">Top Skills Network</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            An interactive 3D constellation of my core technical proficiencies. Larger nodes represent higher proficiency levels.
          </p>
        </motion.div>

        <div className="mt-12 relative flex h-[600px] w-full items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#070b19] shadow-2xl">
          {/* Subtle glow behind the network */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />
          </div>

          <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
              <Suspense fallback={null}>
                <SkillMesh />
              </Suspense>
            </Canvas>
          </div>
          
          <div className="pointer-events-none absolute bottom-6 right-6 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs text-white/60 backdrop-blur-md">
            <span>Drag to rotate</span>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Skills
