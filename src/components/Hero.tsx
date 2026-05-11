import { readFileSync } from 'fs'
import { join } from 'path'
import Image from 'next/image'
import { PHONE, PHONE_DISPLAY } from '@/lib/metadata'

interface HeroContent {
  headline: string
  subheadline: string
  description: string
  ctaButton: string
  imageUrl: string
  imageAlt: string
}

function loadContent(): HeroContent {
  const raw = readFileSync(join(process.cwd(), 'content/hero.json'), 'utf-8')
  return JSON.parse(raw)
}

export default function Hero() {
  const c = loadContent()
  return (
    <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 px-4 overflow-hidden">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            {c.headline}
          </h1>
          <p className="text-xl text-blue-100 mb-2">{c.subheadline}</p>
          <p className="text-blue-200 mb-8">{c.description}</p>
          <a
            href={`tel:${PHONE}`}
            className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-extrabold text-xl px-8 py-4 rounded-xl shadow-lg transition-colors"
          >
            {c.ctaButton} — {PHONE_DISPLAY}
          </a>
        </div>
        <div className="flex-shrink-0 w-72 h-72 relative rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={c.imageUrl}
            alt={c.imageAlt}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      </div>
    </section>
  )
}
