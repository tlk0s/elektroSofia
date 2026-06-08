import Link from 'next/link'
import Image from 'next/image'
import { PHONE, PHONE_DISPLAY } from '@/lib/metadata'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-700">
          <Image src="/logo.png" alt="Николов инжинеринг лого" width={42} height={48} />
          Николов инжинеринг
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/uslugi" className="text-gray-700 hover:text-blue-700 transition-colors">
            Услуги
          </Link>
          <Link href="/galeria" className="text-gray-700 hover:text-blue-700 transition-colors">
            Галерия
          </Link>
          <Link href="/za-nas" className="text-gray-700 hover:text-blue-700 transition-colors">
            За нас
          </Link>
          <Link href="/kontakti" className="text-gray-700 hover:text-blue-700 transition-colors">
            Контакти
          </Link>
        </nav>
        <a
          href={`tel:${PHONE}`}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          {PHONE_DISPLAY}
        </a>
      </div>
    </header>
  )
}
