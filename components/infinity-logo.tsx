"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function InfinityLogo() {
  const meshRef = useRef<THREE.Mesh>(null!)

  // Crear forma de infinito (lemniscata)
  const points = []
  const scale = 2
  for (let i = 0; i <= 200; i++) {
    const t = (i / 200) * Math.PI * 2
    const x = (scale * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t))
    const y = (scale * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t))
    points.push(new THREE.Vector3(x, y, 0))
  }

  const curve = new THREE.CatmullRomCurve3(points, true)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.2
    }
  })

  return (
    <mesh ref={meshRef}>
      <tubeGeometry args={[curve, 200, 0.15, 16, true]} />
      <meshStandardMaterial
        color="#3b82f6"
        emissive="#9333ea"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}
