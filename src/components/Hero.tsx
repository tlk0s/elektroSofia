import Image from 'next/image'
import { PHONE, PHONE_DISPLAY } from '@/lib/metadata'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 px-4 overflow-hidden">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Електротехник в София
          </h1>
          <p className="text-xl text-blue-100 mb-2">
            Бърза помощ 24/7 · Лицензиран · Гарантирана работа
          </p>
          <p className="text-blue-200 mb-8">
            Смяна на табло, нова инсталация, авариен електротехник и още.
          </p>
          <a
            href={`tel:${PHONE}`}
            className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-extrabold text-xl px-8 py-4 rounded-xl shadow-lg transition-colors"
          >
            Обади се сега — {PHONE_DISPLAY}
          </a>
        </div>
        <div className="flex-shrink-0 w-72 h-72 relative rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80"
            alt="Лицензиран електротехник в София"
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
