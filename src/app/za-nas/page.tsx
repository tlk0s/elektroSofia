import type { Metadata } from 'next'
import Image from 'next/image'
import { generateMeta, PHONE, PHONE_DISPLAY } from '@/lib/metadata'

export const metadata: Metadata = generateMeta({
  title: 'За нас | Николов инжинеринг | Електротехник София',
  description: `Николов инжинеринг — лицензиран електротехник в София с 15+ години опит. 500+ доволни клиента. ${PHONE_DISPLAY}`,
  path: '/za-nas',
})

export default function ZaNasPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">За нас</h1>
      <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
        <div className="w-full md:w-64 h-72 relative rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80"
            alt="Николов инжинеринг — лицензиран електротехник в София"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Николов инжинеринг — 15+ години опит в София</h2>
          <p className="text-gray-600 mb-4">
            Предоставяме качествени електротехнически услуги в София. Работили сме с над
            500 частни и корпоративни клиента — от смяна на контакт до цялостна инсталация.
          </p>
          <p className="text-gray-600 mb-4">
            Всяка работа изпълняваме по БДС стандарт с качествени материали. Издаваме протокол и даваме гаранция.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex gap-2"><span className="text-green-600 font-bold">✓</span> Лиценз № ЕТ-0001/2020</li>
            <li className="flex gap-2"><span className="text-green-600 font-bold">✓</span> Застраховка за гражданска отговорност</li>
            <li className="flex gap-2"><span className="text-green-600 font-bold">✓</span> Работим по БДС EN 60364</li>
            <li className="flex gap-2"><span className="text-green-600 font-bold">✓</span> Обслужваме целия град София</li>
          </ul>
        </div>
      </div>
      <div className="bg-blue-700 text-white rounded-xl p-6 text-center">
        <p className="font-semibold mb-3">Готови ли сте да започнем?</p>
        <a href={`tel:${PHONE}`} className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-3 rounded-lg transition-colors">
          📞 {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  )
}
