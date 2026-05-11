import type { Metadata } from 'next'
import { generateMeta, NAP, PHONE, PHONE_DISPLAY, EMAIL } from '@/lib/metadata'

export const metadata: Metadata = generateMeta({
  title: 'Контакти | Николов инжинеринг | Електротехник София',
  description: `Свържете се с Николов инжинеринг — лицензиран електротехник в София. ☎ ${PHONE_DISPLAY}`,
  path: '/kontakti',
})

export default function KontaktiPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Контакти</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Телефон</p>
            <a href={`tel:${PHONE}`} className="text-2xl font-extrabold text-blue-700 hover:text-blue-600">
              {PHONE_DISPLAY}
            </a>
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
            <p className="text-gray-700">Понеделник – Петък: 08:00 – 20:00</p>
            <p className="text-gray-700">Събота: 09:00 – 17:00</p>
            <p className="text-amber-600 font-semibold">Аварии: 24 часа / 7 дни</p>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden shadow-lg" style={{ minHeight: '280px' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46802.06438432044!2d23.2688!3d42.6977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8682cb317bf5%3A0x400a01269bf5e60!2sSofia%2C%20Bulgaria!5e0!3m2!1sen!2sbg!4v1"
            width="100%"
            height="280"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Карта на София — Николов инжинеринг"
          />
        </div>
      </div>
    </div>
  )
}
