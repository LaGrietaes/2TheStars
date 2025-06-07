"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Language, type Translation, getTranslation, detectBrowserLanguage } from "@/lib/i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translation
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [t, setT] = useState<Translation>(getTranslation("en"))

  useEffect(() => {
    // Load saved language or detect browser language
    const savedLanguage = localStorage.getItem("relationship-elevator-language") as Language
    const initialLanguage = savedLanguage || detectBrowserLanguage()

    setLanguageState(initialLanguage)
    setT(getTranslation(initialLanguage))
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    setT(getTranslation(lang))
    localStorage.setItem("relationship-elevator-language", lang)
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
