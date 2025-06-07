"use client"
import { useState } from "react"
import { Shuffle, Library } from "lucide-react"
import RandomPositionSelector from "@/components/random-position-selector"
import PositionLibrary from "@/components/position-library"
import LanguageSelector from "@/components/language-selector"
import StarParticles from "@/components/star-particles"
import { Logo } from "@/components/ui/logo"

import { LanguageProvider, useLanguage } from "@/contexts/language-context"
import { positions } from "@/lib/positions"

function AppContent() {
  const [currentView, setCurrentView] = useState<"randomizer" | "library">("randomizer")
  const [selectedPositions, setSelectedPositions] = useState<number[]>(positions.map(p => p.id))
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)
  const { t } = useLanguage()

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-950 overflow-hidden">
      {/* Star particles overlay */}
      <StarParticles />
      


      {/* Header with Logo - Fixed height, iOS style */}
      <header className="flex-shrink-0 flex items-center justify-center px-4 pt-8 pb-3 z-20 bg-black/10 backdrop-blur-xl border-b border-white/10">
        <Logo size="sm" />
      </header>

      {/* Main content - Flexible height */}
      <main className="flex-1 flex flex-col min-h-0 relative z-10">
        {currentView === "randomizer" ? (
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
              <RandomPositionSelector 
                selectedPositions={selectedPositions} 
                onShowLanguageSelector={() => setShowLanguageSelector(true)}
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-auto px-4 py-4">
            <PositionLibrary
              selectedPositions={selectedPositions}
              onSelectionChange={setSelectedPositions}
              onBackToRandomizer={() => setCurrentView("randomizer")}
            />
          </div>
        )}
      </main>

      {/* Bottom Navigation - Fixed iOS style tab bar */}
      <nav className="flex-shrink-0 z-20 bg-black/20 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center justify-center gap-4 px-6 py-4 pb-8 max-w-md mx-auto">
          <button
            onClick={() => setCurrentView("randomizer")}
            className={`flex flex-col items-center gap-2 px-8 py-3 rounded-2xl transition-all duration-300 ${
              currentView === "randomizer"
                ? "bg-pink-500/90 backdrop-blur-md text-white shadow-lg shadow-pink-500/30 border border-pink-400/30"
                : "text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-md border border-transparent"
            }`}
          >
            <Shuffle className="w-6 h-6" />
            <span className="text-xs font-medium">{t.randomizer}</span>
          </button>

          <button
            onClick={() => setCurrentView("library")}
            className={`flex flex-col items-center gap-2 px-8 py-3 rounded-2xl transition-all duration-300 relative ${
              currentView === "library"
                ? "bg-pink-500/90 backdrop-blur-md text-white shadow-lg shadow-pink-500/30 border border-pink-400/30"
                : "text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-md border border-transparent"
            }`}
          >
            <Library className="w-6 h-6" />
            <span className="text-xs font-medium">{t.library}</span>
            {selectedPositions.length > 0 && (
              <div className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center border-2 border-white/30 backdrop-blur-sm">
                {selectedPositions.length}
              </div>
            )}
          </button>
        </div>
      </nav>

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
