import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '2TheStars - Interactive Position Selector',
  description: 'Enhance your relationship with interactive position selector and mystical experience',
  generator: '2TheStars',
  manifest: '/manifest.json',
  keywords: ['relationship', 'intimacy', 'position', 'selector', 'couples', 'romance'],
  authors: [{ name: '2TheStars Team' }],
  creator: '2TheStars',
  metadataBase: new URL('https://your-domain.com'), // Replace with your actual domain
  openGraph: {
    title: '2TheStars',
    description: 'Enhance your relationship with interactive position selector',
    url: 'https://your-domain.com', // Replace with your actual domain
    siteName: '2TheStars',
    images: [
      {
        url: '/icons/icon-192x192.png',
        width: 192,
        height: 192,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2TheStars',
    description: 'Enhance your relationship with interactive position selector',
    images: ['/icons/icon-192x192.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: '2TheStars',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#7c3aed',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
