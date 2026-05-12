import type { Metadata } from 'next'
import ServiceCard from '@/components/ServiceCard'
import { services } from '@/data/services'
import { generateMeta, PHONE_DISPLAY } from '@/lib/metadata'
import CallButtons from '@/components/CallButtons'

export const metadata: Metadata = generateMeta({
  title: 'Електрически услуги София | Николов инжинеринг',
  description: `Смяна на табло, нова инсталация, авариен електротехник и още в София. ☎ ${PHONE_DISPLAY}`,
  path: '/uslugi',
})

// Safe: static object, no user input
const breadcrumbSchemaJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Начало', item: 'https://elektrotehnik-sofia.bg/' },
    { '@type': 'ListItem', position: 2, name: 'Услуги', item: 'https://elektrotehnik-sofia.bg/uslugi/' },
  ],
})

export default function UslugiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchemaJson }} />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Електрически услуги в София</h1>
        <p className="text-gray-600 mb-6 max-w-2xl">
          Пълен спектър от електротехнически услуги за жилища, офиси и промишлени обекти в София. Лицензиран електротехник с 15+ години опит, бърза реакция и гаранция на всеки обект.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Всичко за вашата електрическа инсталация</h2>
          <div className="space-y-3 text-gray-600 leading-relaxed text-sm">
            <p>
              Николов инжинеринг предлага пълен обхват от електротехнически услуги в София — от аварийна помощ при скъсана фаза до цялостна нова инсталация при ремонт. Работим с жилищни, офисни и промишлени обекти в целия град.
            </p>
            <p>
              Всяка услуга се изпълнява от правоспособен електротехник с лиценз, издаваме протокол за изпълнена работа и даваме гаранция. Материалите са от сертифицирани доставчици — Legrand, Schneider Electric, ABB.
            </p>
            <p>
              За авариите работим денонощно — 24 часа, 7 дни в седмицата, включително събота, неделя и официални празници. Реакция до 60 минути в повечето квартали на София.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-8 text-center">
          <p className="text-lg font-semibold text-gray-900 mb-2">Не намирате услугата? Обадете се!</p>
          <p className="text-gray-500 text-sm mb-4">Консултираме безплатно и даваме оферта след оглед</p>
          <div className="flex flex-wrap justify-center gap-3">
            <CallButtons size="lg" />
          </div>
        </div>
      </div>
    </>
  )
}
