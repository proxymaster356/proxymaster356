import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Points, PointMaterial, Html, OrbitControls } from '@react-three/drei'

const topSkills = [
  { name: 'Problem-Solving', level: 94, desc: 'Breaking down complex biomedical & software challenges.' },
  { name: 'Python', level: 92, desc: 'Primary language for ML, scripting, and backend.' },
  { name: 'Computer Vision', level: 90, desc: 'YOLO, OpenCV for bacteria counting & navigation.' },
  { name: 'Google Colab', level: 90, desc: 'Cloud environment for heavy model training.' },
  { name: 'Communication', level: 88, desc: 'Clear documentation and team collaboration.' },
  { name: 'Deep Learning', level: 86, desc: 'CNNs, Explainable AI, PyTorch, TensorFlow.' },
  { name: 'Git', level: 85, desc: 'Version control and CI/CD pipelines.' },
  { name: 'TensorFlow', level: 84, desc: 'Building and deploying neural networks.' },
  { name: 'Arduino', level: 84, desc: 'Hardware prototyping and sensor integration.' },
  { name: 'React.js', level: 80, desc: 'Frontend development with Tailwind and 3D integration.' },
]

function SkillNode({ position, data, selected, onClick }: { position: [number, number, number], data: any, selected: boolean, onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  const baseScale = (data.level - 75) / 20 
  const currentScale = (hovered || selected) ? baseScale * 1.5 : baseScale

  return (
    <group position={position}>
      <mesh 
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        scale={currentScale}
      >
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color={selected ? "#ff00ff" : (hovered ? "#00f0ff" : "#00BFA6")} transparent opacity={(hovered || selected) ? 1 : 0.8} />
      </mesh>
      
      <mesh scale={currentScale * 1.5}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial color={selected ? "#ff00ff" : "#00f0ff"} transparent opacity={0.2} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      
      <Html distanceFactor={25} center zIndexRange={[100, 0]}>
        <div 
          className={`transition-all duration-500 rounded-xl border shadow-lg backdrop-blur-md cursor-pointer ${
            selected 
              ? 'w-72 bg-[#091024]/95 border-white/60 scale-110 opacity-100 z-50 p-6'
              : hovered 
                ? 'w-48 bg-[#091024]/85 border-white/40 scale-100 opacity-100 z-40 p-3' 
                : 'w-40 bg-[#091024]/40 border-white/10 scale-90 opacity-80 z-10 p-2 hover:scale-100'
          }`}
          onClick={(e) => {
             e.stopPropagation()
             if(!selected) onClick()
          }}
        >
          <p className={`font-heading font-bold ${selected ? 'text-xl' : 'text-sm'} text-white`}>{data.name}</p>
          
          <div className="mt-2 h-1.5 w-full rounded-full bg-white/20">
            <div className="h-full rounded-full bg-[#00f0ff] transition-all duration-1000" style={{ width: `${data.level}%` }} />
          </div>
          
          <div className="mt-1 flex justify-end">
            <p className="text-[11px] font-medium text-[#00f0ff]">{data.level}% Proficiency</p>
          </div>

          <div className={`grid transition-all duration-500 overflow-hidden ${selected ? 'grid-rows-[1fr] mt-3 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="min-h-0">
               <p className="text-sm text-white/80 leading-relaxed border-t border-white/10 pt-3 mt-1">
                 {data.desc}
               </p>
            </div>
          </div>
        </div>
      </Html>
    </group>
  )
}

export default function SkillMesh() {
  const groupRef = useRef<THREE.Group>(null!)
  const controlsRef = useRef<any>(null)
  const [selectedNode, setSelectedNode] = useState<THREE.Vector3 | null>(null)

  const { positionsArray, colorsArray, linePositions } = useMemo(() => {
    const bgNodeCount = 400
    const radius = 8
    
    const positions = []
    const colors = []
    const points: THREE.Vector3[] = []
    
    for (let i = 0; i < bgNodeCount; i++) {
      const u = Math.random()
      const v = Math.random()
      const theta = 2 * Math.PI * u
      const phi = Math.acos(2 * v - 1)
      const r = radius * (0.8 + Math.random() * 0.4)
      
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      
      points.push(new THREE.Vector3(x, y, z))
      positions.push(x, y, z)
      
      const color = new THREE.Color().setHSL(0.6, 0.5, 0.3 + Math.random() * 0.4)
      colors.push(color.r, color.g, color.b)
    }

    const lines = []
    const connectionDistance = 3.0
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < connectionDistance) {
          lines.push(points[i].x, points[i].y, points[i].z)
          lines.push(points[j].x, points[j].y, points[j].z)
        }
      }
    }

    return { 
      positionsArray: new Float32Array(positions), 
      colorsArray: new Float32Array(colors),
      linePositions: new Float32Array(lines)
    }
  }, [])

  const skillNodes = useMemo(() => {
    const radius = 9 
    return topSkills.map((skill, index) => {
      const phi = Math.acos(1 - 2 * (index + 0.5) / topSkills.length)
      const theta = Math.PI * (1 + Math.sqrt(5)) * index
      
      const x = radius * Math.cos(theta) * Math.sin(phi)
      const y = radius * Math.sin(theta) * Math.sin(phi)
      const z = radius * Math.cos(phi)
      
      return {
        ...skill,
        position: new THREE.Vector3(x, y, z)
      }
    })
  }, [])

  useFrame((state, delta) => {
    if (groupRef.current && !selectedNode) {
      groupRef.current.rotation.y += delta * 0.15
      groupRef.current.rotation.x += delta * 0.08
    }

    if (controlsRef.current) {
      if (selectedNode) {
        // Find world position of the selected node
        const worldPos = selectedNode.clone().applyMatrix4(groupRef.current.matrixWorld)
        
        controlsRef.current.target.lerp(worldPos, 0.05)
        
        // Calculate offset position for camera
        const direction = worldPos.clone().normalize() 
        const cameraTargetPos = worldPos.clone().add(direction.multiplyScalar(8)).add(new THREE.Vector3(0, 1, 0))
        
        state.camera.position.lerp(cameraTargetPos, 0.05)
      } else {
        controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.05)
        state.camera.position.lerp(new THREE.Vector3(0, 0, 20), 0.05)
      }
    }
  })

  return (
    <>
      <OrbitControls ref={controlsRef} enableZoom={false} enablePan={false} />

      <group ref={groupRef} onPointerMissed={() => setSelectedNode(null)}>
        <Points positions={positionsArray} colors={colorsArray}>
          <PointMaterial
            transparent
            vertexColors
            size={0.15}
            sizeAttenuation={true}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </Points>
        
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={linePositions.length / 3}
              array={linePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#00f0ff" transparent opacity={0.08} depthWrite={false} />
        </lineSegments>
        
        {skillNodes.map((node, i) => (
          <SkillNode 
            key={i} 
            position={node.position.toArray() as [number, number, number]} 
            data={node} 
            selected={selectedNode === node.position}
            onClick={() => setSelectedNode(node.position)}
          />
        ))}
      </group>
    </>
  )
}
