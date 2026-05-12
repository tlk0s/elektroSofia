import Link from 'next/link'
import { NAP, business } from '@/lib/metadata'
import CallButtons from '@/components/CallButtons'

export default function Footer() {
  const { workingHours } = business
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="text-white font-bold text-lg mb-3">
            {NAP.name} — {NAP.address}
          </p>
          <CallButtons size="sm" vertical />
          <a href={`mailto:${NAP.email}`} className="text-sm hover:text-white mt-2 block">{NAP.email}</a>
        </div>
        <div>
          <p className="text-white font-semibold mb-2">Работно време</p>
          <p className="text-sm">{workingHours.weekdays}</p>
          <p className="text-sm">{workingHours.saturday}</p>
          <p className="text-sm text-amber-400">{workingHours.emergency}</p>
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
