import type { Metadata } from 'next'
import ServiceCard from '@/components/ServiceCard'
import { services } from '@/data/services'
import { generateMeta, PHONE, PHONE_DISPLAY } from '@/lib/metadata'

export const metadata: Metadata = generateMeta({
  title: 'Електрически услуги София | Николов инжинеринг',
  description: `Смяна на табло, нова инсталация, авариен електротехник и още в София. ☎ ${PHONE_DISPLAY}`,
  path: '/uslugi',
})

export default function UslugiPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Електрически услуги в София</h1>
      <p className="text-gray-600 mb-10 max-w-2xl">
        Пълен спектър от електротехнически услуги за жилища, офиси и промишлени обекти в София.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
      </div>
      <div className="bg-blue-50 rounded-2xl p-8 text-center">
        <p className="text-lg font-semibold text-gray-900 mb-4">Не намирате услугата? Обадете се!</p>
        <a href={`tel:${PHONE}`} className="inline-block bg-amber-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-amber-400 transition-colors">
          📞 {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  )
}
