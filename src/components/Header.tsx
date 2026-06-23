import Link from 'next/link'
import Image from 'next/image'
import { assetPath } from '@/lib/metadata'
import CallButtons from '@/components/CallButtons'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-700 shrink-0">
          <Image src={assetPath('logo.png')} alt="Николов инжинеринг лого" width={42} height={48} />
          <span className="hidden sm:inline">Николов инжинеринг</span>
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
        <div className="shrink-0">
          <CallButtons size="sm" />
        </div>
      </div>
    </header>
  )
}
