import { readFileSync } from 'fs'
import { join } from 'path'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BASE_URL, generateMeta } from '@/lib/metadata'
import CallButtons from '@/components/CallButtons'

interface Kvartal {
  slug: string
  name: string
  metaTitle: string
  metaDescription: string
  description: string
  angle: string
}

function loadKvartali(): Kvartal[] {
  const raw = readFileSync(join(process.cwd(), 'content/kvartali.json'), 'utf-8')
  return JSON.parse(raw).kvartali
}

export function generateStaticParams() {
  return loadKvartali().map((k) => ({ slug: k.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const kvartal = loadKvartali().find((k) => k.slug === params.slug)
  if (!kvartal) return {}
  return generateMeta({
    title: kvartal.metaTitle,
    description: kvartal.metaDescription,
    path: `/kvartali/${kvartal.slug}/`,
  })
}

const SERVICES = [
  { slug: 'avariyen-elektrotehnik-sofia', label: 'Авариен електротехник 24/7' },
  { slug: 'smyana-tabla-sofia', label: 'Смяна на табло' },
  { slug: 'nova-instalaciya-sofia', label: 'Нова инсталация' },
  { slug: 'montaj-osvetlenie-sofia', label: 'Монтаж на осветление' },
]

export default function KvartalPage({ params }: { params: { slug: string } }) {
  const kvartali = loadKvartali()
  const kvartal = kvartali.find((k) => k.slug === params.slug)
  if (!kvartal) notFound()

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Начало', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Квартали', item: `${BASE_URL}/kvartali/` },
      { '@type': 'ListItem', position: 3, name: kvartal.name, item: `${BASE_URL}/kvartali/${kvartal.slug}/` },
    ],
  })

  const localSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    name: 'Николов инжинеринг',
    url: BASE_URL,
    telephone: '+359899887752',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: kvartal.name,
      containedInPlace: { '@type': 'City', name: 'София' },
    },
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: localSchema }} />

      <div className="mx-auto max-w-4xl px-4 py-12">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-700">Начало</Link>
          {' > '}
          <span className="text-gray-900">Електротехник {kvartal.name}</span>
        </nav>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Електротехник {kvartal.name} — Николов инжинеринг
        </h1>

        <p className="text-gray-600 text-lg mb-6 max-w-2xl">{kvartal.description}</p>

        <div className="flex flex-wrap gap-3 mb-10">
          <CallButtons size="lg" />
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Услуги в {kvartal.name}
          </h2>
          <ul className="space-y-2">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/uslugi/${s.slug}/`}
                  className="flex items-center gap-2 text-blue-700 hover:underline"
                >
                  <span className="text-green-600 font-bold">✓</span>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Авария в {kvartal.name}?</h2>
          <p className="text-gray-600 text-sm mb-4">
            Реагираме до 60 минути — денонощно, 24/7, включително събота и неделя.
          </p>
          <CallButtons size="lg" />
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Защо Николов инжинеринг?</h2>
          <ul className="space-y-3 text-gray-700">
            {[
              'Лицензиран електротехник с 15+ години опит',
              'Издаваме протокол и даваме писмена гаранция',
              'Работим с качествени материали — Legrand, Schneider Electric, ABB',
              'Безплатен оглед и оферта за всеки обект',
              'Аварийна помощ 24/7 — реакция до 60 минути',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-blue-700 text-white rounded-xl p-6 text-center">
          <p className="font-semibold mb-1">Искате оферта за {kvartal.name}?</p>
          <p className="text-blue-200 text-sm mb-4">Обадете се — консултираме безплатно</p>
          <div className="flex flex-wrap justify-center gap-3">
            <CallButtons size="lg" />
          </div>
        </div>
      </div>
    </>
  )
}
