import { PHONE, PHONE_DISPLAY, EMAIL } from '@/lib/metadata'

const phoneDigits = PHONE.replace(/\D/g, '')
const whatsappNumber = phoneDigits.startsWith('0')
  ? '359' + phoneDigits.slice(1)
  : phoneDigits

function ViberIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" aria-hidden="true">
      <rect width="512" height="512" rx="100" fill="#7B519D"/>
      <path
        fill="#fff"
        d="M389.7 120.1C357.3 90.5 311.4 75 256.2 75h-.4C200.2 75 154 90.5 121.3 120.1 91 148.4 74.5 187.3 73.9 233.6c-.5 36.4 10.3 70.5 31.2 98.1v47.5c0 5.7 4.6 10.3 10.3 10.3h47.8c27.6 21 59.8 31.9 93.4 31.9h.4c38.4 0 74.9-13.5 103.5-38.1 31-26.7 49.8-64.2 52.9-105.5 3.3-44.3-8.9-87.3-23.7-158.7zm-39.3 219.4c-24.9 23-56.5 35.7-88.2 35.7h-.3c-29.8 0-58.3-9.4-82.4-27.1l-3.6-2.6H133v-43.9l-2.6-3.6c-17.6-24.3-26.9-52.9-26.4-82.9.5-38.8 14-70.7 39-92.5 25.3-22 60.2-33.5 101-33.5h.4c40.8 0 75.7 11.5 101 33.5 23.8 21 38.1 51.7 38.8 82.6.1 1.2.2 2.4.2 3.7.1 34.9-12.7 100.3-33 128.6z"
      />
      <path
        fill="#fff"
        d="M311.8 296.5l-17.3-10c-5.2-3-11-4.6-16.9-4.6-6.5 0-12.8 1.9-18.2 5.5-4 2.6-8.5 6.6-13.5 12.1-26.5-9.8-57.4-40.7-67.2-67.2 5.5-5 9.5-9.5 12.1-13.5 5.1-7.8 6.4-17.5 3.4-26.4l-9.7-29.6c-2.7-8.1-9.6-13.7-18.2-14.5-1.2-.1-2.5-.2-3.7-.2-8 0-15.7 2.8-21.8 8-8.4 7.2-13.5 16.8-14.6 27.6-3.3 33.1 14.3 77.8 50.8 114.3 36.5 36.5 81.2 54.1 114.3 50.8 10.8-1.1 20.4-6.2 27.6-14.6 7.4-8.6 9.8-19.9 6.5-30.5-1.1-3.7-4.1-6.4-13.6-7.2z"
      />
    </svg>
  )
}

function WhatsAppIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" aria-hidden="true">
      <rect width="512" height="512" rx="100" fill="#25D366"/>
      <path
        fill="#fff"
        d="M256 80C159 80 80 159 80 256c0 32.7 8.8 63.4 24.2 89.7L80 432l88.3-23.1C194.6 423.2 225 432 256 432c97 0 176-79 176-176S353 80 256 80zm0 322c-28 0-54.5-7.8-77.2-21.4l-5.5-3.3-57.2 15 15.3-55.7-3.6-5.7C113.8 309.6 106 283.6 106 256c0-82.8 67.2-150 150-150s150 67.2 150 150-67.2 150-150 150zm82.2-112.2c-4.5-2.3-26.6-13.1-30.7-14.6-4.1-1.5-7.1-2.3-10.1 2.3-3 4.6-11.5 14.6-14.1 17.6-2.6 3-5.1 3.4-9.6 1.1-4.5-2.3-19-7-36.2-22.3-13.4-11.9-22.4-26.6-25-31.1-2.6-4.5-.3-7 1.9-9.2 2-2 4.5-5.2 6.8-7.8 2.3-2.6 3-4.5 4.5-7.5 1.5-3 .8-5.6-.4-7.8-1.1-2.3-10.1-24.3-13.8-33.3-3.6-8.7-7.3-7.5-10.1-7.6-2.6-.1-5.6-.2-8.6-.2s-7.8 1.1-11.9 5.6c-4.1 4.5-15.6 15.3-15.6 37.3s16 43.3 18.2 46.3c2.3 3 31.5 48.1 76.3 67.4 42.5 17.6 42.5 11.7 50.2 11 7.8-.8 25.1-10.3 28.6-20.2 3.6-9.9 3.6-18.4 2.5-20.2-1.1-1.8-4.1-3-8.7-5.4z"
      />
    </svg>
  )
}

function EmailIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" aria-hidden="true">
      <rect width="512" height="512" rx="100" fill="#EA4335"/>
      <path
        fill="#fff"
        d="M96 160h320v192a32 32 0 0 1-32 32H128a32 32 0 0 1-32-32V160zm160 110 152-110H104l152 110z"
      />
    </svg>
  )
}

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
        <ViberIcon size={iconPx} />
      </a>
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className={iconClass}
        title={`WhatsApp: ${PHONE_DISPLAY}`}
        aria-label={`Обади се чрез WhatsApp: ${PHONE_DISPLAY}`}
      >
        <WhatsAppIcon size={iconPx} />
      </a>
      <a
        href={`mailto:${EMAIL}`}
        className={iconClass}
        title={`Имейл: ${EMAIL}`}
        aria-label={`Изпрати имейл до: ${EMAIL}`}
      >
        <EmailIcon size={iconPx} />
      </a>
    </div>
  )
}
