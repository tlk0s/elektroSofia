import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SchemaOrg from '@/components/SchemaOrg'
import EmergencyBar from '@/components/EmergencyBar'
import { BASE_URL, PHONE, PHONE_DISPLAY, EMAIL } from '@/lib/metadata'
import { BASE_PATH } from '@/lib/asset-path'

export const metadata: Metadata = {
  title: {
    default: 'Николов инжинеринг | Електротехник София | +359 88 888 8888',
    template: '%s | Николов инжинеринг',
  },
  description: `Лицензиран електротехник в София. Смяна на табло, нова инсталация, авариен електротехник 24/7. Обадете се: ${PHONE_DISPLAY}`,
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: `${BASE_PATH}/favicon.png`,
    apple: `${BASE_PATH}/apple-touch-icon.png`,
  },
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
        <link rel="sitemap" type="application/xml" href={`${BASE_PATH}/sitemap.xml`} />
      </head>
      <body className="bg-slate-50 pb-20">
        <Header />
        <main>{children}</main>
        <Footer />
        <EmergencyBar phone={PHONE} phoneDisplay={PHONE_DISPLAY} email={EMAIL} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-VE056CYH3H');window.addEventListener('load',function(){var s=document.createElement('script');s.src='https://www.googletagmanager.com/gtag/js?id=G-VE056CYH3H';document.head.appendChild(s)})`,
          }}
        />
      </body>
    </html>
  )
}
