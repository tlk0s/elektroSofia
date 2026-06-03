'use client'

import { useState, useEffect } from 'react'
import { PHONE, PHONE_DISPLAY } from '@/lib/metadata'

const DISMISSED_KEY = 'emergency-bar-dismissed'

const phoneDigits = PHONE.replace(/\D/g, '')
const whatsappNumber = phoneDigits.startsWith('0')
  ? '359' + phoneDigits.slice(1)
  : phoneDigits

export default function EmergencyBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem(DISMISSED_KEY)) {
      setVisible(true)
    }
  }, [])

  function dismiss() {
    sessionStorage.setItem(DISMISSED_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="complementary"
      aria-label="Авариен контакт"
      className="fixed bottom-0 left-0 right-0 z-50 bg-red-700 text-white shadow-2xl"
    >
      <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="flex items-center gap-1.5 text-sm font-bold whitespace-nowrap">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
            ОНЛАЙН 24/7
          </span>
          <span className="text-red-100 text-sm">
            Авария? Реагираме до 60 мин — денонощно
          </span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center gap-1.5 bg-white text-red-700 font-extrabold text-sm px-4 py-2 rounded-lg hover:bg-red-50 transition-colors animate-pulse"
            aria-label={`Обади се: ${PHONE_DISPLAY}`}
          >
            📞 Обади се — 24/7
          </a>
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center gap-1.5 bg-red-900 text-white font-extrabold text-sm px-3 py-2 rounded-lg hover:bg-red-800 transition-colors"
            aria-label={`Спешно обаждане — Авария: ${PHONE_DISPLAY}`}
          >
            🆘 АВАРИЯ
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-9 h-9 bg-green-600 hover:bg-green-500 rounded-lg text-white transition-colors"
            aria-label={`WhatsApp: ${PHONE_DISPLAY}`}
          >
            <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
              <path d="M16 1C7.73 1 1 7.73 1 16c0 2.65.69 5.14 1.9 7.3L1 31l7.89-1.87A14.94 14.94 0 0 0 16 31c8.27 0 15-6.73 15-15S24.27 1 16 1zm0 27.5c-2.36 0-4.6-.64-6.53-1.76l-.47-.28-4.68 1.11 1.13-4.56-.3-.48A12.44 12.44 0 0 1 3.5 16C3.5 9.1 9.1 3.5 16 3.5S28.5 9.1 28.5 16 22.9 28.5 16 28.5zm6.84-9.3c-.37-.19-2.2-1.09-2.54-1.21-.34-.12-.58-.18-.83.18-.25.37-.95 1.21-1.17 1.46-.21.25-.43.27-.8.09-.37-.18-1.55-.57-2.96-1.82-1.09-.97-1.83-2.17-2.05-2.54-.21-.37-.02-.57.16-.75.16-.16.37-.43.55-.64.18-.21.24-.37.37-.61.12-.25.06-.46-.03-.64-.09-.18-.83-2-.14-2.74-.22-.58-.45-.5-.62-.51l-.53-.01c-.24 0-.63.09-.96.45-.33.37-1.27 1.24-1.27 3.02s1.3 3.51 1.48 3.75c.18.25 2.56 3.91 6.2 5.48.87.38 1.54.6 2.07.77.87.28 1.66.24 2.28.15.7-.11 2.15-.88 2.45-1.73.3-.85.3-1.58.21-1.73-.09-.15-.33-.24-.7-.43z"/>
            </svg>
          </a>
          <button
            onClick={dismiss}
            className="ml-1 text-red-200 hover:text-white text-xl leading-none p-1"
            aria-label="Затвори аварийната лента"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}
