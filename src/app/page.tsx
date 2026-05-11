import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import TrustBar from '@/components/TrustBar'
import ServiceCard from '@/components/ServiceCard'
import HowWeWork from '@/components/HowWeWork'
import Reviews from '@/components/Reviews'
import ServiceAreas from '@/components/ServiceAreas'
import { services } from '@/data/services'
import { generateMeta, PHONE, PHONE_DISPLAY } from '@/lib/metadata'

export const metadata: Metadata = generateMeta({
  title: 'Николов инжинеринг | Електротехник София | Смяна Табло, Авариен 24/7',
  description: `Лицензиран електротехник в София. Смяна на табло, нова електрическа инсталация, авариен електротехник 24/7. Обадете се: ${PHONE_DISPLAY}`,
  path: '/',
})

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />

      {/* Services grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Нашите услуги</h2>
          <p className="text-center text-gray-500 mb-10">Пълен спектър от електротехнически услуги в София</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <HowWeWork />
      <Reviews />
      <ServiceAreas />

      {/* SEO text block — visible to Google, useful to users */}
      <section className="py-14 bg-white">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Електротехник в София — защо Николов инжинеринг?</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Търсите надежден електротехник в София за смяна на табло, нова инсталация или авариен ремонт? Николов инжинеринг работи в столицата от над 15 години и е изпълнил стотици обекта — от смяна на контакт в апартамент до цялостна електроинсталация на търговски обект.
            </p>
            <p>
              Всяка работа изпълняваме по БДС EN 60364 — действащия стандарт за ниско напрежение в България. Използваме качествени материали от водещи марки: Legrand, Schneider Electric, ABB, Hager. Издаваме протокол за изпълнена работа и даваме гаранция на всеки обект.
            </p>
            <p>
              Работим в всички квартали на София — Люлин, Младост, Витоша, Надежда, Красно село, Лозенец, Овча купел, Студентски град и другите. Аварийният ни екип е на разположение 24 часа в денонощието, 7 дни в седмицата, с реакция до 60 минути.
            </p>
            <p>
              Обадете се за безплатна консултация и оглед. Даваме точна оферта преди да започнем работа — без изненади и скрити такси.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-blue-700 text-white py-14 text-center px-4">
        <h2 className="text-3xl font-bold mb-3">Имате нужда от електротехник?</h2>
        <p className="text-blue-100 mb-6">Обадете се сега — отговаряме веднага, работим 24/7</p>
        <a
          href={`tel:${PHONE}`}
          className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-extrabold text-xl px-10 py-4 rounded-xl transition-colors"
        >
          📞 {PHONE_DISPLAY}
        </a>
      </section>
    </>
  )
}
