import { readFileSync } from 'fs'
import { join } from 'path'
import type { Metadata } from 'next'
import Image from 'next/image'
import { generateMeta, PHONE, PHONE_DISPLAY } from '@/lib/metadata'

interface ZaNasContent {
  heading: string
  subheading: string
  paragraphs: string[]
  credentials: string[]
  ctaText: string
  imageUrl: string
  imageAlt: string
}

function loadContent(): ZaNasContent {
  const raw = readFileSync(join(process.cwd(), 'content/za-nas.json'), 'utf-8')
  return JSON.parse(raw)
}

export const metadata: Metadata = generateMeta({
  title: 'За нас | Николов инжинеринг | Електротехник София',
  description: `Николов инжинеринг — лицензиран електротехник в София с 15+ години опит. 500+ доволни клиента. ${PHONE_DISPLAY}`,
  path: '/za-nas',
})

export default function ZaNasPage() {
  const c = loadContent()
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{c.heading}</h1>
      <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
        <div className="w-full md:w-64 h-72 relative rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
          <Image
            src={c.imageUrl}
            alt={c.imageAlt}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{c.subheading}</h2>
          {c.paragraphs.map((p, i) => (
            <p key={i} className="text-gray-600 mb-4">{p}</p>
          ))}
          <ul className="space-y-2 text-gray-700">
            {c.credentials.map((cred) => (
              <li key={cred} className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span> {cred}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-blue-700 text-white rounded-xl p-6 text-center">
        <p className="font-semibold mb-3">{c.ctaText}</p>
        <a href={`tel:${PHONE}`} className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-3 rounded-lg transition-colors">
          📞 {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  )
}
