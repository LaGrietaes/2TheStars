"use client"

import { useState } from "react"
import { X, Copy, Share2, Download, MessageCircle, Mail } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Position } from "@/lib/positions"

interface ShareModalProps {
  position: Position
  svgContent?: string | null
  onClose: () => void
}

export default function ShareModal({ position, svgContent = null, onClose }: ShareModalProps) {
  const { t, language } = useLanguage()
  const [copied, setCopied] = useState(false)

  // Get the description from the translation system
  const positionKey = position.key as keyof typeof t.positions
  const positionData = t.positions[positionKey]
  const description = positionData?.description || "Discover new intimate connections with your partner."

  const appUrl = "https://relationship-elevator.app" // Replace with actual app URL
  const shareText = `${t.tryAppYourself}! 💕

✨ ${position.name}
${description}

${t.tryAppYourself}: ${appUrl}

#RelationshipElevator #Intimacy #Connection`

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${position.name} - ${t.appName}`,
          text: shareText,
          url: appUrl,
        })
      } catch (err) {
        console.error("Error sharing: ", err)
      }
    } else {
      // Fallback to copy
      handleCopyText()
    }
  }

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`${position.name} - ${t.appName}`)
    const body = encodeURIComponent(shareText)
    const emailUrl = `mailto:?subject=${subject}&body=${body}`
    window.open(emailUrl)
  }

  const handleDownloadImage = () => {
    // Create a canvas to convert SVG to image
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 400
    canvas.height = 500

    // Create a gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, "#581c87") // purple-900
    gradient.addColorStop(0.5, "#3730a3") // indigo-900
    gradient.addColorStop(1, "#1e3a8a") // blue-950

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add app branding
    ctx.fillStyle = "white"
    ctx.font = "bold 24px Arial"
    ctx.textAlign = "center"
    ctx.fillText(t.appName, canvas.width / 2, 40)

    // Add position name
    ctx.font = "bold 20px Arial"
    ctx.fillText(position.name, canvas.width / 2, 80)

    // Add SVG (simplified - in a real app you'd need proper SVG to canvas conversion)
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
    ctx.fillRect(50, 100, 300, 300)
    ctx.fillStyle = "white"
    ctx.font = "16px Arial"
    ctx.fillText("Position Illustration", canvas.width / 2, 250)

    // Add description (wrapped text)
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    const words = description.split(" ")
    let line = ""
    let y = 430
    const maxWidth = 320

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " "
      const metrics = ctx.measureText(testLine)
      const testWidth = metrics.width

      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, 40, y)
        line = words[n] + " "
        y += 20
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, 40, y)

    // Add app URL
    ctx.font = "12px Arial"
    ctx.textAlign = "center"
    ctx.fillStyle = "#ec4899" // pink-500
    ctx.fillText(appUrl, canvas.width / 2, canvas.height - 20)

    // Download the image
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${position.name.replace(/\s+/g, "-").toLowerCase()}-relationship-elevator.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-black/90 backdrop-blur-lg rounded-2xl border border-pink-500/30 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-pink-500/30">
          <h3 className="text-lg font-bold text-white">{t.sharePosition}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Position Preview */}
        <div className="p-4 border-b border-pink-500/30">
          <div className="bg-indigo-950/50 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-black/30 rounded-lg flex items-center justify-center">
                {svgContent ? (
                  <div className="w-12 h-12" dangerouslySetInnerHTML={{ __html: svgContent }} />
                ) : (
                  <div className="w-12 h-12 bg-indigo-900/30 rounded-full"></div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white text-sm">{position.name}</h4>
                <p className="text-white/70 text-xs line-clamp-2">{description}</p>
              </div>
            </div>
          </div>

          <div className="text-center text-white/70 text-xs">
            <p>{t.shareWithPartner}</p>
          </div>
        </div>

        {/* Share Options */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={handleNativeShare}
              className="flex flex-col items-center gap-2 p-3 bg-pink-500 rounded-xl text-white hover:bg-pink-600 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span className="text-xs font-medium">{t.share}</span>
            </button>

            <button
              onClick={handleCopyText}
              className="flex flex-col items-center gap-2 p-3 bg-black/50 border border-pink-500/30 rounded-xl text-white hover:bg-black/70 transition-colors"
            >
              <Copy className="w-5 h-5" />
              <span className="text-xs font-medium">{copied ? t.copied : t.copyText}</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="flex flex-col items-center gap-2 p-3 bg-green-600 rounded-xl text-white hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs font-medium">{t.whatsapp}</span>
            </button>

            <button
              onClick={handleEmailShare}
              className="flex flex-col items-center gap-2 p-3 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="text-xs font-medium">{t.email}</span>
            </button>
          </div>

          <button
            onClick={handleDownloadImage}
            className="w-full flex items-center justify-center gap-2 p-3 bg-black/50 border border-pink-500/30 rounded-xl text-white hover:bg-black/70 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">{t.downloadImage}</span>
          </button>
        </div>

        {/* App Promotion */}
        <div className="p-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-t border-pink-500/30">
          <div className="text-center">
            <p className="text-white/90 text-sm font-medium mb-1">{t.appName}</p>
            <p className="text-white/70 text-xs">{t.discoverNewWays}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
