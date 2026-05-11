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

  const related = service.relatedServices
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean) as typeof services

  // Safe: JSON.stringify of a static object built from content/services.json — no user input
  const faqSchemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchemaJson }} />

      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-700">Начало</Link>
          {' > '}
          <Link href="/uslugi" className="hover:text-blue-700">Услуги</Link>
          {' > '}
          <span className="text-gray-900">{service.title}</span>
        </nav>

        {/* H1 */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{service.icon}</span>
          <h1 className="text-4xl font-bold text-gray-900">{service.title} в София</h1>
        </div>

        {/* Lead paragraph */}
        <p className="text-gray-600 text-lg mb-6 max-w-2xl">{service.description}</p>

        {/* Primary CTA */}
        <a
          href={`tel:${PHONE}`}
          className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-xl text-lg mb-10 transition-colors"
        >
          📞 Обади се сега — {PHONE_DISPLAY}
        </a>

        {/* Long description — split on blank lines to render as paragraphs */}
        <div className="mb-10">
          {service.longDescription.split('\n\n').map((para, i) => (
            <p key={i} className="text-gray-700 leading-relaxed mb-4">{para}</p>
          ))}
        </div>

        {/* Features */}
        <div className="bg-gray-50 rounded-xl p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Какво включва услугата</h2>
          <ul className="space-y-2">
            {service.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-gray-700">
                <span className="text-green-600 font-bold mt-0.5">✓</span>{f}
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Често задавани въпроси</h2>
          <div className="space-y-4">
            {service.faq.map((item, i) => (
              <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-semibold text-gray-900 hover:bg-gray-50 list-none">
                  <span>{item.question}</span>
                  <span className="ml-4 text-blue-700 text-xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-4 pt-2 text-gray-600 border-t border-gray-100">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Related services */}
        {related.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Свързани услуги</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/uslugi/${rel.slug}`}
                  className="flex items-center gap-3 border border-gray-200 rounded-xl p-4 hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <span className="text-2xl">{rel.icon}</span>
                  <span className="font-medium text-gray-800 text-sm">{rel.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="bg-blue-700 text-white rounded-xl p-6 text-center">
          <p className="font-semibold mb-1">Имате въпрос или искате оферта?</p>
          <p className="text-blue-200 text-sm mb-4">Отговаряме веднага — работим 24/7</p>
          <a
            href={`tel:${PHONE}`}
            className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-3 rounded-lg transition-colors"
          >
            📞 {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </>
  )
}
