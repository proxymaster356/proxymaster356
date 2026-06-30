import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Points, PointMaterial, Html, OrbitControls } from '@react-three/drei'

// Extracted Data
const projects = [
  { 
    title: 'Wearable AI Nav', 
    desc: 'Assistive wearable solution for contextual guidance and safer mobility using multimodal AI processing.',
    tech: ['YOLOv8', 'Ollama', 'Gemini API'],
    status: 'Completed',
    github: 'https://github.com/proxymaster356'
  },
  { 
    title: 'BioIntel', 
    desc: 'Agricultural intelligence system combining custom language models with live sensor streams for farmer recommendations.',
    tech: ['Custom-trained LLM', 'Sensor Integration'],
    status: 'Completed'
  },
  { 
    title: 'Dual-Factor Auth', 
    desc: 'Secure and automated attendance pipeline with hardware identity and face-based verification synced to cloud sheets.',
    tech: ['RFID', 'Face Recognition', 'Google Sheets'],
    status: 'Completed',
    github: 'https://github.com/proxymaster356'
  },
  { 
    title: 'Bacteria Counter', 
    desc: 'Computer vision-based colony quantification to improve speed and consistency in microbial analysis.',
    tech: ['Computer Vision', 'OpenCV'],
    status: 'Completed'
  },
  { 
    title: 'Auto Bacterial ID', 
    desc: 'Model-assisted bacterial classification and susceptibility interpretation using zone-of-inhibition data.',
    tech: ['Machine Learning', 'Zone of Inhibition Data'],
    status: 'In Progress'
  },
  { 
    title: 'EcoRemed AI', 
    desc: 'Explainable AI framework using deep convolutional models for bioremediation-focused environmental analysis.',
    tech: ['CNN', 'Deep Learning', 'Explainable AI'],
    status: 'In Progress'
  },
  {
    title: 'Design Thinking Arduino Project',
    desc: 'Led a team developing innovative Arduino solutions including automated plant watering and motion-controlled security.',
    tech: ['Arduino', 'Design Thinking', 'IoT'],
    status: 'In Progress'
  },
  {
    title: 'Electric Wheelchair Project',
    desc: 'Designed and built an electric wheelchair with joystick navigation, LED indicators, and emergency stop functionality.',
    tech: ['Electronics', 'Motor Control', 'Assistive Technology'],
    status: 'Completed'
  }
]

const skills = [
  { title: 'Languages & Frameworks', desc: 'Python, C, React, PyTorch', tech: ['92%', '80%'], status: 'Expert' },
  { title: 'AI & Machine Learning', desc: 'CV, YOLO, LLMs, NLP', tech: ['90%', '86%'], status: 'Expert' },
  { title: 'Hardware & IoT', desc: 'Arduino, ESP32, RFID, Raspberry Pi', tech: ['85%', '84%'], status: 'Advanced' },
  { title: 'Tools & DevOps', desc: 'Git, MATLAB, PyMOL', tech: ['85%', '90%'], status: 'Advanced' },
  { title: 'Soft Skills', desc: 'Problem-Solving, Fast Learning', tech: ['94%', '92%'], status: 'Expert' }
]

function HelixNode({ position, data, color, selected, onClick }: any) {
  const [hovered, setHovered] = useState(false)
  
  return (
    <group position={position}>
      <mesh 
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        scale={(hovered || selected) ? 1.5 : 1}
      >
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={(hovered || selected) ? 1 : 0.6} />
      </mesh>
      
      <Html distanceFactor={25} center zIndexRange={[100, 0]}>
        <div 
          className={`transition-all duration-500 rounded-xl border shadow-lg backdrop-blur-md cursor-pointer ${
            selected 
              ? 'w-80 bg-[#091024]/95 border-white/60 scale-110 opacity-100 z-50 p-6'
              : hovered 
                ? 'w-56 bg-[#091024]/85 border-white/40 scale-100 opacity-100 z-40 p-4' 
                : 'w-48 bg-[#091024]/40 border-white/10 scale-90 opacity-90 z-10 p-3 hover:scale-100'
          }`}
          onClick={(e) => {
             e.stopPropagation()
             if(!selected) onClick()
          }}
        >
          <h4 className={`font-heading font-bold drop-shadow-md ${selected ? 'text-2xl' : 'text-sm'}`} style={{ color }}>
            {data.title}
          </h4>
          
          <div className={`grid transition-all duration-500 overflow-hidden ${selected ? 'grid-rows-[1fr] mt-4 opacity-100' : (hovered ? 'grid-rows-[1fr] mt-2 opacity-100' : 'grid-rows-[0fr] opacity-0')}`}>
            <div className="min-h-0">
              <p className="text-sm text-white/90 leading-relaxed">{data.desc}</p>
              
              {selected && data.tech && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {data.tech.map((t: string) => (
                    <span key={t} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white border border-white/20">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              
              {selected && data.status && (
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className={`text-sm font-bold tracking-wide ${data.status === 'Completed' || data.status === 'Expert' ? 'text-green-400' : 'text-amber-400'}`}>
                    {data.status}
                  </span>
                  {data.github && (
                    <a href={data.github} target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                      View Code ↗
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Html>
    </group>
  )
}

export default function DNAParticles() {
  const ref = useRef<THREE.Group>(null!)
  const controlsRef = useRef<any>(null)
  const [selectedNode, setSelectedNode] = useState<THREE.Vector3 | null>(null)

  const { positionsArray, colorsArray } = useMemo(() => {
    const positions = []
    const colors = []
    const count = 3500
    
    const colorA = new THREE.Color('#00f0ff') 
    const colorB = new THREE.Color('#ff00ff') 

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 5 - (Math.PI * 2.5)
      const strand = i % 2 === 0 ? 0 : Math.PI 
      
      const radius = 4
      const heightScale = 3
      
      let x = Math.cos(t + strand) * radius
      let y = t * heightScale
      let z = Math.sin(t + strand) * radius

      if (Math.random() > 0.94) {
        const rungT = Math.random()
        x = Math.cos(t) * radius * rungT + Math.cos(t + Math.PI) * radius * (1 - rungT)
        z = Math.sin(t) * radius * rungT + Math.sin(t + Math.PI) * radius * (1 - rungT)
      } else {
        x += (Math.random() - 0.5) * 0.5
        y += (Math.random() - 0.5) * 0.5
        z += (Math.random() - 0.5) * 0.5
      }

      positions.push(x, y, z)

      const mixedColor = strand === 0 ? colorA : colorB
      colors.push(mixedColor.r, mixedColor.g, mixedColor.b)
    }

    return { 
      positionsArray: new Float32Array(positions), 
      colorsArray: new Float32Array(colors) 
    }
  }, [])

  const skillNodes = useMemo(() => {
    return skills.map((skill, index) => {
      const t = (index / (skills.length - 1)) * Math.PI * 3 - (Math.PI * 1.5)
      const radius = 4
      const heightScale = 3
      return {
        ...skill,
        position: new THREE.Vector3(Math.cos(t) * radius, t * heightScale, Math.sin(t) * radius)
      }
    })
  }, [])

  const projectNodes = useMemo(() => {
    return projects.map((proj, index) => {
      const t = (index / (projects.length - 1)) * Math.PI * 3 - (Math.PI * 1.5)
      const radius = 4
      const heightScale = 3
      return {
        ...proj,
        position: new THREE.Vector3(Math.cos(t + Math.PI) * radius, t * heightScale, Math.sin(t + Math.PI) * radius)
      }
    })
  }, [])

  useFrame((state, delta) => {
    if (ref.current && !selectedNode) {
      ref.current.rotation.y += delta * 0.25 
    }

    if (controlsRef.current) {
      if (selectedNode) {
        // Find world position of the selected node
        const worldPos = selectedNode.clone().applyMatrix4(ref.current.matrixWorld)
        
        controlsRef.current.target.lerp(worldPos, 0.05)
        
        // Calculate offset position for camera
        const direction = worldPos.clone().normalize() 
        const cameraTargetPos = worldPos.clone().add(direction.multiplyScalar(8)).add(new THREE.Vector3(0, 1, 0))
        
        state.camera.position.lerp(cameraTargetPos, 0.05)
      } else {
        controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.05)
        state.camera.position.lerp(new THREE.Vector3(0, 0, 15), 0.05)
      }
    }
  })

  return (
    <>
      <OrbitControls ref={controlsRef} enableZoom={false} enablePan={false} />
      
      <group ref={ref} position={[0, 0, 0]} onPointerMissed={() => setSelectedNode(null)}>
        <Points positions={positionsArray} colors={colorsArray}>
          <PointMaterial
            transparent
            vertexColors
            size={0.12}
            sizeAttenuation={true}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </Points>
        
        {skillNodes.map((node, i) => (
          <HelixNode 
            key={`skill-${i}`} 
            position={node.position.toArray()} 
            data={node} 
            color="#00f0ff" 
            selected={selectedNode === node.position}
            onClick={() => setSelectedNode(node.position)}
          />
        ))}
        
        {projectNodes.map((node, i) => (
          <HelixNode 
            key={`proj-${i}`} 
            position={node.position.toArray()} 
            data={node} 
            color="#ff00ff" 
            selected={selectedNode === node.position}
            onClick={() => setSelectedNode(node.position)}
          />
        ))}
      </group>
    </>
  )
}
