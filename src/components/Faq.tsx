import { faqs, type FaqEntry } from '@/data/faq'

/**
 * Homepage FAQ. Renders a native <details> accordion AND FAQPage structured
 * data. Google requires FAQ schema content to be visible on the page, so the
 * schema is built from exactly the same entries that are rendered — never more.
 *
 * We feature the highest commercial-intent questions (emergency speed, pricing
 * /free inspection, table replacement, warranty, coverage) rather than all 20,
 * to keep the homepage focused. The service pages carry the long tail.
 */
const FEATURED_QUESTIONS = [
  'Колко бързо пристигате при авария?',
  'Проверявате ли инсталацията преди да дадете оферта?',
  'Кога трябва да се смени електрическото табло?',
  'Колко трае монтажът на ново електрическо табло?',
  'Давате ли гаранция за извършената работа?',
  'Работите ли в целия град София?',
]

function pickFeatured(): FaqEntry[] {
  // Preserve FEATURED_QUESTIONS order; skip any that were renamed in faq.json.
  return FEATURED_QUESTIONS.map((q) => faqs.find((f) => f.question === q)).filter(
    (f): f is FaqEntry => Boolean(f)
  )
}

export default function Faq() {
  const featured = pickFeatured()

  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: featured.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  })

  return (
    <section className="py-16 bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Често задавани въпроси</h2>
        <p className="text-center text-gray-500 mb-10">
          Отговори на най-честите въпроси за електротехническите ни услуги в София
        </p>
        <div className="space-y-3">
          {featured.map((f) => (
            <details
              key={f.question}
              className="group bg-white rounded-xl border border-gray-100 px-5 py-4"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
                {f.question}
                <span className="ml-4 text-blue-700 transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-gray-600 leading-relaxed">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
