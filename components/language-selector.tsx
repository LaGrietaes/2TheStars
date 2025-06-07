"use client"

import { X, Check } from "lucide-react"
import { type Language, languageNames } from "@/lib/i18n"
import { useLanguage } from "@/contexts/language-context"

interface LanguageSelectorProps {
  onClose: () => void
}

export default function LanguageSelector({ onClose }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage()

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-black/90 backdrop-blur-lg rounded-2xl border border-pink-500/30 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-pink-500/30">
          <h3 className="text-lg font-bold text-white">{t.selectLanguage}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Options */}
        <div className="p-4">
          <div className="space-y-2">
            {Object.entries(languageNames).map(([code, name]) => {
              const isSelected = language === code

              return (
                <button
                  key={code}
                  onClick={() => handleLanguageSelect(code as Language)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                    isSelected
                      ? "bg-pink-500 text-white"
                      : "bg-black/30 text-white/70 hover:bg-black/50 hover:text-white"
                  }`}
                >
                  <span className="font-medium">{name}</span>
                  {isSelected && <Check className="w-5 h-5" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-t border-pink-500/30">
          <p className="text-center text-white/70 text-xs">
            {t.language}: {languageNames[language]}
          </p>
        </div>
      </div>
    </div>
  )
}
