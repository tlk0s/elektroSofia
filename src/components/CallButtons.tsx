import Image from 'next/image'
import { PHONE, PHONE_DISPLAY, EMAIL } from '@/lib/metadata'
import { assetPath } from '@/lib/metadata'

const phoneDigits = PHONE.replace(/\D/g, '')
const whatsappNumber = phoneDigits.startsWith('0')
  ? '359' + phoneDigits.slice(1)
  : phoneDigits

interface Props {
  size?: 'sm' | 'lg'
  vertical?: boolean
}

export default function CallButtons({ size = 'lg', vertical = false }: Props) {
  const isLg = size === 'lg'
  const iconPx = isLg ? 28 : 22

  const phoneClass = isLg
    ? 'inline-flex items-center gap-2 font-extrabold px-6 py-3 rounded-xl transition-colors text-white bg-red-600 hover:bg-red-500 text-base animate-pulse'
    : 'inline-flex items-center gap-2 font-extrabold px-4 py-2.5 rounded-lg transition-colors text-white bg-red-600 hover:bg-red-500 text-sm animate-pulse'

  const sosClass = isLg
    ? 'inline-flex items-center gap-2 font-extrabold px-5 py-3 rounded-xl transition-colors text-white bg-red-800 hover:bg-red-700 text-base'
    : 'inline-flex items-center gap-2 font-extrabold px-3 py-2.5 rounded-lg transition-colors text-white bg-red-800 hover:bg-red-700 text-sm'

  const iconClass = isLg
    ? 'inline-flex items-center justify-center w-11 h-11 rounded-xl transition-opacity hover:opacity-80'
    : 'inline-flex items-center justify-center w-9 h-9 rounded-lg transition-opacity hover:opacity-80'

  return (
    <div className={`flex ${vertical ? 'flex-col items-start' : 'flex-wrap items-center'} gap-2`}>
      <a href={`tel:${PHONE}`} className={phoneClass} aria-label={`Обади се: ${PHONE_DISPLAY}`}>
        📞 Обади се — 24/7
      </a>
      <a
        href={`tel:${PHONE}`}
        className={sosClass}
        aria-label={`Спешно обаждане — Авария: ${PHONE_DISPLAY}`}
      >
        🆘 АВАРИЯ
      </a>
      <a
        href={`viber://chat?number=%2B${whatsappNumber}`}
        className={iconClass}
        title={`Viber: ${PHONE_DISPLAY}`}
        aria-label={`Обади се чрез Viber: ${PHONE_DISPLAY}`}
      >
        <Image src={assetPath('icon-viber.png')} alt="Viber" width={iconPx} height={iconPx} unoptimized />
      </a>
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className={iconClass}
        title={`WhatsApp: ${PHONE_DISPLAY}`}
        aria-label={`Обади се чрез WhatsApp: ${PHONE_DISPLAY}`}
      >
        <Image src={assetPath('icon-whatsapp.png')} alt="WhatsApp" width={iconPx} height={iconPx} unoptimized />
      </a>
      <a
        href={`mailto:${EMAIL}`}
        className={iconClass}
        title={`Имейл: ${EMAIL}`}
        aria-label={`Изпрати имейл до: ${EMAIL}`}
      >
        <Image src={assetPath('icon-email.png')} alt="Имейл" width={iconPx} height={iconPx} unoptimized />
      </a>
    </div>
  )
}
