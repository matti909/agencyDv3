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
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.55} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#111111" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#444444" />
        <pointLight position={[0, 10, -10]} intensity={0.8} color="#888888" />
        <group position={[3, 0, 0]}>
          <ParticleLogo />
        </group>
        <EffectComposer>
          <Bloom
            intensity={0.45}
            luminanceThreshold={0.4}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
