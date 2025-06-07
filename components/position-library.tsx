"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Check, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { positions, categories, getPositionsByCategory, type Position } from "@/lib/positions"

interface PositionLibraryProps {
  selectedPositions: number[]
  onSelectionChange: (positions: number[]) => void
}

export default function PositionLibrary({
  selectedPositions,
  onSelectionChange,
}: PositionLibraryProps) {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [svgContents, setSvgContents] = useState<Record<number, string>>({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const displayedPositions = getPositionsByCategory(selectedCategory)

  // Fetch SVG content for visible positions
  const fetchSvg = async (position: Position) => {
    if (svgContents[position.id]) return

    try {
      const response = await fetch(position.svgPath, {
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

      setSvgContents(prev => ({ ...prev, [position.id]: processedSvg }))
    } catch (error) {
      console.error("Error fetching SVG:", error, "Position:", position.name, "Path:", position.svgPath)
      
      // Fallback: Create a simple placeholder SVG
      const fallbackSvg = `
        <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="180" height="180" fill="none" stroke="white" stroke-width="2" rx="20"/>
          <circle cx="100" cy="80" r="15" fill="white" opacity="0.7"/>
          <circle cx="100" cy="120" r="15" fill="white" opacity="0.7"/>
          <path d="M70 150 Q100 170 130 150" stroke="white" stroke-width="3" fill="none" opacity="0.7"/>
          <text x="100" y="190" text-anchor="middle" fill="white" font-size="12" opacity="0.6">${position.name}</text>
        </svg>
      `
      
      setSvgContents(prev => ({ ...prev, [position.id]: fallbackSvg }))
    }
  }

  // Load SVGs for visible positions
  useEffect(() => {
    displayedPositions.forEach(position => {
      if (!svgContents[position.id]) {
        fetchSvg(position)
      }
    })
  }, [displayedPositions])

  // Reset current index when category changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [selectedCategory])

  const togglePosition = (positionId: number) => {
    if (selectedPositions.includes(positionId)) {
      onSelectionChange(selectedPositions.filter(id => id !== positionId))
    } else {
      onSelectionChange([...selectedPositions, positionId])
    }
  }

  const selectAll = () => {
    const categoryPositions = displayedPositions.map(p => p.id)
    const newSelection = Array.from(new Set([...selectedPositions, ...categoryPositions]))
    onSelectionChange(newSelection)
  }

  const selectNone = () => {
    const categoryPositions = displayedPositions.map(p => p.id)
    const newSelection = selectedPositions.filter(id => !categoryPositions.includes(id))
    onSelectionChange(newSelection)
  }

  const scrollLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const scrollRight = () => {
    if (currentIndex < displayedPositions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Clean Header */}
      <div className="flex-shrink-0 flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">{t.positionLibrary}</h2>
          <p className="text-white/60 text-sm mt-1">
            {selectedPositions.length} / {positions.length} {t.selected}
          </p>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`button-secondary p-3 rounded-xl transition-all duration-200 ${
            showFilters ? 'bg-brand-primary/20 border-brand-primary/30' : ''
          }`}
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* iTunes-Style Filter Menu */}
      {showFilters && (
        <div className="flex-shrink-0 bg-black/20 backdrop-blur-2xl rounded-3xl border border-white/10 p-6 mb-6 shadow-2xl">
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.key
                    ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg shadow-brand-primary/30"
                    : "bg-white/10 text-white/80 hover:bg-white/20 hover:scale-105"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {!showFilters && (
        <div className="flex-shrink-0 flex items-center justify-between mb-4">
          <div className="text-white/60 text-sm">
            {categories.find(c => c.key === selectedCategory)?.name}
          </div>

          <div className="flex gap-2">
            <button
              onClick={selectAll}
              className="button-secondary px-4 py-2 text-sm rounded-full"
            >
              {t.all}
            </button>
            <button
              onClick={selectNone}
              className="button-secondary px-4 py-2 text-sm rounded-full"
            >
              {t.none}
            </button>
          </div>
        </div>
      )}

      {/* iTunes Cover Flow Display */}
      <div className="flex-1 flex flex-col min-h-0">
        {displayedPositions.length > 0 ? (
          <>
            {/* Cover Flow Container - Full Space Usage */}
            <div className="flex-1 flex items-center justify-center relative px-2 sm:px-4 min-h-0">
              {/* Navigation Arrows - Positioned at card level */}
              {displayedPositions.length > 1 && (
                <>
                  <button
                    onClick={scrollLeft}
                    disabled={currentIndex === 0}
                    className="absolute left-2 sm:left-4 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/50 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white hover:bg-black/70 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
                  </button>

                  <button
                    onClick={scrollRight}
                    disabled={currentIndex === displayedPositions.length - 1}
                    className="absolute right-2 sm:right-4 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/50 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white hover:bg-black/70 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
                  </button>
                </>
              )}

              {/* Cover Flow Cards - Full Width */}
              <div className="w-full flex items-center justify-center relative">
                <div className="relative w-full h-96 sm:h-[28rem] lg:h-[32rem] flex items-center justify-center" style={{ perspective: '1500px' }}>
                  {displayedPositions.map((position, index) => {
                    const offset = index - currentIndex
                    const isActive = index === currentIndex
                    const isAdjacent = Math.abs(offset) === 1
                    const isVisible = Math.abs(offset) <= 2

                    if (!isVisible) return null

                    let transform = 'translateX(-50%) translateY(-50%) translateZ(0px) rotateY(0deg) scale(1)'
                    let zIndex = 10
                    let opacity = 1

                    if (!isActive) {
                      if (offset < 0) {
                        // Left cards - closer to center
                        transform = `translateX(-50%) translateY(-50%) translateX(-${Math.abs(offset) * 70}%) translateZ(-${Math.abs(offset) * 180}px) rotateY(35deg) scale(${0.75 - Math.abs(offset) * 0.1})`
                      } else {
                        // Right cards - closer to center
                        transform = `translateX(-50%) translateY(-50%) translateX(${Math.abs(offset) * 70}%) translateZ(-${Math.abs(offset) * 180}px) rotateY(-35deg) scale(${0.75 - Math.abs(offset) * 0.1})`
                      }
                      zIndex = 10 - Math.abs(offset)
                      opacity = isAdjacent ? 0.8 : 0.5
                    } else {
                      transform = 'translateX(-50%) translateY(-50%) translateZ(0px) rotateY(0deg) scale(1)'
                    }

                    return (
                      <div
                        key={position.id}
                        className={`absolute left-1/2 top-1/2 cursor-pointer transition-all duration-500 ease-out ${
                          !isActive ? 'hover:scale-105' : ''
                        }`}
                        style={{
                          transform,
                          zIndex,
                          opacity,
                          transformStyle: 'preserve-3d'
                        }}
                        onClick={() => {
                          if (isActive) {
                            togglePosition(position.id)
                          } else {
                            setCurrentIndex(index)
                          }
                        }}
                      >
                        <div className={`${isActive ? 'w-72 sm:w-80 lg:w-96' : 'w-48 sm:w-56 lg:w-64'}`}>
                          <div 
                            className="aspect-[3/4] bg-white/[0.08] backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl group relative"
                          >
                            {/* Large SVG Display */}
                            <div className="w-full h-full p-2 sm:p-3 flex items-center justify-center relative">
                              {svgContents[position.id] ? (
                                <div
                                  className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                                  dangerouslySetInnerHTML={{ __html: svgContents[position.id] }}
                                />
                              ) : (
                                <div className="w-full h-full bg-white/10 rounded-2xl animate-pulse flex items-center justify-center">
                                  <div className="text-white/40 text-sm">Loading...</div>
                                </div>
                              )}

                              {/* Title Inside Artwork - Bottom Overlay */}
                              {isActive && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 sm:p-6">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }, (_, i) => (
                                          <div
                                            key={i}
                                            className={`w-2 h-2 rounded-full ${
                                              i < ((position.id % 5) + 1)
                                                ? "bg-brand-primary"
                                                : "bg-white/30"
                                            }`}
                                          />
                                        ))}
                                      </div>
                                      <span className="text-white/70 text-xs sm:text-sm capitalize">
                                        {(() => {
                                          const difficulty = ((position.id % 5) + 1)
                                          const levels = ['Easy', 'Medium', 'Hard', 'Expert', 'Pornstar']
                                          return levels[difficulty - 1]
                                        })()}
                                      </span>
                                    </div>
                                    <span className="text-white/60 text-sm">
                                      {currentIndex + 1}/{displayedPositions.length}
                                    </span>
                                  </div>
                                  <h3 className="text-white text-lg sm:text-xl font-bold leading-tight">
                                    {position.name}
                                  </h3>
                                  {position.category && (
                                    <p className="text-brand-primary text-sm sm:text-base capitalize font-medium mt-1">
                                      {position.category}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Selection Check */}
                            {selectedPositions.includes(position.id) && (
                              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-brand-primary rounded-full p-2 sm:p-3 shadow-lg shadow-brand-primary/50">
                                <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                              </div>
                            )}

                            {/* Selection Glow */}
                            {selectedPositions.includes(position.id) && (
                              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-primary/25 to-brand-secondary/25 pointer-events-none" />
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="px-4 sm:px-6 text-center flex-shrink-0 py-4">
              {displayedPositions[currentIndex] && (
                <button
                  onClick={() => togglePosition(displayedPositions[currentIndex].id)}
                  className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                    selectedPositions.includes(displayedPositions[currentIndex].id)
                      ? "button-primary shadow-lg shadow-brand-primary/30"
                      : "button-secondary hover:bg-white/20"
                  }`}
                >
                  {selectedPositions.includes(displayedPositions[currentIndex].id) ? "Selected ✓" : "Select"}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-white/70 text-sm sm:text-base">No positions found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
