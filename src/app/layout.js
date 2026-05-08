import { Syne, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MarketTicker from '@/components/MarketTicker'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500'],
})

export const metadata = {
  title: 'Ferguson Growth Capital — Invest in Nigeria\'s Growth',
  description: 'Live market dashboard, transparent reporting, and 20–40% target returns from Nigerian SME private equity.',
  openGraph: {
    title: 'Ferguson Growth Capital — Private Equity Investment Fund',
    description: 'Ferguson Growth Capital invests in high-growth Nigerian SMEs, generating attractive returns for investors.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ferguson Growth Capital — Private Equity Investment Fund',
    description: 'Ferguson Growth Capital invests in high-growth Nigerian SMEs, generating attractive returns for investors.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-brand-dark text-brand-text antialiased noise">
        <div className="mesh-bg min-h-screen">
          <Navbar />
          <MarketTicker />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
