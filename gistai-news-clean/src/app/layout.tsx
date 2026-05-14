import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GistAI News — VC, AI & Tech Intelligence',
  description: 'Real-time VC raises, AI startup news, M&A deals, and market signals. Powered by AI.',
  openGraph: {
    title: 'GistAI News',
    description: 'Real-time VC raises, AI startup news, and market intelligence.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
