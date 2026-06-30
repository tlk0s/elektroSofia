import type { Metadata } from 'next'
import { generateMeta, NAP, PHONE_DISPLAY, EMAIL, business } from '@/lib/metadata'
import CallButtons from '@/components/CallButtons'

export const metadata: Metadata = generateMeta({
  title: 'Контакти | Николов инжинеринг | Електротехник София',
  description: `Свържете се с Николов инжинеринг — лицензиран електротехник в София. ☎ ${PHONE_DISPLAY}`,
  path: '/kontakti',
})

export default function KontaktiPage() {
  const { workingHours } = business
  return (
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
        </div>
        <div className="rounded-xl overflow-hidden shadow-lg" style={{ minHeight: '280px' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.245233368819!2d23.32218497738266!3d42.67732297916654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa850125da026d%3A0xc3c9071060bb1ee7!2z0YPQuy4g0JnQvtCw0L0g0JXQutC30LDRgNGFINCwIDEzLCDQti4NCi4g0JvQvtC30LXQvdC10YYsIDE0MjEg0KHQvtGE0LjRjw!5m2!1sbg!2sbg"
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
