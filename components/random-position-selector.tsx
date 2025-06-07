"use client"

import { useState, useEffect, useRef } from "react"
import { Sparkles, Play, Pause, Settings, Share2, MoreHorizontal, Globe, X, Heart, ExternalLink } from "lucide-react"
import AnimatedTitle from "./animated-title"
import ShareModal from "./share-modal"
import { useLanguage } from "@/contexts/language-context"
import { positions, getPositionById } from "@/lib/positions"

interface RandomPositionSelectorProps {
  selectedPositions: number[]
  onShowLanguageSelector?: () => void
}

export default function RandomPositionSelector({ selectedPositions, onShowLanguageSelector }: RandomPositionSelectorProps) {
  const { t } = useLanguage()
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0)
  const [displayPositionIndex, setDisplayPositionIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
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

    // Create a quick animation effect by rapidly cycling through positions
    let count = 0
    const totalCycles = 15
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * availablePositions.length)
      const randomPositionId = availablePositions[randomIndex]
      const randomPosition = getPositionById(randomPositionId)

      if (randomPosition) {
        // Animate text with fade effect
        setTextFade(true)
        setTitleChange(true)

        setTimeout(() => {
          setDisplayPositionIndex(randomIndex)
          setTextFade(false)
          setTimeout(() => {
            setTitleChange(false)
          }, 100)
        }, 150)

        // Fetch and update the animating SVG
        fetchSvg(randomPosition.svgPath, true)
      }

      count++

      if (count >= totalCycles) {
        clearInterval(interval)

        // Final selection
        const finalIndex = Math.floor(Math.random() * availablePositions.length)
        const finalPositionId = availablePositions[finalIndex]

        setCurrentPositionIndex(finalIndex)

        setTextFade(true)
        setTitleChange(true)

        setTimeout(() => {
          setDisplayPositionIndex(finalIndex)
          setTextFade(false)
          setTimeout(() => {
            setTitleChange(false)
          }, 100)
        }, 150)

        setTimeout(() => {
          setIsAnimating(false)
        }, 300)
      }
    }, 300)
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


      {/* Progress Indicator - Compact */}
      {isAutoMode && (
        <div className="flex-shrink-0 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-white/80">Session</span>
            <span className="text-xs font-mono text-white/60">{formatTime(timeRemaining)}</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${((autoInterval * 60 - timeRemaining) / (autoInterval * 60)) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Main Artwork - Maximum Space */}
      <div className="flex-1 flex items-center justify-center px-2 py-4">
        <div className="relative w-full aspect-square max-h-full bg-white/[0.05] rounded-[32px] border border-white/[0.15] overflow-hidden shadow-2xl backdrop-blur-xl">
          {/* Artwork */}
          <div className="absolute inset-3 flex items-center justify-center">
            {(isAnimating ? animatingSvgContent : svgContent) ? (
              <div
                className={`w-full h-full transition-all duration-500 ease-out ${
                  isAnimating ? "scale-95 opacity-60" : "scale-100 opacity-100"
                }`}
                dangerouslySetInnerHTML={{
                  __html: (isAnimating ? animatingSvgContent : svgContent) || "",
                }}
              />
            ) : (
              <div className="w-full h-full bg-white/5 rounded-2xl animate-pulse" />
            )}
          </div>

          {/* Elegant Selection Animation */}
          {isAnimating && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-75" />
              <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-purple-400 rounded-full animate-ping opacity-75 animation-delay-300" />
              <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-pink-400 rounded-full animate-ping opacity-75 animation-delay-600" />
            </div>
          )}

          {/* Share Button - Top Right */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setShowShareModal(true)}
              className="p-2.5 bg-black/40 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-black/60 transition-all duration-300 shadow-lg"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Position Info Overlay - Minimized */}
          <div className="absolute inset-x-0 bottom-0">
            <div className="bg-gradient-to-t from-black/90 via-black/40 to-transparent px-4 pt-6 pb-4">
              <div className={`transition-all duration-400 ease-out ${textFade ? "opacity-30 transform translate-y-1" : "opacity-100"}`}>
                <AnimatedTitle
                  text={displayPosition.name}
                  isAnimating={titleChange}
                  isChanging={titleChange}
                />
                {displayPosition.category && (
                  <div className="inline-flex items-center px-2 py-0.5 bg-white/15 backdrop-blur-md rounded-full">
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

      {/* Primary Actions - Compact */}
      <div className="flex-shrink-0 space-y-3 pt-4">
        {/* Main Action */}
        <button
          onClick={selectRandomPosition}
          disabled={isAnimating}
          className={`w-full h-12 rounded-2xl font-semibold tracking-tight transition-all duration-300 ease-out ${
            isAnimating
              ? "bg-gray-800/50 text-gray-400 cursor-not-allowed backdrop-blur-md"
              : "bg-gradient-to-r from-blue-500/90 to-purple-600/90 hover:from-blue-600/90 hover:to-purple-700/90 text-white shadow-lg hover:shadow-xl active:scale-[0.98] backdrop-blur-md border border-white/10"
          }`}
        >
          {isAnimating ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-gray-500 border-t-gray-300 rounded-full animate-spin mr-2" />
              Selecting...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Sparkles className="w-4 h-4 mr-2" />
              New Position
            </div>
          )}
        </button>

        {/* Auto Mode Toggle */}
        <button
          onClick={isAutoMode ? stopAutoMode : startAutoMode}
          className={`w-full h-10 rounded-xl font-medium tracking-tight transition-all duration-300 ease-out ${
            isAutoMode
              ? "bg-red-500/80 hover:bg-red-600/80 text-white shadow-md active:scale-[0.98] backdrop-blur-md border border-red-400/30"
              : "bg-white/[0.08] hover:bg-white/[0.12] text-white border border-white/20 backdrop-blur-md active:scale-[0.98]"
          }`}
        >
          {isAutoMode ? (
            <div className="flex items-center justify-center">
              <Pause className="w-3.5 h-3.5 mr-2" />
              <span className="text-sm">Stop Auto</span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Play className="w-3.5 h-3.5 mr-2" />
              <span className="text-sm">Auto ({autoInterval}min)</span>
            </div>
          )}
        </button>
      </div>

      {/* More Options - Bottom */}
      <div className="flex justify-center pt-3 flex-shrink-0">
        <button
          onClick={() => setShowMoreMenu(!showMoreMenu)}
          className="px-4 py-1.5 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-white/70 hover:text-white/90 rounded-full transition-all duration-200 ease-out backdrop-blur-md"
        >
          <div className="flex items-center">
            <MoreHorizontal className="w-3.5 h-3.5 mr-1.5" />
            <span className="text-xs font-medium">Options</span>
          </div>
        </button>
      </div>

      {/* Options Modal - Clean and Working */}
      {showMoreMenu && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-xl z-50"
          onClick={() => setShowMoreMenu(false)}
        >
          <div 
            className="h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-20 pb-8">
              <h3 className="text-2xl font-bold text-white">Options</h3>
              <button
                onClick={() => setShowMoreMenu(false)}
                className="p-3 bg-white/30 hover:bg-white/50 rounded-full transition-colors border-2 border-white/50 shadow-lg"
              >
                <X className="w-6 h-6 text-white" strokeWidth={3} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 pb-20">
              <div className="max-w-sm mx-auto space-y-10">
                
                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setShowMoreMenu(false)}
                    className="flex flex-col items-center p-6 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors"
                  >
                    <Settings className="w-8 h-8 text-white mb-3" />
                    <span className="text-white font-medium">Settings</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowMoreMenu(false)
                      onShowLanguageSelector?.()
                    }}
                    className="flex flex-col items-center p-6 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors"
                  >
                    <Globe className="w-8 h-8 text-white mb-3" />
                    <span className="text-white font-medium">Language</span>
                  </button>
                </div>

                {/* Auto Session Duration */}
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-white text-center">Auto Session Duration</h4>
                  
                  <div className="grid grid-cols-5 gap-3">
                    {[2, 5, 10, 15, 30].map((minutes) => (
                      <button
                        key={minutes}
                        onClick={() => setAutoInterval(minutes)}
                        className={`py-4 rounded-xl text-sm font-bold transition-colors ${
                          autoInterval === minutes
                            ? "bg-blue-500 text-white"
                            : "bg-white/10 text-white/80 hover:bg-white/20"
                        }`}
                      >
                        {minutes}m
                      </button>
                    ))}
                  </div>


                </div>

                {/* Credits Section */}
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-white text-center flex items-center justify-center">
                    <Heart className="w-5 h-5 text-pink-400 mr-2" />
                    Credits
                  </h4>
                  
                  <div className="space-y-4">
                    {/* Sponsor */}
                    <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="text-white font-semibold text-sm">Sponsored by</h5>
                          <p className="text-white/80 text-xs">Official sponsor of 2TheStars</p>
                        </div>
                        <button
                          onClick={() => window.open('https://www.lagrieta.es', '_blank')}
                          className="flex items-center px-3 py-2 bg-blue-500/80 hover:bg-blue-600/80 rounded-lg text-white text-xs font-medium transition-colors"
                        >
                          LaGrieta.es
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </button>
                      </div>
                    </div>

                    {/* App Info */}
                    <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                      <div className="space-y-2">
                        <h5 className="text-white font-semibold text-sm">About</h5>
                        <div className="text-white/80 text-xs space-y-1">
                          <p><span className="font-medium">App:</span> 2TheStars</p>
                          <p><span className="font-medium">Version:</span> 1.0</p>
                          <p><span className="font-medium">Positions:</span> {availablePositions.length} available</p>
                        </div>
                      </div>
                    </div>

                    {/* App Version */}
                    <div className="text-center">
                      <p className="text-white/40 text-xs">
                        2TheStars v1.0 • Made with ❤️
                      </p>
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
