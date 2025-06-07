"use client"
import { useState, useRef, useEffect } from "react"
import { Shuffle, Library, ChevronLeft, ChevronRight } from "lucide-react"
import RandomPositionSelector from "@/components/random-position-selector"
import PositionLibrary from "@/components/position-library"
import LanguageSelector from "@/components/language-selector"
import StarParticles from "@/components/star-particles"
import { Logo } from "@/components/ui/logo"

import { LanguageProvider, useLanguage } from "@/contexts/language-context"
import { positions } from "@/lib/positions"

function AppContent() {
  const [currentView, setCurrentView] = useState<"randomizer" | "library">("randomizer")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [selectedPositions, setSelectedPositions] = useState<number[]>(positions.map(p => p.id))
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)
  const { t } = useLanguage()
  
  // Touch handling for swipe navigation
  const touchStartX = useRef<number>(0)
  const touchStartY = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX
    const touchEndY = e.changedTouches[0].clientY
    
    const deltaX = touchEndX - touchStartX.current
    const deltaY = touchEndY - touchStartY.current
    
    // Only trigger swipe if horizontal movement is greater than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0 && currentView === "library") {
        // Swipe right: Library -> Randomizer
        toggleView("randomizer")
      } else if (deltaX < 0 && currentView === "randomizer") {
        // Swipe left: Randomizer -> Library
        toggleView("library")
      }
    }
  }

  const toggleView = (targetView?: "randomizer" | "library") => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    const newView = targetView || (currentView === "randomizer" ? "library" : "randomizer")
    
    // Add a slight delay for smooth transition
    setTimeout(() => {
      setCurrentView(newView)
      setTimeout(() => setIsTransitioning(false), 150)
    }, 75)
  }

  return (
    <div 
      className="fixed inset-0 flex flex-col bg-brand-cosmic overflow-hidden"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Star particles overlay */}
      <StarParticles />
      
      {/* Header with Logo and Navigation - Fixed height, iOS style */}
      <header className="flex-shrink-0 flex items-center justify-center px-4 pt-safe pb-3 z-20 bg-black/10 backdrop-blur-xl border-b border-white/10 h-16 relative">
        {/* Centered Logo */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Logo size="sm" />
        </div>
        
        {/* Navigation Button with subtle swipe hint */}
        <div className="ml-auto flex items-center gap-3">
          {/* Subtle swipe hint */}
          <div className="hidden sm:flex items-center gap-1 text-white/40 text-xs">
            <span>Swipe</span>
            <ChevronLeft className="w-3 h-3" />
            <ChevronRight className="w-3 h-3" />
          </div>
          
          <button
            onClick={() => toggleView()}
            disabled={isTransitioning}
            className={`button-secondary flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ease-out active:scale-95 ${
              isTransitioning ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            {currentView === "randomizer" ? (
              <>
                <Library className={`w-4 h-4 transition-transform duration-200 ${isTransitioning ? 'scale-110' : ''}`} />
                <span className="text-caption font-medium hidden sm:inline">{t.library}</span>
                {selectedPositions.length > 0 && (
                  <div className="bg-brand-primary text-white text-micro rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {selectedPositions.length}
                  </div>
                )}
              </>
            ) : (
              <>
                <Shuffle className={`w-4 h-4 transition-transform duration-200 ${isTransitioning ? 'scale-110' : ''}`} />
                <span className="text-caption font-medium hidden sm:inline">{t.randomizer}</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main content - Full height minus header with transition */}
      <main className={`flex-1 flex flex-col min-h-0 relative z-10 transition-all duration-300 ease-out ${
        isTransitioning ? 'opacity-80 scale-[0.98]' : 'opacity-100 scale-100'
      }`} style={{height: 'calc(100vh - 4rem)'}}>
        {currentView === "randomizer" ? (
          <div className="flex-1 flex items-stretch justify-center px-4 py-2">
            <div className="w-full max-w-sm flex flex-col">
              <RandomPositionSelector 
                selectedPositions={selectedPositions} 
                onShowLanguageSelector={() => setShowLanguageSelector(true)}
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col px-4 py-4 overflow-hidden">
            <PositionLibrary
              selectedPositions={selectedPositions}
              onSelectionChange={setSelectedPositions}
            />
          </div>
        )}
      </main>



      {/* Language Selector Modal */}
      {showLanguageSelector && <LanguageSelector onClose={() => setShowLanguageSelector(false)} />}
    </div>
  )
}

export default function RelationshipElevator() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}
