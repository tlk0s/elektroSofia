import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SchemaOrg from '@/components/SchemaOrg'
import { BASE_URL, PHONE_DISPLAY } from '@/lib/metadata'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: {
    default: 'Николов инжинеринг | Електротехник София | +359 88 888 8888',
    template: '%s | Николов инжинеринг',
  },
  description: `Лицензиран електротехник в София. Смяна на табло, нова инсталация, авариен електротехник 24/7. Обадете се: ${PHONE_DISPLAY}`,
  metadataBase: new URL(BASE_URL),
  other: {
    'geo.region': 'BG-SO',
    'geo.placename': 'Sofia',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg">
      <head>
        <SchemaOrg />
      </head>
      <body className={`${inter.className} bg-slate-50`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
