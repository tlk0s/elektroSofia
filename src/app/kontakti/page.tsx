import type { Metadata } from 'next'
import { generateMeta, NAP, PHONE_DISPLAY, EMAIL, BASE_URL, business } from '@/lib/metadata'
import CallButtons from '@/components/CallButtons'

export const metadata: Metadata = generateMeta({
  title: 'Контакти — Електротехник София',
  description: `Свържете се с Николов инженеринг — лицензиран електротехник в София. ☎ ${PHONE_DISPLAY}`,
  path: '/kontakti',
})

// Static schema objects — no user input, safe for dangerouslySetInnerHTML
const contactPageSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Контакти — Николов инженеринг',
  url: `${BASE_URL}/kontakti/`,
  mainEntity: {
    '@type': 'Electrician',
    name: NAP.name,
    telephone: business.phone,
    email: NAP.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Йоан Екзарх 13',
      addressLocality: 'София',
      addressRegion: 'ж.к. Лозенец',
      postalCode: '1421',
      addressCountry: 'BG',
    },
  },
})

const breadcrumbSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Начало', item: `${BASE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Контакти', item: `${BASE_URL}/kontakti/` },
  ],
})

const CONTACT_FAQS = [
  {
    q: 'Как да се свържа при авария?',
    a: 'Обадете се директно на телефон +359 899 887 752. Работим 24/7 — включително събота, неделя и празници. Реагираме до 60 минути в рамките на София.',
  },
  {
    q: 'Правите ли безплатен оглед?',
    a: 'Да — огледът и консултацията са безплатни за всеки обект. Таксуваме само извършената работа и вложените материали.',
  },
  {
    q: 'В кои квартали работите?',
    a: 'Обслужваме целия град София — Люлин, Младост, Лозенец, Надежда, Витоша, Красно село, Овча купел, Студентски град, Дружба, Оборище и всички останали квартали.',
  },
]

export default function KontaktiPage() {
  const { workingHours } = business
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: contactPageSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />

      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Контакти</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-3">Телефон</p>
              <CallButtons size="sm" vertical />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Имейл</p>
              <a href={`mailto:${EMAIL}`} className="text-blue-700 hover:underline">{EMAIL}</a>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Адрес</p>
              <p className="text-gray-700">{NAP.address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Работно време</p>
              <p className="text-gray-700">{workingHours.weekdays}</p>
              <p className="text-gray-700">{workingHours.saturday}</p>
              <p className="text-amber-600 font-semibold">{workingHours.emergency}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Лиценз</p>
              <p className="text-gray-700">№ {business.licenseNumber}</p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg" style={{ minHeight: '280px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.245233368819!2d23.32218497738266!3d42.67734737116522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa85a9fdacc409%3A0x367f4182727ab67d!2z0LYu0LouINCb0L7Qt9C10L3QtdGGLCDRg9C7LiDigJ7QmdC-0LDQvSDQldC60LfQsNGA0YXigJwgMTMsIDE0MjEg0KHQvtGC0LjRjywg0JHRitC70LPQsNGA0LjRjw!5e0!3m2!1sbg!2sus!4v1782840302021!5m2!1sbg!2sus"
              width="100%"
              height="280"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Карта на София — Николов инженеринг"
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Зона на обслужване</h2>
          <p className="text-gray-600 mb-3">
            Обслужваме всички квартали на Sofia — при авариен случай покриваме целия град в рамките на 60 минути.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Люлин', 'Младост', 'Лозенец', 'Надежда', 'Витоша', 'Красно село',
              'Овча купел', 'Студентски град', 'Дружба', 'Оборище', 'Банишора',
              'Сердика', 'Слатина', 'Искър'].map((area) => (
              <span key={area} className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                {area}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Често задавани въпроси</h2>
          <div className="space-y-4">
            {CONTACT_FAQS.map((item) => (
              <details key={item.q} className="group border border-gray-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-semibold text-gray-900 hover:bg-gray-50 list-none">
                  <span>{item.q}</span>
                  <span className="ml-4 text-blue-700 text-xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-4 pt-2 text-gray-600 border-t border-gray-100">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
