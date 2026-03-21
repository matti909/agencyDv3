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

type LeaderboardEntry = {
  name: string
  score: number
}

type GameMeteor = {
  x: number
  y: number
  radius: number
  speedX: number
  speedY: number
  rotation: number
  spin: number
  passed: boolean
}

type ExplosionParticle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
}

export function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [rocketMode, setRocketMode] = useState<"orbit" | "drift">("orbit")
  const [distanceMode, setDistanceMode] = useState<"near" | "mid" | "far">("mid")
  const [shootingStars, setShootingStars] = useState(6)
  const [keyboardControl, setKeyboardControl] = useState(false)
  const [gameActive, setGameActive] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [dodgedMeteors, setDodgedMeteors] = useState(0)
  const [playerScore, setPlayerScore] = useState(0)
  const [bestScores, setBestScores] = useState<LeaderboardEntry[]>([])
  const rocketModeRef = useRef(rocketMode)
  const distanceModeRef = useRef(distanceMode)
  const shootingStarsRef = useRef(shootingStars)
  const keyboardControlRef = useRef(keyboardControl)
  const gameActiveRef = useRef(gameActive)
  const gameOverRef = useRef(gameOver)
  const countdownRef = useRef<number | null>(null)
  const bestScoresRef = useRef(bestScores)
  const pendingGameStartRef = useRef(false)
  const isMobileRef = useRef(false)
  const dodgedMeteorsRef = useRef(0)
  const playerScoreRef = useRef(0)
  const leaderboardStorageKey = "agencydv3-space-scores"

  useEffect(() => {
    if (typeof window === "undefined") return

    const fallbackScores: LeaderboardEntry[] = [
      { name: "Nova", score: 480 },
      { name: "Orbit", score: 420 },
      { name: "Cometa", score: 360 },
      { name: "Nebula", score: 300 },
      { name: "Pulsar", score: 240 },
    ]

    try {
      const stored = window.localStorage.getItem(leaderboardStorageKey)
      if (!stored) {
        window.localStorage.setItem(leaderboardStorageKey, JSON.stringify(fallbackScores))
        setBestScores(fallbackScores)
        return
      }

      const parsed = JSON.parse(stored) as LeaderboardEntry[]
      if (Array.isArray(parsed) && parsed.length > 0) {
        setBestScores(parsed.slice(0, 5))
      } else {
        window.localStorage.setItem(leaderboardStorageKey, JSON.stringify(fallbackScores))
        setBestScores(fallbackScores)
      }
    } catch {
      setBestScores(fallbackScores)
    }
  }, [])

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
    gameActiveRef.current = gameActive
  }, [gameActive])

  useEffect(() => {
    gameOverRef.current = gameOver
  }, [gameOver])

  useEffect(() => {
    bestScoresRef.current = bestScores
  }, [bestScores])

  useEffect(() => {
    countdownRef.current = countdown
  }, [countdown])

  useEffect(() => {
    const syncMobile = () => {
      const mobile = window.innerWidth < 768
      isMobileRef.current = mobile
      setIsMobile(mobile)
      if (mobile) {
        setRocketMode("orbit")
        setKeyboardControl(false)
        setMenuOpen(false)
        setGameActive(false)
        setGameOver(false)
      }
    }

    syncMobile()
    window.addEventListener("resize", syncMobile)
    return () => window.removeEventListener("resize", syncMobile)
  }, [])

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
    let gameMeteors: GameMeteor[] = []
    let gameSpawnTimer = 0
    let survivalTime = 0
    let explosionParticles: ExplosionParticle[] = []

    const rocket = new Image()
    rocket.src = "/logo_solo_cohete.png"
    const gameRocket = new Image()
    if (!isMobileRef.current) {
      gameRocket.src = "/cohete_juego.png"
    }

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

    const createGameMeteor = (): GameMeteor => {
      const radius = 16 + Math.random() * 22

      return {
        x: width + radius + Math.random() * 180,
        y: height * 0.16 + Math.random() * (height * 0.62),
        radius,
        speedX: -(260 + Math.random() * 220),
        speedY: (Math.random() - 0.5) * 55,
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 2.2,
        passed: false,
      }
    }

    const startGameLoop = () => {
      gameMeteors = []
      gameSpawnTimer = 0
      survivalTime = 0
      gameActiveRef.current = true
      gameOverRef.current = false
      setHasPlayed(true)
      dodgedMeteorsRef.current = 0
      playerScoreRef.current = 0
      setDodgedMeteors(0)
      setPlayerScore(0)
      setGameOver(false)
      setGameActive(true)
      manualX = width * 0.18
      manualY = height * 0.52
      manualAngle = -0.2
    }

    const finishGame = () => {
      if (!gameActiveRef.current) return
      explosionParticles = Array.from({ length: 22 }, (_, index) => {
        const angle = (Math.PI * 2 * index) / 22
        const speed = 80 + Math.random() * 160
        return {
          x: manualX,
          y: manualY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 0.45 + Math.random() * 0.35,
          size: 2 + Math.random() * 4,
          color: index % 3 === 0 ? "#8bc53f" : index % 2 === 0 ? "#ffb36b" : "#ffffff",
        }
      })
      gameActiveRef.current = false
      gameOverRef.current = true
      setGameActive(false)
      setGameOver(true)

      const normalizedScores = [...bestScoresRef.current, { name: "Vos", score: playerScoreRef.current }]
        .sort((left, right) => right.score - left.score)
        .slice(0, 5)

      bestScoresRef.current = normalizedScores
      setBestScores(normalizedScores)

      try {
        window.localStorage.setItem(leaderboardStorageKey, JSON.stringify(normalizedScores))
      } catch {}
    }

    const drawGameMeteor = (meteor: GameMeteor) => {
      context.save()
      context.translate(meteor.x, meteor.y)
      context.rotate(meteor.rotation)

      const rockGradient = context.createRadialGradient(-meteor.radius * 0.2, -meteor.radius * 0.3, 2, 0, 0, meteor.radius)
      rockGradient.addColorStop(0, "rgba(60, 68, 78, 0.95)")
      rockGradient.addColorStop(0.65, "rgba(20, 24, 32, 0.94)")
      rockGradient.addColorStop(1, "rgba(5, 7, 10, 0.98)")
      context.fillStyle = rockGradient
      context.beginPath()
      context.moveTo(0, -meteor.radius)
      context.lineTo(meteor.radius * 0.9, -meteor.radius * 0.2)
      context.lineTo(meteor.radius * 0.78, meteor.radius * 0.82)
      context.lineTo(-meteor.radius * 0.1, meteor.radius)
      context.lineTo(-meteor.radius * 0.92, meteor.radius * 0.34)
      context.lineTo(-meteor.radius * 0.7, -meteor.radius * 0.7)
      context.closePath()
      context.fill()

      context.fillStyle = "rgba(255, 255, 255, 0.14)"
      context.beginPath()
      context.arc(-meteor.radius * 0.18, -meteor.radius * 0.24, meteor.radius * 0.16, 0, Math.PI * 2)
      context.fill()
      context.restore()
    }

    const drawGame = (delta: number) => {
      if (!gameActiveRef.current) return

      const moveSpeed = 280
      const horizontal =
        (pressedKeys.has("ArrowRight") ? 1 : 0) - (pressedKeys.has("ArrowLeft") ? 1 : 0)
      const vertical =
        (pressedKeys.has("ArrowDown") ? 1 : 0) - (pressedKeys.has("ArrowUp") ? 1 : 0)

      manualX += horizontal * moveSpeed * delta
      manualY += vertical * moveSpeed * delta
      manualX = Math.max(width * 0.06, Math.min(width * 0.94, manualX))
      manualY = Math.max(height * 0.12, Math.min(height * 0.86, manualY))

      if (horizontal !== 0 || vertical !== 0) {
        manualAngle = Math.atan2(vertical, horizontal) + Math.PI / 2
      }

      gameSpawnTimer += delta
      survivalTime += delta

      const spawnEvery = Math.max(0.22, 0.7 - Math.min(survivalTime * 0.015, 0.38))
      if (gameSpawnTimer >= spawnEvery) {
        gameSpawnTimer = 0
        gameMeteors.push(createGameMeteor())
      }

      for (let index = gameMeteors.length - 1; index >= 0; index--) {
        const meteor = gameMeteors[index]
        meteor.x += meteor.speedX * delta
        meteor.y += meteor.speedY * delta
        meteor.rotation += meteor.spin * delta

        drawGameMeteor(meteor)

        const distanceToRocket = Math.hypot(meteor.x - manualX, meteor.y - manualY)
        if (distanceToRocket < meteor.radius + 18) {
          finishGame()
          break
        }

        if (!meteor.passed && meteor.x + meteor.radius < manualX - 10) {
          meteor.passed = true
          dodgedMeteorsRef.current += 1
          const nextScore = dodgedMeteorsRef.current * 25 + Math.floor(survivalTime * 8)
          playerScoreRef.current = nextScore
          setDodgedMeteors(dodgedMeteorsRef.current)
          setPlayerScore(nextScore)
        }

        if (meteor.x < -meteor.radius * 2 || meteor.y > height + meteor.radius * 2) {
          gameMeteors.splice(index, 1)
        }
      }
    }

    const drawBackground = (time: number, delta: number) => {
      if (gameActiveRef.current || gameOverRef.current) {
        context.fillStyle = "#f8fafc"
        context.fillRect(0, 0, width, height)

        for (const star of stars) {
          const arcadeX = (star.x - time * (50 + star.depth * 90)) % (width + 40)
          const currentX = arcadeX < -20 ? arcadeX + width + 40 : arcadeX
          const currentY = star.y % height
          const color =
            star.size > 1.55
              ? "rgba(22, 28, 38, 0.92)"
              : star.depth > 0.7
                ? "rgba(72, 84, 205, 0.78)"
                : "rgba(8, 12, 18, 0.72)"

          context.fillStyle = color
          context.fillRect(currentX, currentY, star.size > 1.55 ? 2 : 1.2, star.size > 1.55 ? 2 : 1.2)
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
          gradient.addColorStop(0, `rgba(18,24,32,${0.92 * opacity})`)
          gradient.addColorStop(0.35, `rgba(120,177,67,${0.38 * opacity})`)
          gradient.addColorStop(1, "rgba(120,177,67,0)")

          context.save()
          context.strokeStyle = gradient
          context.lineWidth = 2
          context.lineCap = "round"
          context.beginPath()
          context.moveTo(meteor.x, meteor.y)
          context.lineTo(tailX, tailY)
          context.stroke()
          context.restore()
        }

        context.fillStyle = "rgba(15,23,42,0.14)"
        context.fillRect(0, height - 68, width, 2)
        return
      }

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
      const activeRocket = gameActiveRef.current || gameOverRef.current ? gameRocket : rocket
      if (!activeRocket.complete || !activeRocket.naturalWidth) return

      const currentDistanceMode = distanceModeRef.current
      const currentRocketMode = rocketModeRef.current
      const isGameMode = gameActiveRef.current || gameOverRef.current
      const currentKeyboardControl =
        (keyboardControlRef.current && !gameOverRef.current) || gameActiveRef.current

      const distanceScale =
        isGameMode
          ? 0.000095
          : currentDistanceMode === "near"
            ? 0.00022
            : currentDistanceMode === "far"
              ? 0.00012
              : 0.00016
      const baseScale = Math.min(width, height) * distanceScale
      const imageWidth = activeRocket.naturalWidth * baseScale
      const imageHeight = activeRocket.naturalHeight * baseScale

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
        const moveSpeed = gameActiveRef.current ? 280 : 220
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
          manualAngle =
            isGameMode
              ? Math.atan2(nextY - y, nextX - x)
              : Math.atan2(nextY - y, nextX - x) + Math.PI / 2
        }
      }

      const angle =
        isGameMode
          ? currentKeyboardControl
            ? manualAngle
            : 0
          : currentKeyboardControl
            ? manualAngle
            : Math.atan2(nextY - y, nextX - x) + Math.PI / 2

      context.save()
      context.translate(x, y)
      context.rotate(angle)
      context.globalCompositeOperation = "screen"

      const glow = isGameMode
        ? context.createRadialGradient(-imageWidth * 0.36, 0, 0, -imageWidth * 0.36, 0, imageWidth * 0.52)
        : context.createRadialGradient(0, imageHeight * 0.18, 0, 0, imageHeight * 0.18, imageWidth * 0.75)
      glow.addColorStop(0, "rgba(120, 177, 67, 0.42)")
      glow.addColorStop(0.5, "rgba(120, 177, 67, 0.18)")
      glow.addColorStop(1, "rgba(120, 177, 67, 0)")
      context.fillStyle = glow
      context.beginPath()
      if (isGameMode) {
        context.ellipse(-imageWidth * 0.34, 0, imageWidth * 0.42, imageHeight * 0.28, 0, 0, Math.PI * 2)
      } else {
        context.ellipse(0, imageHeight * 0.04, imageWidth * 0.72, imageHeight * 0.6, 0, 0, Math.PI * 2)
      }
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
      if (isGameMode) {
        const rearX = -imageWidth * 0.42
        const innerFlame = context.createLinearGradient(rearX, 0, rearX - flameLength, 0)
        innerFlame.addColorStop(0, "rgba(210, 255, 170, 1)")
        innerFlame.addColorStop(0.28, "rgba(168, 255, 120, 0.98)")
        innerFlame.addColorStop(0.58, "rgba(120, 217, 67, 0.82)")
        innerFlame.addColorStop(1, "rgba(120, 177, 67, 0)")
        context.fillStyle = innerFlame
        context.beginPath()
        context.moveTo(rearX, -imageHeight * 0.08)
        context.quadraticCurveTo(rearX - flameLength * 0.7, 0, rearX, imageHeight * 0.08)
        context.quadraticCurveTo(rearX + imageWidth * 0.02, 0, rearX, -imageHeight * 0.08)
        context.fill()

        const outerFlame = context.createLinearGradient(rearX, 0, rearX - flameLength * 1.12, 0)
        outerFlame.addColorStop(0, "rgba(120, 255, 120, 0.55)")
        outerFlame.addColorStop(0.55, "rgba(120, 177, 67, 0.28)")
        outerFlame.addColorStop(1, "rgba(120, 177, 67, 0)")
        context.fillStyle = outerFlame
        context.beginPath()
        context.moveTo(rearX, -imageHeight * 0.14)
        context.quadraticCurveTo(rearX - flameLength, 0, rearX, imageHeight * 0.14)
        context.quadraticCurveTo(rearX + imageWidth * 0.03, 0, rearX, -imageHeight * 0.14)
        context.fill()
      } else {
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
      }

      for (let index = 0; index < 12; index++) {
        const progress = (time * 2.5 + index / 12) % 1
        const particleY = isGameMode
          ? Math.sin(index * 1.4 + time * 7) * imageHeight * 0.04
          : imageHeight * 0.14 + progress * flameLength * 1.6
        const particleX = isGameMode
          ? -imageWidth * 0.42 - progress * flameLength * 0.92
          : Math.sin(index * 2.1 + time * 7) * imageWidth * 0.035
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
      context.drawImage(activeRocket, -imageWidth / 2, -imageHeight / 2, imageWidth, imageHeight)
      context.restore()
    }

    const drawExplosion = (delta: number) => {
      if (!gameOverRef.current || explosionParticles.length === 0) return

      for (let index = explosionParticles.length - 1; index >= 0; index--) {
        const particle = explosionParticles[index]
        particle.life += delta

        if (particle.life >= particle.maxLife) {
          explosionParticles.splice(index, 1)
          continue
        }

        particle.x += particle.vx * delta
        particle.y += particle.vy * delta
        particle.vx *= 0.97
        particle.vy *= 0.97

        const opacity = 1 - particle.life / particle.maxLife
        context.save()
        context.globalAlpha = opacity
        context.fillStyle = particle.color
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size * opacity, 0, Math.PI * 2)
        context.fill()
        context.restore()
      }
    }

    const drawGameHud = () => {
      if (!gameOverRef.current && countdownRef.current === null) return

      context.save()
      context.textAlign = "center"
      context.fillStyle = "rgba(14, 18, 24, 0.92)"

      if (countdownRef.current !== null) {
        context.font = "700 56px 'Courier New', monospace"
        context.fillText(String(countdownRef.current), width * 0.5, height * 0.2)
        context.font = "700 13px 'Courier New', monospace"
        context.fillText("MOVE LA NAVE CON LAS FLECHAS", width * 0.5, height * 0.245)
      } else if (gameOverRef.current) {
        context.font = "700 30px 'Courier New', monospace"
        context.fillText("GAME OVER", width * 0.5, height * 0.2)
        context.font = "700 12px 'Courier New', monospace"
        context.fillText("TOCA ENTER PARA REINTENTAR", width * 0.5, height * 0.24)
      }

      context.textAlign = "left"
      context.restore()
    }

    const render = (timestamp: number) => {
      if (pendingGameStartRef.current) {
        pendingGameStartRef.current = false
        startGameLoop()
      }

      if (!start) start = timestamp
      const delta = lastFrame ? Math.min((timestamp - lastFrame) / 1000, 0.033) : 1 / 60
      lastFrame = timestamp
      const time = (timestamp - start) / 1000
      drawBackground(time, delta)
      drawGame(delta)
      drawRocket(time)
      drawExplosion(delta)
      drawGameHud()
      animationFrame = window.requestAnimationFrame(render)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.startsWith("Arrow")) {
        pressedKeys.add(event.key)
        if (keyboardControlRef.current || gameActiveRef.current || countdownRef.current !== null) {
          event.preventDefault()
        }
      }

      if (event.key === "Enter" && gameOverRef.current) {
        startGameLoop()
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

  const handlePlayClick = () => {
    if (isMobile) return
    setKeyboardControl(true)
    setGameOver(false)
    setMenuOpen(false)
    setCountdown(3)

    window.setTimeout(() => setCountdown(2), 700)
    window.setTimeout(() => setCountdown(1), 1400)
    window.setTimeout(() => {
      setCountdown(null)
      pendingGameStartRef.current = true
    }, 2100)
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(17,24,39,0.03))]" />

      {!isMobile ? (
        <div className="absolute right-4 top-24 z-20 w-[min(320px,calc(100%-2rem))]">
        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          className="flex w-full items-center justify-between rounded-3xl border border-black/10 bg-white/80 px-4 py-3 text-left text-foreground shadow-[0_20px_60px_-32px_rgba(15,23,42,0.35)] backdrop-blur-xl"
        >
          <span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/45">
              Controles
            </span>
          </span>
          <span className="text-lg font-semibold text-foreground/60">{menuOpen ? "−" : "+"}</span>
        </button>

        {menuOpen ? (
          <div className="mt-3 rounded-3xl border border-black/10 bg-white/72 p-4 text-foreground shadow-[0_20px_60px_-32px_rgba(15,23,42,0.35)] backdrop-blur-xl">
            <ControlGroup
              label="Cohete"
              options={[
                { key: "orbit", label: "Orbita", active: rocketMode === "orbit", onClick: () => setRocketMode("orbit") },
                { key: "drift", label: "Recorrido", active: rocketMode === "drift", onClick: () => setRocketMode("drift") },
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
              <p className="mt-2 text-xs text-foreground/50">Al jugar, movés la nave con las flechas.</p>
            </div>

            <div className="mt-4 rounded-2xl border border-black/8 bg-white/55 p-3">
              <button
                type="button"
                onClick={handlePlayClick}
                className="w-full rounded-full border border-emerald-500/32 bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_16px_34px_-22px_rgba(16,185,129,0.95)] transition-transform hover:scale-[1.01]"
              >
                Jugar
              </button>

              {hasPlayed ? (
                <div className="mt-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">Top 5</p>
                    <p className="text-xs uppercase tracking-[0.22em] text-foreground/40">Score</p>
                  </div>
                  <div className="space-y-2">
                    {bestScores.map((entry, index) => (
                      <div
                        key={`${entry.name}-${index}`}
                        className="flex items-center justify-between rounded-full border border-black/6 bg-white/70 px-3 py-1.5 text-sm"
                      >
                        <span className="text-foreground/72">
                          {index + 1}. {entry.name}
                        </span>
                        <span className="font-semibold text-foreground">{entry.score}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 rounded-2xl border border-black/6 bg-white/62 px-3 py-2.5 text-sm text-foreground/72">
                    <div className="flex items-center justify-between">
                      <span>Meteoros esquivados</span>
                      <strong className="text-foreground">{dodgedMeteors}</strong>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span>Puntaje actual</span>
                      <strong className="text-foreground">{playerScore}</strong>
                    </div>
                    {gameOver ? (
                      <p className="mt-2 text-xs text-foreground/55">
                        Partida terminada. Tocá `Jugar` para intentar entrar al top 5.
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
        </div>
      ) : null}

      {!isMobile && (gameActive || gameOver) ? (
        <div className="absolute right-8 top-52 z-20 w-[min(360px,calc(100%-4rem))]">
          <div className="border-2 border-black/70 bg-white/92 px-4 py-4 font-mono shadow-[8px_8px_0_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-black/55">
              <span>Score</span>
              <span>8-bit</span>
            </div>

            <div className="mt-3 space-y-3">
              <div className="flex items-end justify-between border-b border-black/10 pb-2">
                <span className="text-sm text-black/70">Meteoros</span>
                <strong className="text-2xl font-bold tracking-[0.08em] text-black">{dodgedMeteors}</strong>
              </div>

              <div className="flex items-end justify-between border-b border-black/10 pb-2">
                <span className="text-sm text-black/70">1P</span>
                <strong className="text-2xl font-bold tracking-[0.08em] text-black">
                  {String(playerScore).padStart(6, "0")}
                </strong>
              </div>

              <div className="flex items-end justify-between">
                <span className="text-sm text-black/70">HI</span>
                <strong className="text-2xl font-bold tracking-[0.08em] text-black">
                  {String(bestScores[0]?.score ?? 0).padStart(6, "0")}
                </strong>
              </div>
            </div>
          </div>
        </div>
      ) : null}
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
