import Image from 'next/image'
import { assetPath } from '@/lib/metadata'

function getWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  return digits.startsWith('0') ? '359' + digits.slice(1) : digits
}

function ViberIcon() {
  return <Image src={assetPath('icon-viber.png')} alt="Viber" width={20} height={20} unoptimized />
}

function WhatsAppIcon() {
  return <Image src={assetPath('icon-whatsapp.png')} alt="WhatsApp" width={20} height={20} unoptimized />
}

function EmailIcon() {
  return <Image src={assetPath('icon-email.png')} alt="Имейл" width={20} height={20} unoptimized />
}

interface Props {
  phone: string
  phoneDisplay: string
  email: string
}

export default function EmergencyBar({ phone, phoneDisplay, email }: Props) {
  const whatsappNumber = getWhatsAppNumber(phone)

  return (
    <div
      role="complementary"
      aria-label="Авариен контакт"
      className="fixed bottom-0 left-0 right-0 z-50 bg-red-700 text-white shadow-2xl"
    >
      <div className="mx-auto max-w-6xl px-3 py-2 flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-xs font-bold shrink-0">
          <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
          ОНЛАЙН 24/7
        </span>

        <div className="flex items-center gap-1.5 flex-wrap">
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center gap-1 bg-white text-red-800 font-extrabold text-sm px-3 py-2 rounded-lg hover:bg-red-50 transition-colors animate-pulse"
          >
            📞 Обади се — 24/7
          </a>
          <a
            href={`tel:${phone}`}
            className="hidden sm:inline-flex items-center gap-1 bg-red-900 text-white font-extrabold text-sm px-3 py-2 rounded-lg hover:bg-red-800 transition-colors"
          >
            🆘 {phoneDisplay}
          </a>
          <a
            href={`viber://chat?number=%2B${whatsappNumber}`}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg transition-opacity hover:opacity-80"
            aria-label={`Viber: ${phoneDisplay}`}
          >
            <ViberIcon />
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg transition-opacity hover:opacity-80"
            aria-label={`WhatsApp: ${phoneDisplay}`}
          >
            <WhatsAppIcon />
          </a>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg transition-opacity hover:opacity-80"
            aria-label={`Имейл: ${email}`}
            title={email}
          >
            <EmailIcon />
          </a>
        </div>
      </div>
    </div>
  )
}
