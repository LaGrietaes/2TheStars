"use client"

import { useState, useEffect } from 'react'

export default function SVGDebug() {
  const [testResults, setTestResults] = useState<any[]>([])

  const testSVGs = [
    '/positions/position-1.svg',
    '/positions/position-2.svg',
    '/positions/noun-aphrodite-sex-pose-1984901.svg'
  ]

  useEffect(() => {
    async function runTests() {
      const results = []

      for (const path of testSVGs) {
        const result = {
          path,
          status: 'testing...',
          error: null,
          content: null
        }

        try {
          console.log('Testing fetch for:', path)
          
          const response = await fetch(path, {
            method: 'GET',
            headers: {
              'Content-Type': 'image/svg+xml',
            }
          })

          console.log('Response status:', response.status)
          console.log('Response headers:', [...response.headers.entries()])

          if (!response.ok) {
            result.status = 'failed'
            result.error = `HTTP ${response.status}: ${response.statusText}`
          } else {
            const content = await response.text()
            console.log('Content length:', content.length)
            console.log('Content start:', content.substring(0, 100))
            
            result.status = 'success'
            result.content = content.substring(0, 200) + '...'
          }
        } catch (error) {
          console.error('Fetch error for', path, ':', error)
          result.status = 'error'
          result.error = error instanceof Error ? error.message : String(error)
        }

        results.push(result)
      }

      setTestResults(results)
    }

    runTests()
  }, [])

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg max-w-md z-50 backdrop-blur-md">
      <h3 className="font-bold mb-2">SVG Loading Debug</h3>
      {testResults.map((result, index) => (
        <div key={index} className="mb-2 text-xs">
          <div className="font-mono">{result.path}</div>
          <div className={`${
            result.status === 'success' ? 'text-green-400' : 
            result.status === 'error' || result.status === 'failed' ? 'text-red-400' : 
            'text-yellow-400'
          }`}>
            Status: {result.status}
          </div>
          {result.error && (
            <div className="text-red-300">Error: {result.error}</div>
          )}
          {result.content && (
            <div className="text-gray-300">Content: {result.content}</div>
          )}
        </div>
      ))}
    </div>
  )
} 