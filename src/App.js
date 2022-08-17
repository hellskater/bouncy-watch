import { useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export default function App() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
      <ambientLight intensity={0.1} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />
      <Card />
      <ContactShadows position={[0, -1.4, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />
      <Environment preset="city" />
    </Canvas>
  )
}

function Card(props) {
  const ref = useRef()
  const colorMap = useLoader(TextureLoader, '/nft1.jpg')

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.x = -Math.PI / 1.75 + Math.cos(t / 4) / 8
    ref.current.rotation.y = Math.sin(t / 4) / 8
    ref.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh castShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 0.1, 2]} />
        <meshStandardMaterial color="lightgray" map={colorMap} />
      </mesh>
    </group>
  )
}
