import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { services, getServiceBySlug } from '@/data/services'
import { PHONE, PHONE_DISPLAY } from '@/lib/metadata'

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = getServiceBySlug(params.slug)
  if (!service) return {}
  return { title: service.metaTitle, description: service.metaDescription }
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug)
  if (!service) notFound()

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-700">Начало</Link>{' > '}
        <Link href="/uslugi" className="hover:text-blue-700">Услуги</Link>{' > '}
        <span className="text-gray-900">{service.title}</span>
      </nav>
      <div className="flex items-center gap-4 mb-4">
        <span className="text-5xl">{service.icon}</span>
        <h1 className="text-4xl font-bold text-gray-900">{service.title} в София</h1>
      </div>
      <p className="text-gray-600 text-lg mb-6 max-w-2xl">{service.description}</p>
      <a href={`tel:${PHONE}`} className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-xl text-lg mb-10 transition-colors">
        📞 Обади се сега — {PHONE_DISPLAY}
      </a>
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Какво включва услугата</h2>
        <ul className="space-y-2">
          {service.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold mt-0.5">✓</span>{f}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-blue-700 text-white rounded-xl p-6 text-center">
        <p className="font-semibold mb-3">Имате въпрос или искате оферта?</p>
        <a href={`tel:${PHONE}`} className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-3 rounded-lg transition-colors">
          📞 {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  )
}
