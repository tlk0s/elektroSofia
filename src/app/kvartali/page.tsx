import { readFileSync } from 'fs'
import { join } from 'path'
import type { Metadata } from 'next'
import Link from 'next/link'
import { generateMeta, PHONE_DISPLAY } from '@/lib/metadata'
import CallButtons from '@/components/CallButtons'

function loadKvartali() {
  const raw = readFileSync(join(process.cwd(), 'content/kvartali.json'), 'utf-8')
  return JSON.parse(raw).kvartali as Array<{ slug: string; name: string; angle: string }>
}

export const metadata: Metadata = generateMeta({
  title: 'Електротехник по квартали в София',
  description: `Николов инжинеринг обслужва всички квартали на София. Авариен електротехник, смяна на табло, нова инсталация. ☎ ${PHONE_DISPLAY}`,
  path: '/kvartali/',
})

export default function KvartaliIndexPage() {
  const kvartali = loadKvartali()
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-700">Начало</Link>
        {' > '}
        <span className="text-gray-900">Квартали</span>
      </nav>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Електротехник по квартали в София
      </h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Николов инжинеринг обслужва всички квартали на София с бърза реакция до 60 минути при авария.
        Изберете своя квартал за повече информация.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {kvartali.map((k) => (
          <Link
            key={k.slug}
            href={`/kvartali/${k.slug}/`}
            className="border border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            <p className="font-bold text-gray-900 mb-1">Електротехник {k.name}</p>
            <p className="text-sm text-gray-500">{k.angle}</p>
          </Link>
        ))}
      </div>

      <div className="bg-blue-700 text-white rounded-xl p-6 text-center">
        <p className="font-semibold mb-1">Вашият квартал не е в списъка?</p>
        <p className="text-blue-200 text-sm mb-4">Обслужваме целия град — обадете се</p>
        <div className="flex flex-wrap justify-center gap-3">
          <CallButtons size="lg" />
        </div>
      </div>
    </div>
  )
}
