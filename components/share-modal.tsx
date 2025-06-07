"use client"

import { useState } from "react"
import { X, Copy, Share2, Download, MessageCircle, Mail } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Position } from "@/lib/positions"
import { Logo } from "@/components/ui/logo"

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
    <div className="fixed inset-0 z-50 modal-backdrop animate-fadeIn">
      <div className="h-full flex flex-col justify-end sm:justify-center sm:items-center p-4">
        <div className="w-full max-w-md bg-glass border border-white/20 rounded-3xl overflow-hidden animate-slide-up card-elevated">
          
          {/* Header - Compact & Branded */}
          <div className="flex items-center justify-between p-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
                <Share2 className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-headline text-white">{t.sharePosition}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Position Preview - Improved Layout */}
          <div className="p-6 pb-4">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-brand-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  {svgContent ? (
                    <div className="w-12 h-12" dangerouslySetInnerHTML={{ __html: svgContent }} />
                  ) : (
                    <div className="w-12 h-12 bg-brand-primary/30 rounded-xl"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-body text-white font-medium mb-1">{position.name}</h4>
                  <p className="text-micro text-white/70 line-clamp-2">{description}</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-3">
              <p className="text-micro text-white/60">{t.shareWithPartner}</p>
            </div>
          </div>

          {/* Share Options - Improved Grid */}
          <div className="px-6 pb-4">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <button
                onClick={handleNativeShare}
                className="button-primary flex items-center gap-2 p-3 rounded-xl justify-center"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-caption font-medium">{t.share}</span>
              </button>

              <button
                onClick={handleCopyText}
                className="button-secondary flex items-center gap-2 p-3 rounded-xl justify-center"
              >
                <Copy className="w-4 h-4" />
                <span className="text-caption font-medium">{copied ? t.copied : t.copyText}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={handleWhatsAppShare}
                className="flex items-center gap-2 p-3 bg-green-600 hover:bg-green-700 rounded-xl text-white transition-colors justify-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-caption font-medium">{t.whatsapp}</span>
              </button>

              <button
                onClick={handleEmailShare}
                className="flex items-center gap-2 p-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white transition-colors justify-center"
              >
                <Mail className="w-4 h-4" />
                <span className="text-caption font-medium">{t.email}</span>
              </button>
            </div>

            <button
              onClick={handleDownloadImage}
              className="w-full button-secondary flex items-center justify-center gap-2 p-3 rounded-xl"
            >
              <Download className="w-4 h-4" />
              <span className="text-caption font-medium">{t.downloadImage}</span>
            </button>
          </div>

          {/* App Promotion - Centered Logo & Better Branding */}
          <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border-t border-brand-primary/20 px-6 py-4">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <Logo size="sm" />
              </div>
              <p className="text-micro text-white/70">{t.discoverNewWays}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
