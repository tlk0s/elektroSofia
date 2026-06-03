import Link from 'next/link'
import type { Service } from '@/data/services'

const EMERGENCY_SLUG = 'avariyen-elektrotehnik-sofia'

export default function ServiceCard({ service }: { service: Service }) {
  const isEmergency = service.slug === EMERGENCY_SLUG

  return (
    <Link
      href={`/uslugi/${service.slug}`}
      className={`relative block bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all border ${
        isEmergency ? 'border-red-500 ring-1 ring-red-400' : 'border-gray-100'
      }`}
    >
      {isEmergency && (
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" aria-hidden="true" />
          24/7
        </span>
      )}
      <span className="text-4xl">{service.icon}</span>
      <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">{service.title}</h3>
      <p className="text-sm text-gray-600">{service.shortDescription}</p>
      <span className={`mt-4 inline-block text-sm font-semibold ${isEmergency ? 'text-red-600' : 'text-blue-700'}`}>
        {isEmergency ? 'Обади се сега →' : 'Научи повече →'}
      </span>
    </Link>
  )
}
