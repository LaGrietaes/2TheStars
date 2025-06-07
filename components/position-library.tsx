"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Check, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { positions, categories, getPositionsByCategory, type Position } from "@/lib/positions"

interface PositionLibraryProps {
  selectedPositions: number[]
  onSelectionChange: (positions: number[]) => void
  onBackToRandomizer: () => void
}

export default function PositionLibrary({
  selectedPositions,
  onSelectionChange,
  onBackToRandomizer,
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

  const getCategorySelectedCount = () => {
    const categoryPositions = displayedPositions.map(p => p.id)
    return selectedPositions.filter(id => categoryPositions.includes(id)).length
  }

  const scrollToIndex = (index: number) => {
    if (index >= 0 && index < displayedPositions.length) {
      setCurrentIndex(index)
    }
  }

  const scrollLeft = () => scrollToIndex(currentIndex - 1)
  const scrollRight = () => scrollToIndex(currentIndex + 1)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        scrollLeft()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        scrollRight()
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        if (displayedPositions[currentIndex]) {
          togglePosition(displayedPositions[currentIndex].id)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, displayedPositions])

  const getCardTransform = (index: number) => {
    const offset = index - currentIndex
    const absOffset = Math.abs(offset)
    
    if (absOffset === 0) {
      // Center card - larger and prominent
      return {
        transform: 'translateX(0) rotateY(0deg) scale(1)',
        zIndex: 100,
        opacity: 1
      }
    } else if (absOffset === 1) {
      // Adjacent cards
      const side = offset > 0 ? 1 : -1
      return {
        transform: `translateX(${side * 200}px) rotateY(${-side * 60}deg) scale(0.75)`,
        zIndex: 90,
        opacity: 0.7
      }
    } else if (absOffset === 2) {
      // Second adjacent cards
      const side = offset > 0 ? 1 : -1
      return {
        transform: `translateX(${side * 350}px) rotateY(${-side * 75}deg) scale(0.5)`,
        zIndex: 80,
        opacity: 0.4
      }
    } else {
      // Hidden cards
      const side = offset > 0 ? 1 : -1
      return {
        transform: `translateX(${side * 500}px) rotateY(${-side * 85}deg) scale(0.3)`,
        zIndex: 70,
        opacity: 0.2
      }
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToRandomizer}
            className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-white">{t.positionLibrary}</h2>
            <p className="text-white/70 text-sm">
              {selectedPositions.length} / {positions.length} {t.selected}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Category Filters */}
      {showFilters && (
        <div className="flex-shrink-0 mb-6 bg-white/[0.05] backdrop-blur-xl rounded-xl border border-white/10 p-4">
          <h3 className="text-white font-semibold mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.key
                    ? "bg-pink-500/90 text-white backdrop-blur-md border border-pink-400/30"
                    : "bg-white/10 text-white/70 hover:bg-white/20 backdrop-blur-md border border-white/20"
                }`}
              >
                {category.name}
                {category.key !== "all" && (
                  <span className="ml-1 text-xs opacity-70">
                    ({getPositionsByCategory(category.key).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category Controls */}
      <div className="flex-shrink-0 flex items-center justify-between mb-6">
        <div className="text-white">
          <span className="font-semibold">
            {categories.find(c => c.key === selectedCategory)?.name}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={selectAll}
            className="px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 text-sm backdrop-blur-md"
          >
            {t.all}
          </button>
          <button
            onClick={selectNone}
            className="px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 text-sm backdrop-blur-md"
          >
            {t.none}
          </button>
        </div>
      </div>

      {/* Cover Flow Style Position Viewer */}
      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        {displayedPositions.length > 0 ? (
          <>
            {/* Navigation Arrows */}
            <button
              onClick={scrollLeft}
              disabled={currentIndex === 0}
              className="absolute left-8 top-1/2 -translate-y-1/2 z-50 p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={scrollRight}
              disabled={currentIndex === displayedPositions.length - 1}
              className="absolute right-8 top-1/2 -translate-y-1/2 z-50 p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Cover Flow Container */}
            <div 
              className="relative w-full flex items-center justify-center"
              style={{ 
                perspective: '2000px',
                height: '500px'
              }}
            >
              {displayedPositions.map((position, index) => {
                const isSelected = selectedPositions.includes(position.id)
                const svgContent = svgContents[position.id]
                const cardStyle = getCardTransform(index)
                const isCurrent = index === currentIndex

                return (
                  <div
                    key={position.id}
                    className="absolute cursor-pointer transition-all duration-700 ease-out"
                    style={{
                      ...cardStyle,
                      transformStyle: 'preserve-3d'
                    }}
                    onClick={() => {
                      if (isCurrent) {
                        togglePosition(position.id)
                      } else {
                        setCurrentIndex(index)
                      }
                    }}
                  >
                    {/* Main Card */}
                    <div className={`relative group ${isCurrent ? 'w-80 h-96' : 'w-64 h-80'} transition-all duration-700`}>
                      <div className="w-full h-full bg-white/[0.08] backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
                        {/* SVG Display */}
                        <div className="w-full h-5/6 p-0 flex items-center justify-center">
                          {svgContent ? (
                            <div
                              className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                              dangerouslySetInnerHTML={{ __html: svgContent }}
                            />
                          ) : (
                            <div className="w-full h-full bg-white/10 rounded-lg animate-pulse" />
                          )}
                        </div>

                        {/* Position Info */}
                        <div className="h-1/6 p-2 bg-black/50 backdrop-blur-sm border-t border-white/20">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }, (_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-2 rounded-full ${
                                    i < ((position.id % 5) + 1)
                                      ? "bg-pink-400"
                                      : "bg-white/20"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-white/50 text-xs font-medium">
                              {((position.id % 5) + 1)}/5
                            </span>
                          </div>
                          {position.category && (
                            <p className="text-white/60 text-xs capitalize truncate mt-1">{position.category}</p>
                          )}
                        </div>

                        {/* Selection Indicator */}
                        {isSelected && (
                          <div className="absolute top-4 right-4 bg-pink-500 rounded-full p-2 shadow-lg">
                            <Check className="w-5 h-5 text-white" />
                          </div>
                        )}

                        {/* Glow effect for selected items */}
                        {isSelected && (
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 pointer-events-none" />
                        )}
                      </div>

                      {/* Reflection Effect */}
                      <div 
                        className="absolute top-full left-0 w-full h-2/3 overflow-hidden rounded-2xl opacity-30"
                        style={{
                          transform: 'rotateX(180deg)',
                          transformOrigin: 'top',
                          background: 'linear-gradient(to bottom, transparent 0%, black 100%)',
                          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 80%)',
                          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 80%)'
                        }}
                      >
                        <div className="w-full h-full bg-white/[0.04] backdrop-blur-xl border border-white/10">
                          {svgContent && (
                            <div className="w-full h-3/4 p-6 flex items-center justify-center">
                              <div
                                className="w-full h-full"
                                dangerouslySetInnerHTML={{ __html: svgContent }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Current Position Info */}
            {displayedPositions[currentIndex] && (
              <div className="mt-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {displayedPositions[currentIndex].name}
                </h3>
                <p className="text-white/70 text-lg mb-4">
                  {currentIndex + 1} of {displayedPositions.length}
                </p>
                <button
                  onClick={() => togglePosition(displayedPositions[currentIndex].id)}
                  className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedPositions.includes(displayedPositions[currentIndex].id)
                      ? "bg-pink-500 text-white shadow-lg shadow-pink-500/30"
                      : "bg-white/20 text-white border border-white/30 hover:bg-white/30"
                  }`}
                >
                  {selectedPositions.includes(displayedPositions[currentIndex].id) ? "Selected ✓" : "Select"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-white/70 text-xl">No positions found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
