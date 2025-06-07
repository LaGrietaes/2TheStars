import { useState, useEffect, useCallback } from 'react'

interface SVGCache {
  [key: string]: string
}

const svgCache: SVGCache = {}

export function useSVGLoader() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})
  const [errorStates, setErrorStates] = useState<Record<string, boolean>>({})

  const loadSVG = useCallback(async (path: string): Promise<string | null> => {
    // Check cache first
    if (svgCache[path]) {
      return svgCache[path]
    }

    // Set loading state
    setLoadingStates(prev => ({ ...prev, [path]: true }))
    setErrorStates(prev => ({ ...prev, [path]: false }))

    try {
      // Try multiple approaches to fetch the SVG
      let response: Response

      try {
        // First attempt: Regular fetch
        response = await fetch(path, {
          method: 'GET',
          headers: {
            'Content-Type': 'image/svg+xml',
          },
          cache: 'force-cache'
        })
      } catch (fetchError) {
        // Second attempt: Try without headers
        response = await fetch(path, {
          method: 'GET',
          cache: 'default'
        })
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const svgText = await response.text()

      // Validate it's actually SVG content
      if (!svgText.includes('<svg')) {
        throw new Error('Invalid SVG content')
      }

      // Process the SVG for consistent styling
      const processedSvg = svgText
        .replace(/<text[^>]*>.*?<\/text>/g, "")
        .replace(/fill="[^"]*"/g, 'fill="white"')
        .replace(/stroke="[^"]*"/g, 'stroke="white"')
        .replace(/<path(?![^>]*fill=)/g, '<path fill="white"')
        .replace(/<svg/, '<svg width="100%" height="100%"')

      // Cache the result
      svgCache[path] = processedSvg

      // Clear loading state
      setLoadingStates(prev => ({ ...prev, [path]: false }))

      return processedSvg
    } catch (error) {
      console.error("Error loading SVG:", error, "Path:", path)
      
      // Set error state
      setErrorStates(prev => ({ ...prev, [path]: true }))
      setLoadingStates(prev => ({ ...prev, [path]: false }))

      // Create fallback SVG
      const fallbackSvg = createFallbackSVG(path)
      svgCache[path] = fallbackSvg
      
      return fallbackSvg
    }
  }, [])

  const createFallbackSVG = (path: string): string => {
    const fileName = path.split('/').pop()?.replace('.svg', '') || 'position'
    
    return `
      <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="180" height="180" fill="none" stroke="white" stroke-width="2" rx="20"/>
        <circle cx="70" cy="80" r="12" fill="white" opacity="0.7"/>
        <circle cx="130" cy="80" r="12" fill="white" opacity="0.7"/>
        <path d="M60 130 Q100 150 140 130" stroke="white" stroke-width="3" fill="none" opacity="0.7"/>
        <text x="100" y="190" text-anchor="middle" fill="white" font-size="10" opacity="0.6">${fileName}</text>
      </svg>
    `
  }

  const isLoading = useCallback((path: string) => {
    return loadingStates[path] || false
  }, [loadingStates])

  const hasError = useCallback((path: string) => {
    return errorStates[path] || false
  }, [errorStates])

  const getCachedSVG = useCallback((path: string) => {
    return svgCache[path] || null
  }, [])

  return {
    loadSVG,
    isLoading,
    hasError,
    getCachedSVG
  }
}

export default useSVGLoader 