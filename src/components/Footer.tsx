import Link from 'next/link'
import { NAP, PHONE, PHONE_DISPLAY } from '@/lib/metadata'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="text-white font-bold text-lg mb-2">
            Николов инжинеринг — {NAP.address}
          </p>
          <a href={`tel:${PHONE}`} className="text-amber-400 font-bold mt-2 block hover:text-amber-300">
            {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${NAP.email}`} className="text-sm hover:text-white">{NAP.email}</a>
        </div>
        <div>
          <p className="text-white font-semibold mb-2">Работно време</p>
          <p className="text-sm">Понеделник – Петък: 08:00 – 20:00</p>
          <p className="text-sm">Събота: 09:00 – 17:00</p>
          <p className="text-sm text-amber-400">Аварии: 24/7</p>
        </div>
        <div>
          <p className="text-white font-semibold mb-2">Бързи връзки</p>
          <ul className="space-y-1 text-sm">
            <li><Link href="/uslugi" className="hover:text-white">Услуги</Link></li>
            <li><Link href="/za-nas" className="hover:text-white">За нас</Link></li>
            <li><Link href="/kontakti" className="hover:text-white">Контакти</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 mt-8 pt-4 border-t border-gray-700 text-xs text-center">
        &copy; {new Date().getFullYear()} Всички права запазени.
      </div>
    </footer>
  )
}
