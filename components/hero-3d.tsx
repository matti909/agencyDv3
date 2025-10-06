"use client"

import { Canvas } from "@react-three/fiber"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { ParticleLogo } from "./particle-logo"

export function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" style={{ width: "100%", height: "100vh" }}>
      <Canvas
        camera={{ position: [4, 0, 12], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#6366f1" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
        <pointLight position={[0, 10, -10]} intensity={1.5} color="#ec4899" />
        <group position={[3, 0, 0]}>
          <ParticleLogo />
        </group>
        <EffectComposer>
          <Bloom
            intensity={2.0}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
