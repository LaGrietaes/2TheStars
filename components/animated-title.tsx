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

    if (isChanging) {
      // Start with all letters in 'entering' state
      setAnimationStates(new Array(newLetters.length).fill("entering"))

      // Stagger the entrance animations
      newLetters.forEach((_, i) => {
        setTimeout(() => {
          setAnimationStates((prev) => {
            const newStates = [...prev]
            newStates[i] = "visible"
            return newStates
          })
        }, i * 80 + 50)
      })
    } else {
      // All letters visible immediately
      setAnimationStates(new Array(newLetters.length).fill("visible"))
    }
  }, [text, isChanging])

  // Subtle glow effect during selection
  useEffect(() => {
    if (isAnimating && !isChanging) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * letters.length)
        
        setAnimationStates((prev) => {
          const newStates = [...prev]
          newStates[randomIndex] = "glowing"

          setTimeout(() => {
            setAnimationStates((prev) => {
              const newStates = [...prev]
              newStates[randomIndex] = "visible"
              return newStates
            })
          }, 300)

          return newStates
        })
      }, 400)

      return () => clearInterval(interval)
    }
  }, [isAnimating, isChanging, letters.length])

  return (
    <h3 className="text-xl font-bold text-white leading-tight">
      {letters.map((letter, index) => {
        const state = animationStates[index] || "visible"
        
        let className = "inline-block transition-all duration-300 ease-out "
        let style: React.CSSProperties = {}

        switch (state) {
          case "entering":
            className += "opacity-0 transform translate-y-4 scale-110 text-pink-400"
            style = {
              textShadow: "0 0 12px rgba(236, 72, 153, 0.8)",
              transitionDelay: `${index * 50}ms`
            }
            break
            
          case "glowing":
            className += "text-yellow-300 scale-105 transform"
            style = {
              textShadow: "0 0 8px rgba(253, 224, 71, 0.9), 0 0 16px rgba(253, 224, 71, 0.5)"
            }
            break
            
          default: // visible
            className += "opacity-100 text-white transform-none"
            style = {
              textShadow: "0 0 4px rgba(255, 255, 255, 0.3)"
            }
        }

        return (
          <span
            key={`${text}-${index}`}
            className={className}
            style={style}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        )
      })}
    </h3>
  )
}
