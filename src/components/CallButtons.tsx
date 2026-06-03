import { PHONE, PHONE_DISPLAY } from '@/lib/metadata'

const phoneDigits = PHONE.replace(/\D/g, '')
const whatsappNumber = phoneDigits.startsWith('0')
  ? '359' + phoneDigits.slice(1)
  : phoneDigits

function ViberLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M26.16 5.39C23.31 2.67 19.1 1.27 14.27 1.33 6.64 1.33 1.67 6.27 1.67 13.85c0 2.62.7 5.17 2.03 7.41L1.5 30.5l9.47-2.48c2.15 1.17 4.58 1.79 7.05 1.79h.01c7.62 0 12.64-4.94 12.64-12.52.01-3.34-1.3-6.48-4.51-9.9zM14.28 27.06h-.01c-2.22 0-4.4-.6-6.3-1.73l-.45-.27-4.68 1.23 1.25-4.57-.29-.47a11.7 11.7 0 0 1-1.79-6.37c0-6.47 4.32-10.74 10.27-10.74 2.74 0 5.32 1.07 7.26 3.01 1.93 1.94 3.03 4.52 3.02 7.27-.01 5.67-3.62 9.64-10.28 9.64zm5.63-7.22c-.3-.15-1.8-.89-2.08-.99-.28-.1-.48-.15-.68.15-.2.3-.78.99-.96 1.19-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.64-.93-2.24-.24-.59-.49-.51-.68-.52l-.58-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z"/>
    </svg>
  )
}

function WhatsAppLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16 1C7.73 1 1 7.73 1 16c0 2.65.69 5.14 1.9 7.3L1 31l7.89-1.87A14.94 14.94 0 0 0 16 31c8.27 0 15-6.73 15-15S24.27 1 16 1zm0 27.5c-2.36 0-4.6-.64-6.53-1.76l-.47-.28-4.68 1.11 1.13-4.56-.3-.48A12.44 12.44 0 0 1 3.5 16C3.5 9.1 9.1 3.5 16 3.5S28.5 9.1 28.5 16 22.9 28.5 16 28.5zm6.84-9.3c-.37-.19-2.2-1.09-2.54-1.21-.34-.12-.58-.18-.83.18-.25.37-.95 1.21-1.17 1.46-.21.25-.43.27-.8.09-.37-.18-1.55-.57-2.96-1.82-1.09-.97-1.83-2.17-2.05-2.54-.21-.37-.02-.57.16-.75.16-.16.37-.43.55-.64.18-.21.24-.37.37-.61.12-.25.06-.46-.03-.64-.09-.18-.83-2-.14-2.74-.22-.58-.45-.5-.62-.51l-.53-.01c-.24 0-.63.09-.96.45-.33.37-1.27 1.24-1.27 3.02s1.3 3.51 1.48 3.75c.18.25 2.56 3.91 6.2 5.48.87.38 1.54.6 2.07.77.87.28 1.66.24 2.28.15.7-.11 2.15-.88 2.45-1.73.3-.85.3-1.58.21-1.73-.09-.15-.33-.24-.7-.43z"/>
    </svg>
  )
}

interface Props {
  size?: 'sm' | 'lg'
  vertical?: boolean
}

export default function CallButtons({ size = 'lg', vertical = false }: Props) {
  const isLg = size === 'lg'

  const phoneClass = isLg
    ? 'inline-flex items-center gap-2 font-extrabold px-6 py-3 rounded-xl transition-colors text-white bg-red-600 hover:bg-red-500 text-base animate-pulse'
    : 'inline-flex items-center gap-2 font-extrabold px-4 py-2.5 rounded-lg transition-colors text-white bg-red-600 hover:bg-red-500 text-sm animate-pulse'

  const sosClass = isLg
    ? 'inline-flex items-center gap-2 font-extrabold px-5 py-3 rounded-xl transition-colors text-white bg-red-800 hover:bg-red-700 text-base'
    : 'inline-flex items-center gap-2 font-extrabold px-3 py-2.5 rounded-lg transition-colors text-white bg-red-800 hover:bg-red-700 text-sm'

  const iconClass = isLg
    ? 'inline-flex items-center justify-center w-11 h-11 rounded-xl transition-colors text-white'
    : 'inline-flex items-center justify-center w-9 h-9 rounded-lg transition-colors text-white'

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
        className={`${iconClass} bg-violet-600 hover:bg-violet-500`}
        title={`Viber: ${PHONE_DISPLAY}`}
        aria-label={`Обади се чрез Viber: ${PHONE_DISPLAY}`}
      >
        <ViberLogo />
      </a>
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${iconClass} bg-green-600 hover:bg-green-500`}
        title={`WhatsApp: ${PHONE_DISPLAY}`}
        aria-label={`Обади се чрез WhatsApp: ${PHONE_DISPLAY}`}
      >
        <WhatsAppLogo />
      </a>
    </div>
  )
}
