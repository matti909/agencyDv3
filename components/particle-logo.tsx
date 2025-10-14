"use client"

import { useRef, useMemo, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

export function ParticleLogo() {
  const particlesRef = useRef<THREE.Points>(null!)
  const particleCount = 15000
  const mousePosition = useRef({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const { viewport } = useThree()

  // Crear esfera densa y continua de partículas
  const { positions, colors, sizes, originalPositions } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const originalPositions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    const radius = 3.5

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      // Distribución uniforme en esfera (Fibonacci sphere)
      const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i

      // Radio fijo para esfera perfecta (planeta)
      const r = radius

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      positions[i3] = x
      positions[i3 + 1] = y
      positions[i3 + 2] = z

      originalPositions[i3] = x
      originalPositions[i3 + 1] = y
      originalPositions[i3 + 2] = z

      // Gradiente de colores basado en la posición
      const colorMix = (Math.sin(theta) + 1) / 2
      const colorMix2 = (Math.cos(phi) + 1) / 2

      // Mezcla entre azul, morado y rosa
      colors[i3] = 0.4 + colorMix * 0.5 // R
      colors[i3 + 1] = 0.3 + colorMix2 * 0.3 // G
      colors[i3 + 2] = 0.9 + colorMix * 0.1 // B

      sizes[i] = 0.03 + Math.random() * 0.04
    }

    return { positions, colors, sizes, originalPositions }
  }, [particleCount])

  // Material con shader personalizado
  const particleMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })
  }, [])

  // Seguimiento del mouse
  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.getElapsedTime()

      // Posición del mouse normalizada
      const targetX = (state.mouse.x * viewport.width) / 4
      const targetY = (state.mouse.y * viewport.height) / 4

      mousePosition.current.x += (targetX - mousePosition.current.x) * 0.05
      mousePosition.current.y += (targetY - mousePosition.current.y) * 0.05

      // Rotación base suave
      particlesRef.current.rotation.y = time * 0.08
      particlesRef.current.rotation.x = Math.sin(time * 0.2) * 0.15

      // Inclinar según mouse
      particlesRef.current.rotation.y += mousePosition.current.x * 0.3
      particlesRef.current.rotation.x += mousePosition.current.y * 0.3

      // Animación de partículas individuales
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3

        // Pulsación y onda
        const wave = Math.sin(time * 1.5 + i * 0.005) * 0.08
        const pulse = Math.sin(time * 2) * 0.05

        const distance = Math.sqrt(
          originalPositions[i3] ** 2 +
            originalPositions[i3 + 1] ** 2 +
            originalPositions[i3 + 2] ** 2,
        )

        const scale = 1 + pulse + wave

        positions[i3] = originalPositions[i3] * scale
        positions[i3 + 1] = originalPositions[i3 + 1] * scale
        positions[i3 + 2] = originalPositions[i3 + 2] * scale
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points
      ref={particlesRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <primitive object={particleMaterial} attach="material" />
    </points>
  )
}
