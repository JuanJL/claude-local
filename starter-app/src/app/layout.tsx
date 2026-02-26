import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'
import { OG_TITLE, OG_DESCRIPTION, OG_URL } from '@/lib/constants/party-details'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: OG_TITLE,
  description: OG_DESCRIPTION,
  metadataBase: new URL(OG_URL),
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    url: OG_URL,
    siteName: 'juanlacroix.com',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: OG_TITLE,
    description: OG_DESCRIPTION,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-cream text-dark">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
