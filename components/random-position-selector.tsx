"use client"

import { useState, useEffect, useRef } from "react"
import { Sparkles, Play, Pause, Settings, Share2, MoreHorizontal, Globe, X, Heart, ExternalLink } from "lucide-react"
import AnimatedTitle from "./animated-title"
import ShareModal from "./share-modal"
import { useLanguage } from "@/contexts/language-context"
import { positions, getPositionById } from "@/lib/positions"
import { useSound } from "@/hooks/use-sound"

interface RandomPositionSelectorProps {
  selectedPositions: number[]
  onShowLanguageSelector?: () => void
}

export default function RandomPositionSelector({ selectedPositions, onShowLanguageSelector }: RandomPositionSelectorProps) {
  const { t } = useLanguage()
  const { playSound, preloadSounds } = useSound()
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0)
  const [displayPositionIndex, setDisplayPositionIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const [soundReady, setSoundReady] = useState(false)
  const [svgContent, setSvgContent] = useState<string | null>(null)
  const [animatingSvgContent, setAnimatingSvgContent] = useState<string | null>(null)
  const [textFade, setTextFade] = useState(false)
  const [titleChange, setTitleChange] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  // Auto mode states - changed to minutes
  const [isAutoMode, setIsAutoMode] = useState(false)
  const [autoInterval, setAutoInterval] = useState(5) // minutes
  const [timeRemaining, setTimeRemaining] = useState(0) // in seconds for countdown
  const [showMoreMenu, setShowMoreMenu] = useState(false)

  const autoTimerRef = useRef<NodeJS.Timeout | null>(null)
  const countdownRef = useRef<NodeJS.Timeout | null>(null)

  // Get available positions based on selection
  const availablePositions = selectedPositions.length > 0 ? selectedPositions : positions.map(p => p.id)

  // Get current position data
  const getCurrentPosition = (positionId: number) => {
    return getPositionById(positionId) || positions[0]
  }

  const currentPosition = getCurrentPosition(availablePositions[currentPositionIndex] || availablePositions[0])
  const displayPosition = getCurrentPosition(availablePositions[displayPositionIndex] || availablePositions[0])

  // Function to select a random position
  const selectRandomPosition = () => {
    if (isAnimating || availablePositions.length === 0) return

    setIsAnimating(true)



    // Pick the final position FIRST to avoid last-second switches
    const finalIndex = Math.floor(Math.random() * availablePositions.length)
    const finalPositionId = availablePositions[finalIndex]
    const finalPosition = getPositionById(finalPositionId)

    // Create animation cycles that gradually settle on the final position
    let count = 0
    const totalCycles = 12 // Reduced for faster animation
    const settlingCycles = 3 // Last few cycles will show the final position
    
    const interval = setInterval(() => {
      let targetIndex
      
      // For the last few cycles, always show the final position to let it "settle"
      if (count >= totalCycles - settlingCycles) {
        targetIndex = finalIndex
      } else {
        // Random positions for the initial cycles
        targetIndex = Math.floor(Math.random() * availablePositions.length)
      }
      
      const targetPositionId = availablePositions[targetIndex]
      const targetPosition = getPositionById(targetPositionId)

      if (targetPosition) {
        // Animate text with fade effect
        setTextFade(true)
        setTitleChange(true)

        setTimeout(() => {
          setDisplayPositionIndex(targetIndex)
          setTextFade(false)
          setTimeout(() => {
            setTitleChange(false)
          }, 100)
        }, 150)

        // Fetch and update the animating SVG
        fetchSvg(targetPosition.svgPath, true)
      }

      count++

      if (count >= totalCycles) {
        clearInterval(interval)

        // Now we know for sure the final position is already displayed and settled
        setCurrentPositionIndex(finalIndex)

        // Wait a moment to let the position "settle" visually
        setTimeout(() => {
          // Start the dramatic reveal sequence
          setIsRevealing(true)
          
          setTimeout(() => {
            // Play dramatic reveal sound
            playSound('dramatic-reveal')
            
            // Enhance the text reveal
        setTextFade(true)
        setTitleChange(true)

        setTimeout(() => {
          setTextFade(false)
          setTimeout(() => {
            setTitleChange(false)
              }, 200)
            }, 300)
            
            // Complete the reveal
            setTimeout(() => {
              setIsRevealing(false)
              setIsAnimating(false)
            }, 1200)
          }, 100)
        }, 500) // Settling pause
      }
    }, 250) // Slightly faster cycles
  }

  // Auto mode functions - updated for minutes
  const startAutoMode = () => {
    if (availablePositions.length === 0) return

    setIsAutoMode(true)
    setTimeRemaining(autoInterval * 60) // Convert minutes to seconds

    // Start countdown
    countdownRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          selectRandomPosition()
          return autoInterval * 60 // Reset to minutes * 60
        }
        

        
        return prev - 1
      })
    }, 1000)
  }

  const stopAutoMode = () => {
    setIsAutoMode(false)
    setTimeRemaining(0)
    if (countdownRef.current) {
      clearInterval(countdownRef.current)
      countdownRef.current = null
    }
  }

  // Initialize sound on component mount
  useEffect(() => {
    // Add click listener to initialize audio context on first user interaction
    const handleFirstInteraction = () => {
      console.log('Initializing audio context...')
      preloadSounds()
      setSoundReady(true)
      
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
    }
    
    document.addEventListener('click', handleFirstInteraction, { once: true })
    document.addEventListener('touchstart', handleFirstInteraction, { once: true })
    document.addEventListener('keydown', handleFirstInteraction, { once: true })
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
    }
  }, [preloadSounds])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current)
      if (countdownRef.current) clearInterval(countdownRef.current)
    }
  }, [])

  // Fetch SVG content
  const fetchSvg = async (path: string, isAnimating: boolean) => {
    try {
      const response = await fetch(path, {
        method: 'GET',
        headers: {
          'Content-Type': 'image/svg+xml',
        },
        cache: 'force-cache'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const svgText = await response.text()

      const processedSvg = svgText
        .replace(/<text[^>]*>.*?<\/text>/g, "")
        .replace(/fill="[^"]*"/g, 'fill="white"')
        .replace(/stroke="[^"]*"/g, 'stroke="white"')
        .replace(/<path(?![^>]*fill=)/g, '<path fill="white"')
        .replace(/<svg/, '<svg width="100%" height="100%"')

      if (isAnimating) {
        setAnimatingSvgContent(processedSvg)
      } else {
        setSvgContent(processedSvg)
      }
    } catch (error) {
      console.error("Error fetching SVG:", error, "Path:", path)
      
      // Fallback: Create a simple placeholder SVG
      const fallbackSvg = `
        <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="180" height="180" fill="none" stroke="white" stroke-width="2" rx="20"/>
          <circle cx="100" cy="80" r="15" fill="white" opacity="0.7"/>
          <circle cx="100" cy="120" r="15" fill="white" opacity="0.7"/>
          <path d="M70 150 Q100 170 130 150" stroke="white" stroke-width="3" fill="none" opacity="0.7"/>
          <text x="100" y="190" text-anchor="middle" fill="white" font-size="12" opacity="0.6">Loading...</text>
        </svg>
      `
      
      if (isAnimating) {
        setAnimatingSvgContent(fallbackSvg)
      } else {
        setSvgContent(fallbackSvg)
      }
    }
  }

  useEffect(() => {
    if (currentPosition) {
      fetchSvg(currentPosition.svgPath, false)
    }
  }, [currentPosition])

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (availablePositions.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-center max-w-sm bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.08] p-8">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-7 h-7 text-white/70" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">No Positions Selected</h3>
          <p className="text-white/60 leading-relaxed">Choose positions from the library to begin exploring new experiences together.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden">

      {/* Main Artwork - Better Proportions & Larger Art */}
      <div className="flex-1 flex items-center justify-center px-2 py-4">
        <div className={`relative w-full max-w-sm transition-transform duration-200 ${isRevealing ? 'animate-pulse' : ''}`} style={{ aspectRatio: '3/4' }}>



          <div className={`absolute inset-0 bg-white/[0.05] rounded-[28px] overflow-hidden shadow-2xl backdrop-blur-md transition-all duration-300 ${
            isRevealing 
              ? 'shadow-yellow-400/20' 
              : ''
          }`}>
            {/* Timer Display - Inside Card at Top */}
            {isAutoMode && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-md border border-purple-400/40 rounded-full px-3 py-1.5 animate-pulse">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" />
                    <span className="text-xs font-mono text-purple-100 font-medium">
                      {formatTime(timeRemaining)}
                    </span>
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                  </div>
                </div>
              </div>
            )}
            
            {/* Subtle background for better star visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-black/20" />
            
            {/* Artwork Container - Enhanced with Reveal Animation */}
            <div className="absolute inset-2 flex items-center justify-center">
              {(isAnimating ? animatingSvgContent : svgContent) ? (
                <div
                  className={`w-full h-full transition-all ease-out ${
                    isRevealing 
                      ? "scale-110 opacity-100 duration-1000" 
                      : isAnimating 
                        ? "scale-95 opacity-60 duration-500" 
                        : "scale-100 opacity-100 duration-500"
                  }`}
                  style={{
                    filter: isRevealing
                      ? 'drop-shadow(0 0 24px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 12px rgba(236, 72, 153, 0.4))'
                      : isAnimating 
                      ? 'drop-shadow(0 0 16px rgba(236, 72, 153, 0.4))' 
                        : 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.2))',
                    transform: isRevealing ? 'translateZ(0) scale(1.05)' : undefined
                  }}
                  dangerouslySetInnerHTML={{
                    __html: (isAnimating ? animatingSvgContent : svgContent) || "",
                  }}
                />
              ) : (
                <div className="w-full h-full bg-white/[0.05] rounded-2xl animate-pulse border border-white/[0.08]" />
              )}
            </div>

            {/* Enhanced Cosmic Selection & Reveal Animation */}
            {(isAnimating || isRevealing) && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Cosmic sparkles - Enhanced for reveal */}
                <div className={`absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full ${isRevealing ? 'animate-bounce' : 'animate-ping'} opacity-80`} />
                <div className={`absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full ${isRevealing ? 'animate-bounce' : 'animate-ping'} opacity-70`} style={{ animationDelay: '0.3s' }} />
                <div className={`absolute bottom-1/3 left-1/3 w-2 h-2 bg-purple-400 rounded-full ${isRevealing ? 'animate-bounce' : 'animate-ping'} opacity-75`} style={{ animationDelay: '0.6s' }} />
                <div className={`absolute top-1/2 left-1/6 w-1 h-1 bg-blue-400 rounded-full ${isRevealing ? 'animate-bounce' : 'animate-ping'} opacity-90`} style={{ animationDelay: '0.1s' }} />
                <div className={`absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-green-400 rounded-full ${isRevealing ? 'animate-bounce' : 'animate-ping'} opacity-60`} style={{ animationDelay: '0.4s' }} />
                <div className={`absolute top-3/4 right-1/6 w-1 h-1 bg-indigo-400 rounded-full ${isRevealing ? 'animate-bounce' : 'animate-ping'} opacity-85`} style={{ animationDelay: '0.7s' }} />
                
                {/* Reveal-specific sparkles */}
                {isRevealing && (
                  <>
                    <div className="absolute top-1/6 left-1/2 w-3 h-3 bg-amber-400 rounded-full animate-ping opacity-90" style={{ animationDelay: '0.2s' }} />
                    <div className="absolute bottom-1/6 right-1/2 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping opacity-80" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute top-1/2 right-1/8 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '0.8s' }} />
                    <div className="absolute bottom-1/2 left-1/8 w-2 h-2 bg-rose-400 rounded-full animate-ping opacity-85" style={{ animationDelay: '1s' }} />
                  </>
                )}
                
                {/* Rotating energy ring - Enhanced for reveal */}
                <div className={`absolute inset-6 border border-white/20 rounded-full animate-spin ${isRevealing ? 'opacity-70 border-2' : 'opacity-40'}`} style={{ animationDuration: isRevealing ? '2s' : '3s' }} />
                <div className={`absolute inset-12 border border-purple-400/30 rounded-full animate-spin ${isRevealing ? 'opacity-80 border-2' : 'opacity-60'}`} style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
                
                {/* Golden reveal ring */}
                {isRevealing && (
                  <div className="absolute inset-3 border-2 border-yellow-400/50 rounded-full animate-pulse opacity-70" />
                )}
                
                {/* Pulsing glow effect - Enhanced for reveal */}
                <div className={`absolute inset-0 rounded-[24px] animate-pulse ${
                  isRevealing 
                    ? 'bg-gradient-to-r from-yellow-500/20 via-amber-500/15 to-orange-500/20' 
                    : 'bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-yellow-500/10'
                }`} />
                
                {/* Burst effect during reveal */}
                {isRevealing && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" style={{ animationDuration: '0.8s' }} />
                )}
              </div>
            )}

            {/* Share Button - Cleaner */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setShowShareModal(true)}
                className="p-2.5 bg-black/30 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-black/50 transition-all duration-300 shadow-lg"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Better Position Info Overlay */}
            <div className="absolute inset-x-0 bottom-0">
              <div className="bg-gradient-to-t from-black/80 via-black/30 to-transparent px-4 pt-6 pb-4">
                <div className={`transition-all duration-300 ease-out ${textFade ? "opacity-30 transform translate-y-1" : "opacity-100"}`}>
                  <AnimatedTitle
                    text={displayPosition.name}
                    isAnimating={titleChange}
                    isChanging={titleChange}
                  />
                  {displayPosition.category && (
                    <div className="inline-flex items-center px-2 py-0.5 bg-white/20 backdrop-blur-md rounded-full mt-2">
                      <span className="text-xs font-medium text-white/90 tracking-wide uppercase">
                        {displayPosition.category}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Actions - Compact and responsive */}
      <div className="flex-shrink-0 space-y-2 pt-2">
        {/* Main Action */}
        <button
          onClick={selectRandomPosition}
          disabled={isAnimating}
          className={`w-full h-12 rounded-2xl font-semibold transition-all duration-300 ease-out relative ${
            isAnimating
              ? "bg-gray-800/50 text-gray-400 cursor-not-allowed"
              : "button-primary active:scale-[0.98]"
          }`}
        >

          
          {isAnimating ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-gray-500 border-t-gray-300 rounded-full animate-spin mr-2" />
              <span className="text-body">Selecting...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Sparkles className="w-5 h-5 mr-2" />
              <span className="text-body">New Position</span>
            </div>
          )}
        </button>

        {/* Secondary actions row */}
        <div className="flex gap-2">
          {/* Auto Mode Toggle */}
          <button
            onClick={isAutoMode ? stopAutoMode : startAutoMode}
            className={`flex-1 h-10 rounded-xl font-medium transition-all duration-300 ease-out ${
              isAutoMode
                ? "bg-purple-600 hover:bg-purple-700 text-white shadow-md active:scale-[0.98] border border-purple-500/50"
                : "button-secondary active:scale-[0.98]"
            }`}
          >
            {isAutoMode ? (
              <div className="flex items-center justify-center">
                <Pause className="w-4 h-4 mr-2" />
                <span className="text-caption">Stop</span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Play className="w-4 h-4 mr-2" />
                <span className="text-caption">Auto ({autoInterval}m)</span>
              </div>
            )}
          </button>

          {/* Options Button */}
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className="px-4 h-10 button-secondary rounded-xl"
          >
            <div className="flex items-center">
              <MoreHorizontal className="w-4 h-4 mr-2" />
              <span className="text-caption font-medium">Options</span>
            </div>
          </button>
        </div>
      </div>

      {/* Options Modal - Modern & Space-Efficient */}
      {showMoreMenu && (
        <div 
          className="fixed inset-0 modal-backdrop z-50 animate-fadeIn"
          onClick={() => setShowMoreMenu(false)}
        >
          <div 
            className="h-full flex flex-col justify-end sm:justify-center sm:items-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-md bg-glass border border-white/20 rounded-3xl overflow-hidden animate-slide-up card-elevated">
              
              {/* Header - Compact & Branded */}
              <div className="flex items-center justify-between p-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
                    <Settings className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-headline text-white">Options</h3>
                </div>
                <button
                  onClick={() => setShowMoreMenu(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/70 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content - Dense but breathable layout */}
              <div className="p-6 space-y-6">
                
                {/* Quick Actions - Horizontal layout for space efficiency */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setShowMoreMenu(false)
                      onShowLanguageSelector?.()
                    }}
                    className="button-secondary flex items-center gap-3 p-4 rounded-2xl h-auto"
                  >
                    <div className="w-10 h-10 bg-brand-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Globe className="w-5 h-5 text-brand-primary" />
                    </div>
                    <div className="text-left">
                      <div className="text-caption text-white font-medium">Language</div>
                      <div className="text-micro text-white/60">Change app language</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowMoreMenu(false)
                      setShowShareModal(true)
                    }}
                    className="button-secondary flex items-center gap-3 p-4 rounded-2xl h-auto"
                  >
                    <div className="w-10 h-10 bg-brand-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Share2 className="w-5 h-5 text-brand-secondary" />
                    </div>
                    <div className="text-left">
                      <div className="text-caption text-white font-medium">Share</div>
                      <div className="text-micro text-white/60">Share current position</div>
                    </div>
                  </button>
                </div>



                {/* Auto Duration - Compact grid */}
                <div className="space-y-3">
                  <div>
                    <h4 className="text-body text-white font-medium mb-1">Auto Session Duration</h4>
                    <p className="text-micro text-white/60">How long between position changes in auto mode</p>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-2">
                    {[2, 5, 10, 15, 30].map((minutes) => (
                      <button
                        key={minutes}
                        onClick={() => {
                          setAutoInterval(minutes)
                          // Subtle haptic feedback on mobile
                          if (navigator?.vibrate) {
                            navigator.vibrate(10)
                          }
                        }}
                        className={`h-10 rounded-xl text-caption font-medium transition-all ${
                          autoInterval === minutes
                            ? "button-primary"
                            : "button-secondary"
                        }`}
                      >
                        {minutes}m
                      </button>
                    ))}
                  </div>

                  {/* Compact Status Display */}
                  <div className="bg-white/5 rounded-xl p-3 grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-headline text-brand-primary font-bold">{availablePositions.length}</div>
                      <div className="text-micro text-white/60">Active Positions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-headline text-white font-bold">{autoInterval}min</div>
                      <div className="text-micro text-white/60">Selected Time</div>
                    </div>
                  </div>
                </div>

                {/* Credits - Compact & Branded */}
                <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 rounded-2xl p-4 border border-brand-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="w-4 h-4 text-brand-primary" />
                    <h4 className="text-caption text-white font-medium">Credits</h4>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-micro text-white/70">Sponsored by</div>
                        <button
                          onClick={() => window.open('https://lagrieta.es', '_blank')}
                          className="text-caption text-brand-primary hover:text-brand-primary-light flex items-center gap-1 transition-colors font-medium"
                        >
                          Lagrieta.es
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-micro text-white/60 pt-2 border-t border-white/5">
                      Artist: Alice Noir • "The Art Of Sexual Ecstasy" • Creative Commons
                    </div>
                    
                    <div className="text-micro text-white/50 text-center pt-1">
                      2TheStars v1.0 • Made with ❤️
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          position={currentPosition}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  )
}
