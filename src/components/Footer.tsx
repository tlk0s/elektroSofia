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
          <div className="flex gap-3 mt-4">
            <a
              href="https://www.facebook.com/profile.php?id=61592049278115"
              target="_blank"
              rel="noopener noreferrer me"
              aria-label="Facebook — Николов инженеринг"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.12 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/nikolovengineering/"
              target="_blank"
              rel="noopener noreferrer me"
              aria-label="Instagram — Николов инженеринг"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 01-1.38-.9 3.72 3.72 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm6.4-10.4a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
              </svg>
            </a>
          </div>
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
