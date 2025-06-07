"use client"

import { useState, useEffect } from "react"

interface AnimatedTitleProps {
  text: string
  isChanging: boolean
  isAnimating: boolean
}

export default function AnimatedTitle({ text, isChanging, isAnimating }: AnimatedTitleProps) {
  const [letters, setLetters] = useState<string[]>([])
  const [animationStates, setAnimationStates] = useState<string[]>([])

  // Initialize letters when text changes
  useEffect(() => {
    const newLetters = text.split("")
    setLetters(newLetters)

    // Initialize animation states
    if (isChanging) {
      // When changing, start with all letters flying in
      setAnimationStates(new Array(newLetters.length).fill("flying-in"))

      // Stagger the animations
      const delays = newLetters.map((_, i) => {
        return setTimeout(
          () => {
            setAnimationStates((prev) => {
              const newStates = [...prev]
              newStates[i] = "visible"
              return newStates
            })
          },
          50 + Math.random() * 150,
        ) // Random delay for mystical effect
      })

      return () => {
        delays.forEach((delay) => clearTimeout(delay))
      }
    } else {
      // When not changing, all letters are visible
      setAnimationStates(new Array(newLetters.length).fill("visible"))
    }
  }, [text, isChanging])

  // Add subtle continuous animation during the randomization
  useEffect(() => {
    if (isAnimating && !isChanging) {
      // Randomly animate letters during the randomization process
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * letters.length)

        setAnimationStates((prev) => {
          const newStates = [...prev]
          newStates[randomIndex] = "pulse"

          setTimeout(() => {
            setAnimationStates((prev) => {
              const newStates = [...prev]
              newStates[randomIndex] = "visible"
              return newStates
            })
          }, 300)

          return newStates
        })
      }, 200)

      return () => clearInterval(interval)
    }
  }, [isAnimating, isChanging, letters.length])

  return (
    <h3 className="font-bold text-xl text-white overflow-hidden relative">
      {letters.map((letter, index) => {
        const state = animationStates[index] || "visible"

        // Different animation classes based on state
        let className = "inline-block transition-all duration-300 "

        if (state === "flying-in") {
          // Random starting position for flying in
          const randomX = Math.random() * 100 - 50 + "px"
          const randomY = Math.random() * 100 - 50 + "px"

          className += "opacity-0 transform translate-y-8 translate-x-4 scale-150 text-pink-300"

          return (
            <span
              key={index}
              className={className}
              style={{
                animationDelay: `${index * 0.05}s`,
                textShadow: "0 0 8px rgba(236, 72, 153, 0.8)",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          )
        } else if (state === "pulse") {
          className += "text-pink-300 scale-110 transform"
        } else {
          className += "opacity-100 transform-none"
        }

        return (
          <span
            key={index}
            className={className}
            style={{
              textShadow: state === "pulse" ? "0 0 8px rgba(236, 72, 153, 0.8)" : "none",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        )
      })}
    </h3>
  )
}
