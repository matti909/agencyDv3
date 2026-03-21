"use client"

import { useEffect, useRef, useState } from "react"

type Star = {
  x: number
  y: number
  size: number
  depth: number
  alpha: number
  twinkle: number
}

type ShootingStar = {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  life: number
  maxLife: number
}

export function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [rocketMode, setRocketMode] = useState<"orbit" | "drift">("orbit")
  const [distanceMode, setDistanceMode] = useState<"near" | "mid" | "far">("mid")
  const [shootingStars, setShootingStars] = useState(6)
  const [keyboardControl, setKeyboardControl] = useState(false)
  const rocketModeRef = useRef(rocketMode)
  const distanceModeRef = useRef(distanceMode)
  const shootingStarsRef = useRef(shootingStars)
  const keyboardControlRef = useRef(keyboardControl)

  useEffect(() => {
    rocketModeRef.current = rocketMode
  }, [rocketMode])

  useEffect(() => {
    distanceModeRef.current = distanceMode
  }, [distanceMode])

  useEffect(() => {
    shootingStarsRef.current = shootingStars
  }, [shootingStars])

  useEffect(() => {
    keyboardControlRef.current = keyboardControl
  }, [keyboardControl])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    let width = 0
    let height = 0
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
    let animationFrame = 0
    let start = 0
    let stars: Star[] = []
    let meteors: ShootingStar[] = []
    let lastFrame = 0
    const pressedKeys = new Set<string>()
    let manualX = 0
    let manualY = 0
    let manualAngle = -0.45

    const rocket = new Image()
    rocket.src = "/logo_solo_cohete.png"

    const createStars = () => {
      const count = Math.max(240, Math.floor((width * height) / 6800))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.2,
        depth: Math.random() * 1 + 0.15,
        alpha: Math.random() * 0.7 + 0.12,
        twinkle: Math.random() * Math.PI * 2,
      }))
    }

    const createMeteor = (): ShootingStar => ({
      x: Math.random() * width * 1.1 - width * 0.05,
      y: Math.random() * height * 0.45,
      length: 70 + Math.random() * 90,
      speed: 280 + Math.random() * 240,
      angle: -0.9 + Math.random() * 0.16,
      life: 0,
      maxLife: 0.9 + Math.random() * 0.7,
    })

    const syncMeteors = () => {
      while (meteors.length < shootingStarsRef.current) {
        meteors.push(createMeteor())
      }
      if (meteors.length > shootingStarsRef.current) {
        meteors = meteors.slice(0, shootingStarsRef.current)
      }
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      createStars()
      syncMeteors()
      manualX = width * 0.7
      manualY = height * 0.42
    }

    const drawBackground = (time: number, delta: number) => {
      const base = context.createRadialGradient(
        width * 0.52,
        height * 0.18,
        10,
        width * 0.52,
        height * 0.28,
        Math.max(width, height) * 0.92,
      )
      base.addColorStop(0, "#ffffff")
      base.addColorStop(0.32, "#f5f7fb")
      base.addColorStop(0.7, "#eef2f6")
      base.addColorStop(1, "#e8edf3")
      context.fillStyle = base
      context.fillRect(0, 0, width, height)

      const nebulaTop = context.createRadialGradient(
        width * 0.55,
        height * 0.2,
        0,
        width * 0.55,
        height * 0.2,
        Math.max(width, height) * 0.34,
      )
      nebulaTop.addColorStop(0, "rgba(17, 24, 39, 0.08)")
      nebulaTop.addColorStop(0.45, "rgba(17, 24, 39, 0.03)")
      nebulaTop.addColorStop(1, "rgba(17, 24, 39, 0)")
      context.fillStyle = nebulaTop
      context.fillRect(0, 0, width, height)

      const nebulaBottom = context.createRadialGradient(
        width * 0.24,
        height * 0.78,
        0,
        width * 0.24,
        height * 0.78,
        Math.max(width, height) * 0.22,
      )
      nebulaBottom.addColorStop(0, "rgba(16, 185, 129, 0.06)")
      nebulaBottom.addColorStop(1, "rgba(16, 185, 129, 0)")
      context.fillStyle = nebulaBottom
      context.fillRect(0, 0, width, height)

      for (const star of stars) {
        const drift = 18
        const x = (star.x - time * drift * star.depth) % (width + 120)
        const y =
          (star.y + Math.sin(time * 0.3 + star.twinkle) * 8 * star.depth + height) %
          (height + 120)
        const currentX = x < -60 ? x + width + 120 : x
        const currentY = y < -60 ? y + height + 120 : y
        const twinkle = 0.62 + 0.38 * Math.sin(time * 1.7 + star.twinkle * 3.1)

        context.globalAlpha = star.alpha * twinkle
        context.fillStyle = "rgba(7, 10, 15, 0.92)"
        context.beginPath()
        context.arc(currentX, currentY, star.size, 0, Math.PI * 2)
        context.fill()

        if (star.size > 1.55) {
          context.strokeStyle = "rgba(17, 24, 39, 0.22)"
          context.lineWidth = 1
          context.beginPath()
          context.moveTo(currentX - 4, currentY)
          context.lineTo(currentX + 4, currentY)
          context.moveTo(currentX, currentY - 4)
          context.lineTo(currentX, currentY + 4)
          context.stroke()
        }
      }

      syncMeteors()
      for (let index = 0; index < meteors.length; index++) {
        const meteor = meteors[index]
        meteor.life += delta

        const velocityX = Math.cos(meteor.angle) * meteor.speed * delta
        const velocityY = Math.sin(meteor.angle) * meteor.speed * delta
        meteor.x += velocityX
        meteor.y += velocityY

        if (
          meteor.life > meteor.maxLife ||
          meteor.x > width + meteor.length ||
          meteor.y < -meteor.length ||
          meteor.y > height + meteor.length
        ) {
          meteors[index] = createMeteor()
          continue
        }

        const opacity = 1 - meteor.life / meteor.maxLife
        const tailX = meteor.x - Math.cos(meteor.angle) * meteor.length
        const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length
        const gradient = context.createLinearGradient(meteor.x, meteor.y, tailX, tailY)
        gradient.addColorStop(0, `rgba(16, 20, 28, ${0.85 * opacity})`)
        gradient.addColorStop(0.35, `rgba(16, 185, 129, ${0.34 * opacity})`)
        gradient.addColorStop(1, "rgba(16, 185, 129, 0)")

        context.save()
        context.strokeStyle = gradient
        context.lineWidth = 2.2
        context.lineCap = "round"
        context.beginPath()
        context.moveTo(meteor.x, meteor.y)
        context.lineTo(tailX, tailY)
        context.stroke()
        context.restore()
      }

      context.globalAlpha = 1
    }

    const drawRocket = (time: number) => {
      if (!rocket.complete || !rocket.naturalWidth) return

      const currentDistanceMode = distanceModeRef.current
      const currentRocketMode = rocketModeRef.current
      const currentKeyboardControl = keyboardControlRef.current

      const distanceScale =
        currentDistanceMode === "near" ? 0.00022 : currentDistanceMode === "far" ? 0.00012 : 0.00016
      const baseScale = Math.min(width, height) * distanceScale
      const imageWidth = rocket.naturalWidth * baseScale
      const imageHeight = rocket.naturalHeight * baseScale

      const orbitCenterX = width * 0.68
      const orbitCenterY = height * 0.44
      const orbitRadiusX =
        currentDistanceMode === "near" ? Math.min(width * 0.18, 220) : currentDistanceMode === "far" ? Math.min(width * 0.28, 320) : Math.min(width * 0.22, 260)
      const orbitRadiusY =
        currentDistanceMode === "near" ? Math.min(height * 0.14, 120) : currentDistanceMode === "far" ? Math.min(height * 0.22, 180) : Math.min(height * 0.18, 150)
      const orbitSpeed = currentRocketMode === "orbit" ? 0.42 : 0.22
      const phase = time * orbitSpeed

      let x = orbitCenterX + Math.cos(phase) * orbitRadiusX
      let y = orbitCenterY + Math.sin(phase * 1.35) * orbitRadiusY
      let nextX = orbitCenterX + Math.cos(phase + 0.01) * orbitRadiusX
      let nextY = orbitCenterY + Math.sin((phase + 0.01) * 1.35) * orbitRadiusY

      if (currentRocketMode === "drift") {
        x = width * 0.18 + ((time * 110) % (width * 0.9))
        y = height * 0.3 + Math.sin(time * 1.4) * Math.min(height * 0.12, 90)
        nextX = width * 0.18 + (((time + 0.01) * 110) % (width * 0.9))
        nextY = height * 0.3 + Math.sin((time + 0.01) * 1.4) * Math.min(height * 0.12, 90)
      }

      if (currentKeyboardControl) {
        const moveSpeed = 220
        const horizontal =
          (pressedKeys.has("ArrowRight") ? 1 : 0) - (pressedKeys.has("ArrowLeft") ? 1 : 0)
        const vertical =
          (pressedKeys.has("ArrowDown") ? 1 : 0) - (pressedKeys.has("ArrowUp") ? 1 : 0)

        manualX += horizontal * (1 / 60) * moveSpeed
        manualY += vertical * (1 / 60) * moveSpeed
        manualX = Math.max(width * 0.08, Math.min(width * 0.92, manualX))
        manualY = Math.max(height * 0.12, Math.min(height * 0.84, manualY))

        x = manualX
        y = manualY
        nextX = manualX + horizontal * 8
        nextY = manualY + vertical * 8

        if (horizontal !== 0 || vertical !== 0) {
          manualAngle = Math.atan2(nextY - y, nextX - x) + Math.PI / 2
        }
      }

      const angle =
        currentKeyboardControl ? manualAngle : Math.atan2(nextY - y, nextX - x) + Math.PI / 2

      context.save()
      context.translate(x, y)
      context.rotate(angle)
      context.globalCompositeOperation = "screen"

      const glow = context.createRadialGradient(0, imageHeight * 0.18, 0, 0, imageHeight * 0.18, imageWidth * 0.75)
      glow.addColorStop(0, "rgba(120, 177, 67, 0.42)")
      glow.addColorStop(0.5, "rgba(120, 177, 67, 0.18)")
      glow.addColorStop(1, "rgba(120, 177, 67, 0)")
      context.fillStyle = glow
      context.beginPath()
      context.ellipse(0, imageHeight * 0.04, imageWidth * 0.72, imageHeight * 0.6, 0, 0, Math.PI * 2)
      context.fill()
      context.restore()

      context.save()
      context.translate(x, y)
      context.rotate(angle)
      context.shadowColor = "rgba(120, 255, 120, 0.7)"
      context.shadowBlur = 20
      const flameLength =
        imageHeight *
        (currentKeyboardControl ? 0.34 : currentRocketMode === "orbit" ? 0.38 : 0.46) *
        (0.92 + Math.sin(time * 18) * 0.12)
      const flame = context.createLinearGradient(0, imageHeight * 0.12, 0, imageHeight * 0.12 + flameLength)
      flame.addColorStop(0, "rgba(210, 255, 170, 1)")
      flame.addColorStop(0.28, "rgba(168, 255, 120, 0.98)")
      flame.addColorStop(0.58, "rgba(120, 217, 67, 0.82)")
      flame.addColorStop(1, "rgba(120, 177, 67, 0)")
      context.fillStyle = flame
      context.beginPath()
      context.moveTo(-imageWidth * 0.11, imageHeight * 0.07)
      context.quadraticCurveTo(0, imageHeight * 0.18 + flameLength * 0.18, imageWidth * 0.11, imageHeight * 0.07)
      context.quadraticCurveTo(0, imageHeight * 0.03, -imageWidth * 0.11, imageHeight * 0.07)
      context.fill()

      const outerFlame = context.createLinearGradient(0, imageHeight * 0.14, 0, imageHeight * 0.14 + flameLength * 1.15)
      outerFlame.addColorStop(0, "rgba(120, 255, 120, 0.55)")
      outerFlame.addColorStop(0.55, "rgba(120, 177, 67, 0.28)")
      outerFlame.addColorStop(1, "rgba(120, 177, 67, 0)")
      context.fillStyle = outerFlame
      context.beginPath()
      context.moveTo(-imageWidth * 0.16, imageHeight * 0.1)
      context.quadraticCurveTo(0, imageHeight * 0.22 + flameLength * 0.38, imageWidth * 0.16, imageHeight * 0.1)
      context.quadraticCurveTo(0, imageHeight * 0.02, -imageWidth * 0.16, imageHeight * 0.1)
      context.fill()

      for (let index = 0; index < 12; index++) {
        const progress = (time * 2.5 + index / 12) % 1
        const particleY = imageHeight * 0.14 + progress * flameLength * 1.6
        const particleX = Math.sin(index * 2.1 + time * 7) * imageWidth * 0.035
        const radius = (1 - progress) * 7 + 2.5
        context.fillStyle = `rgba(170, 255, 140, ${0.82 * (1 - progress)})`
        context.beginPath()
        context.arc(particleX, particleY, radius, 0, Math.PI * 2)
        context.fill()
      }
      context.restore()

      context.save()
      context.translate(x, y)
      context.rotate(angle)
      context.shadowColor = "rgba(0, 0, 0, 0.45)"
      context.shadowBlur = 24
      context.drawImage(rocket, -imageWidth / 2, -imageHeight / 2, imageWidth, imageHeight)
      context.restore()
    }

    const render = (timestamp: number) => {
      if (!start) start = timestamp
      const delta = lastFrame ? Math.min((timestamp - lastFrame) / 1000, 0.033) : 1 / 60
      lastFrame = timestamp
      const time = (timestamp - start) / 1000
      drawBackground(time, delta)
      drawRocket(time)
      animationFrame = window.requestAnimationFrame(render)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.startsWith("Arrow")) {
        pressedKeys.add(event.key)
        if (keyboardControlRef.current) {
          event.preventDefault()
        }
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key.startsWith("Arrow")) {
        pressedKeys.delete(event.key)
      }
    }

    resize()
    rocket.onload = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(render)
      }
    }

    if (rocket.complete) {
      animationFrame = window.requestAnimationFrame(render)
    }

    window.addEventListener("resize", resize)
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", resize)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(17,24,39,0.03))]" />

      <div className="absolute right-4 top-24 z-20 w-[min(320px,calc(100%-2rem))] rounded-3xl border border-black/10 bg-white/72 p-4 text-foreground shadow-[0_20px_60px_-32px_rgba(15,23,42,0.35)] backdrop-blur-xl">
        <div className="mb-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/45">
            Controles
          </p>
        </div>

        <ControlGroup
          label="Cohete"
          options={[
            { key: "orbit", label: "Orbita", active: rocketMode === "orbit", onClick: () => setRocketMode("orbit") },
            { key: "drift", label: "Recorrido", active: rocketMode === "drift", onClick: () => setRocketMode("drift") },
          ]}
        />

        <ControlGroup
          label="Control"
          options={[
            { key: "auto", label: "Automatico", active: !keyboardControl, onClick: () => setKeyboardControl(false) },
            { key: "keys", label: "Flechas", active: keyboardControl, onClick: () => setKeyboardControl(true) },
          ]}
        />

        <ControlGroup
          label="Distancia"
          options={[
            { key: "near", label: "Cerca", active: distanceMode === "near", onClick: () => setDistanceMode("near") },
            { key: "mid", label: "Media", active: distanceMode === "mid", onClick: () => setDistanceMode("mid") },
            { key: "far", label: "Lejos", active: distanceMode === "far", onClick: () => setDistanceMode("far") },
          ]}
        />

        <div className="mb-3 last:mb-0">
          <p className="mb-2 text-sm font-medium text-foreground/70">Estrellas fugaces</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShootingStars((value) => Math.max(0, value - 1))}
              className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-sm font-medium text-foreground/75 transition-colors hover:border-emerald-500/20 hover:bg-emerald-500/8"
            >
              -
            </button>
            <div className="min-w-14 rounded-full border border-emerald-500/18 bg-emerald-500/8 px-3 py-1.5 text-center text-sm font-semibold text-foreground">
              {shootingStars}
            </div>
            <button
              type="button"
              onClick={() => setShootingStars((value) => Math.min(99, value + 1))}
              className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-sm font-medium text-foreground/75 transition-colors hover:border-emerald-500/20 hover:bg-emerald-500/8"
            >
              +
            </button>
          </div>
          {keyboardControl ? (
            <p className="mt-2 text-xs text-foreground/50">Usá las flechas del teclado para mover el cohete.</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function ControlGroup({
  label,
  options,
}: {
  label: string
  options: { key: string; label: string; active: boolean; onClick: () => void }[]
}) {
  return (
    <div className="mb-3 last:mb-0">
      <p className="mb-2 text-sm font-medium text-foreground/70">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={option.onClick}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
              option.active
                ? "border-emerald-500/35 bg-emerald-500 text-white shadow-[0_10px_24px_-18px_rgba(16,185,129,0.85)]"
                : "border-black/10 bg-white/70 text-foreground/75 hover:border-emerald-500/20 hover:bg-emerald-500/8"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
