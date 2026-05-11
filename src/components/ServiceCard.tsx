import Link from 'next/link'
import type { Service } from '@/data/services'

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/uslugi/${service.slug}`}
      className="block bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100"
    >
      <span className="text-4xl">{service.icon}</span>
      <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">{service.title}</h3>
      <p className="text-sm text-gray-600">{service.shortDescription}</p>
      <span className="mt-4 inline-block text-blue-700 text-sm font-semibold">Научи повече →</span>
    </Link>
  )
}
