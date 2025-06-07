"use client"

import { useEffect, useRef } from "react"

export default function StarParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create stars
    const stars: Star[] = []
    const starCount = Math.floor((canvas.width * canvas.height) / 3000) // Adjust density

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.05 + 0.01,
        brightness: Math.random() * 0.5 + 0.5,
        color: getRandomStarColor(),
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleDirection: Math.random() > 0.5 ? 1 : -1,
      })
    }

    function getRandomStarColor() {
      const colors = [
        "255, 255, 255", // white
        "255, 240, 255", // slight pink tint
        "230, 230, 255", // slight blue tint
        "255, 255, 230", // slight yellow tint
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        // Update star brightness (twinkle effect)
        star.brightness += star.twinkleSpeed * star.twinkleDirection
        if (star.brightness > 1) {
          star.brightness = 1
          star.twinkleDirection = -1
        } else if (star.brightness < 0.3) {
          star.brightness = 0.3
          star.twinkleDirection = 1
        }

        // Move star
        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }

        // Draw star
        ctx.beginPath()
        ctx.fillStyle = `rgba(${star.color}, ${star.brightness})`
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-70" />
}

interface Star {
  x: number
  y: number
  size: number
  speed: number
  brightness: number
  color: string
  twinkleSpeed: number
  twinkleDirection: number
}
