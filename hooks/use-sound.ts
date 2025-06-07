"use client"

import { useRef, useCallback } from 'react'

export type SoundType = 'timer-tick' | 'cosmic-chime' | 'position-change' | 'dramatic-reveal'

export const useSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null)

  // Initialize audio context
  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        
        // Resume audio context if it's suspended (required by browsers)
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume()
        }
      } catch (error) {
        console.warn('Audio not supported:', error)
        return null
      }
    } else if (audioContextRef.current.state === 'suspended') {
      // Resume if suspended
      audioContextRef.current.resume()
    }
    return audioContextRef.current
  }, [])

  // Create simple tone
  const createTone = useCallback((frequency: number, duration: number, volume: number = 0.1) => {
    const audioContext = initAudioContext()
    if (!audioContext) {
      console.warn('No audio context for tone creation')
      return
    }

    try {
      console.log(`Creating tone: ${frequency}Hz, ${duration}s, volume: ${volume}`)
      
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration)
      
      console.log('Tone created successfully')
    } catch (error) {
      console.error('Error creating tone:', error)
    }
  }, [initAudioContext])

  // Create cosmic chime (multiple frequencies)
  const createCosmicChime = useCallback(() => {
    const audioContext = initAudioContext()
    if (!audioContext) return

    try {
      // Create a harmonious chord with multiple frequencies
      const frequencies = [528, 432, 639, 741] // Healing frequencies
      const duration = 1.5
      
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime)
        oscillator.type = 'sine'
        
        const volume = 0.05 * (1 - index * 0.15) // Decreasing volume for harmony
        const delay = index * 0.1 // Slight delay for each note
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime + delay)
        gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + delay + 0.1)
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + delay + duration)
        
        oscillator.start(audioContext.currentTime + delay)
        oscillator.stop(audioContext.currentTime + delay + duration)
      })
    } catch (error) {
      console.warn('Error creating cosmic chime:', error)
    }
  }, [initAudioContext])

  // Play sound effect
  const playSound = useCallback((soundType: SoundType, volume: number = 0.5) => {
    try {
      const audioContext = initAudioContext()
      if (!audioContext) {
        console.warn('Audio context not available')
        return
      }
      
      console.log(`Playing sound: ${soundType}, AudioContext state: ${audioContext.state}`)

      switch (soundType) {
        case 'timer-tick':
          createTone(800, 0.1, 0.03) // Soft tick
          break
        case 'cosmic-chime':
          createCosmicChime()
          break
        case 'position-change':
          // Create a mystical bell sound
          createTone(1047, 0.3, 0.06) // C6
          setTimeout(() => createTone(1319, 0.4, 0.05), 100) // E6
          setTimeout(() => createTone(1568, 0.5, 0.04), 200) // G6
          break
        case 'dramatic-reveal':
          // Create an epic ascending reveal sound
          createTone(523, 0.2, 0.04) // C5
          setTimeout(() => createTone(659, 0.2, 0.05), 150) // E5
          setTimeout(() => createTone(784, 0.3, 0.06), 300) // G5
          setTimeout(() => createTone(1047, 0.4, 0.07), 450) // C6
          setTimeout(() => createTone(1319, 0.5, 0.08), 600) // E6
          setTimeout(() => {
            // Final triumphant chord
            createTone(1047, 0.8, 0.06) // C6
            createTone(1319, 0.8, 0.05) // E6
            createTone(1568, 0.8, 0.04) // G6
          }, 750)
          break
        default:
          console.warn('Unknown sound type:', soundType)
      }
    } catch (error) {
      console.warn('Error playing sound:', error)
    }
  }, [createTone, createCosmicChime])

  // Preload sounds (optional)
  const preloadSounds = useCallback(() => {
    // Initialize audio context on user interaction
    initAudioContext()
  }, [initAudioContext])

  return {
    playSound,
    preloadSounds
  }
} 