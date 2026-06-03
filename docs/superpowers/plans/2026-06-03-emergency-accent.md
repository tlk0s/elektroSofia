# Emergency Accent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Подсили аварийния акцент в сайта — пулсиращ SOS телефонен бутон, sticky авариена лента на всички страници, аварийната услуга първа в грида, червена карта за нея, и авариена CTA на всяка услугна страница.

**Architecture:** Шест независими промени в съществуващи файлове + един нов компонент (`EmergencyBar`). Всяка промяна е самостоятелна и може да се commit-не отделно. Не се добавят нови routes или зависимости.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, sessionStorage (за затваряне на EmergencyBar)

---

## File Map

| Файл | Действие | Отговорност |
|------|---------|-------------|
| `content/services.json` | Modify | Преместване на avariyen на позиция 0 |
| `src/components/ServiceCard.tsx` | Modify | Червена карта + 24/7 badge за аварийната услуга |
| `src/components/CallButtons.tsx` | Modify | Пулсиращ червен телефон + SOS бутон |
| `src/components/EmergencyBar.tsx` | Create | Sticky авариена лента (fixed bottom) |
| `src/app/layout.tsx` | Modify | Добавяне на EmergencyBar |
| `src/app/uslugi/[slug]/page.tsx` | Modify | Авариена CTA секция след FAQ |
| `__tests__/components/ServiceCard.test.tsx` | Modify | Тест за червена карта |
| `__tests__/components/EmergencyBar.test.tsx` | Create | Тестове за EmergencyBar |

---

## Task 1: Авариената услуга първа в JSON

**Files:**
- Modify: `content/services.json`

- [ ] **Step 1: Размести масива**

В `content/services.json` промени реда на обектите така че `"slug": "avariyen-elektrotehnik-sofia"` да е първи елемент (позиция 0), а останалите да следват в оригиналния си ред: `smyana-tabla-sofia`, `nova-instalaciya-sofia`, `montaj-osvetlenie-sofia`, `kontakti-klyuchove-sofia`, `promishleni-obekti-sofia`.

- [ ] **Step 2: Провери build**

```bash
npm run build 2>&1 | tail -20
```

Очаквано: `✓ Compiled successfully` без грешки.

- [ ] **Step 3: Commit**

```bash
git add content/services.json
git commit -m "feat: move emergency service to first position"
```

---

## Task 2: Червена карта за аварийната услуга

**Files:**
- Modify: `src/components/ServiceCard.tsx`
- Modify: `__tests__/components/ServiceCard.test.tsx`

- [ ] **Step 1: Напиши failing тест**

В `__tests__/components/ServiceCard.test.tsx` добави след съществуващите тестове:

```tsx
import { render, screen } from '@testing-library/react'
import ServiceCard from '@/components/ServiceCard'
import type { Service } from '@/data/services'

const emergencyService: Service = {
  slug: 'avariyen-elektrotehnik-sofia',
  title: 'Авариен електротехник 24/7',
  shortDescription: 'Спешна помощ при авария',
  description: 'Авариен електротехник в София',
  icon: '🚨',
  features: [],
  metaTitle: 'Авариен | SEO',
  metaDescription: 'SEO описание',
}

describe('ServiceCard — emergency variant', () => {
  it('shows 24/7 badge for emergency service', () => {
    render(<ServiceCard service={emergencyService} />)
    expect(screen.getByText('24/7')).toBeInTheDocument()
  })

  it('does not show 24/7 badge for regular service', () => {
    render(<ServiceCard service={{ ...emergencyService, slug: 'other-service' }} />)
    expect(screen.queryByText('24/7')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Стартирай теста — трябва да fail-не**

```bash
npx jest __tests__/components/ServiceCard.test.tsx --no-coverage 2>&1 | tail -20
```

Очаквано: `FAIL` — `Unable to find an element with the text: 24/7`

- [ ] **Step 3: Имплементирай промяната в ServiceCard**

Замени цялото съдържание на `src/components/ServiceCard.tsx` с:

```tsx
import Link from 'next/link'
import type { Service } from '@/data/services'

const EMERGENCY_SLUG = 'avariyen-elektrotehnik-sofia'

export default function ServiceCard({ service }: { service: Service }) {
  const isEmergency = service.slug === EMERGENCY_SLUG

  return (
    <Link
      href={`/uslugi/${service.slug}`}
      className={`relative block bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all border ${
        isEmergency ? 'border-red-500 ring-1 ring-red-400' : 'border-gray-100'
      }`}
    >
      {isEmergency && (
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" aria-hidden="true" />
          24/7
        </span>
      )}
      <span className="text-4xl">{service.icon}</span>
      <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">{service.title}</h3>
      <p className="text-sm text-gray-600">{service.shortDescription}</p>
      <span className={`mt-4 inline-block text-sm font-semibold ${isEmergency ? 'text-red-600' : 'text-blue-700'}`}>
        {isEmergency ? 'Обади се сега →' : 'Научи повече →'}
      </span>
    </Link>
  )
}
```

- [ ] **Step 4: Стартирай теста — трябва да мине**

```bash
npx jest __tests__/components/ServiceCard.test.tsx --no-coverage 2>&1 | tail -20
```

Очаквано: `PASS` — всички тестове минават.

- [ ] **Step 5: Commit**

```bash
git add src/components/ServiceCard.tsx __tests__/components/ServiceCard.test.tsx
git commit -m "feat: add emergency badge and red border to emergency service card"
```

---

## Task 3: Пулсиращ телефон + SOS бутон

**Files:**
- Modify: `src/components/CallButtons.tsx`
- Modify: `__tests__/components/TrustBar.test.tsx` — не се налага промяна

- [ ] **Step 1: Напиши failing тест**

Създай `__tests__/components/CallButtons.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import CallButtons from '@/components/CallButtons'

describe('CallButtons', () => {
  it('renders SOS emergency button', () => {
    render(<CallButtons />)
    expect(screen.getByRole('link', { name: /авария/i })).toBeInTheDocument()
  })

  it('SOS button links to tel:', () => {
    render(<CallButtons />)
    const sos = screen.getByRole('link', { name: /авария/i })
    expect(sos.getAttribute('href')).toMatch(/^tel:/)
  })

  it('phone button has animate-pulse class', () => {
    render(<CallButtons />)
    const phoneLink = screen.getByRole('link', { name: /обади се/i })
    expect(phoneLink.className).toContain('animate-pulse')
  })
})
```

- [ ] **Step 2: Стартирай теста — трябва да fail-не**

```bash
npx jest __tests__/components/CallButtons.test.tsx --no-coverage 2>&1 | tail -20
```

Очаквано: `FAIL`

- [ ] **Step 3: Имплементирай промяната в CallButtons**

Замени цялото съдържание на `src/components/CallButtons.tsx` с:

```tsx
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
        aria-label={`Спешно обаждане: ${PHONE_DISPLAY}`}
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
```

- [ ] **Step 4: Стартирай теста — трябва да мине**

```bash
npx jest __tests__/components/CallButtons.test.tsx --no-coverage 2>&1 | tail -20
```

Очаквано: `PASS`

- [ ] **Step 5: Commit**

```bash
git add src/components/CallButtons.tsx __tests__/components/CallButtons.test.tsx
git commit -m "feat: pulsing phone button and SOS emergency button"
```

---

## Task 4: Нов EmergencyBar компонент

**Files:**
- Create: `src/components/EmergencyBar.tsx`
- Create: `__tests__/components/EmergencyBar.test.tsx`

- [ ] **Step 1: Напиши failing тест**

Създай `__tests__/components/EmergencyBar.test.tsx`:

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import EmergencyBar from '@/components/EmergencyBar'

describe('EmergencyBar', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('renders emergency text', () => {
    render(<EmergencyBar />)
    expect(screen.getByText(/авария/i)).toBeInTheDocument()
  })

  it('renders online indicator', () => {
    render(<EmergencyBar />)
    expect(screen.getByText(/онлайн/i)).toBeInTheDocument()
  })

  it('renders close button', () => {
    render(<EmergencyBar />)
    expect(screen.getByRole('button', { name: /затвори/i })).toBeInTheDocument()
  })

  it('hides when close button is clicked', () => {
    render(<EmergencyBar />)
    fireEvent.click(screen.getByRole('button', { name: /затвори/i }))
    expect(screen.queryByText(/авария/i)).not.toBeInTheDocument()
  })

  it('stays hidden after close when re-rendered (sessionStorage)', () => {
    const { unmount } = render(<EmergencyBar />)
    fireEvent.click(screen.getByRole('button', { name: /затвори/i }))
    unmount()
    render(<EmergencyBar />)
    expect(screen.queryByText(/авария/i)).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Стартирай теста — трябва да fail-не**

```bash
npx jest __tests__/components/EmergencyBar.test.tsx --no-coverage 2>&1 | tail -20
```

Очаквано: `FAIL` — `Cannot find module '@/components/EmergencyBar'`

- [ ] **Step 3: Създай EmergencyBar компонента**

Създай `src/components/EmergencyBar.tsx`:

```tsx
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
        {/* Left: status + text */}
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="flex items-center gap-1.5 text-sm font-bold whitespace-nowrap">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
            ОНЛАЙН 24/7
          </span>
          <span className="text-red-100 text-sm">
            Авария? Реагираме до 60 мин — денонощно
          </span>
        </div>

        {/* Right: buttons + close */}
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
            aria-label={`Спешно обаждане: ${PHONE_DISPLAY}`}
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
```

- [ ] **Step 4: Стартирай теста — трябва да мине**

```bash
npx jest __tests__/components/EmergencyBar.test.tsx --no-coverage 2>&1 | tail -20
```

Очаквано: `PASS`

- [ ] **Step 5: Commit**

```bash
git add src/components/EmergencyBar.tsx __tests__/components/EmergencyBar.test.tsx
git commit -m "feat: add EmergencyBar sticky bottom component"
```

---

## Task 5: Добави EmergencyBar в layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Добави EmergencyBar в layout**

В `src/app/layout.tsx` добави импорта и компонента:

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SchemaOrg from '@/components/SchemaOrg'
import EmergencyBar from '@/components/EmergencyBar'
import { BASE_URL, PHONE_DISPLAY } from '@/lib/metadata'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: {
    default: 'Николов инжинеринг | Електротехник София | +359 88 888 8888',
    template: '%s | Николов инжинеринг',
  },
  description: `Лицензиран електротехник в София. Смяна на табло, нова инсталация, авариен електротехник 24/7. Обадете се: ${PHONE_DISPLAY}`,
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  other: {
    'geo.region': 'BG-SO',
    'geo.placename': 'Sofia',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg">
      <head>
        <SchemaOrg />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body className={`${inter.className} bg-slate-50 pb-20`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <EmergencyBar />
      </body>
    </html>
  )
}
```

Забележи: `pb-20` на `<body>` за да не скрива EmergencyBar последното съдържание.

- [ ] **Step 2: Провери build**

```bash
npm run build 2>&1 | tail -20
```

Очаквано: `✓ Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add EmergencyBar to root layout"
```

---

## Task 6: Авариена CTA секция на услугните страници

**Files:**
- Modify: `src/app/uslugi/[slug]/page.tsx`

- [ ] **Step 1: Добави аварийната CTA секция**

В `src/app/uslugi/[slug]/page.tsx` намери блока с Related services (около ред 112):

```tsx
        {/* Related services */}
        {related.length > 0 && (
```

Точно ПРЕДИ него вмъкни следния блок:

```tsx
        {/* Emergency CTA — shown on all services except the emergency one itself */}
        {service.slug !== 'avariyen-elektrotehnik-sofia' && (
          <div className="bg-red-700 text-white rounded-xl p-6 mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🚨</span>
              <h2 className="text-xl font-bold">Имате авария точно сега?</h2>
            </div>
            <p className="text-red-100 text-sm mb-4">
              Реагираме до 60 минути — денонощно, 24/7, включително събота и неделя
            </p>
            <div className="flex flex-wrap gap-3">
              <CallButtons size="lg" />
            </div>
          </div>
        )}
```

- [ ] **Step 2: Провери build**

```bash
npm run build 2>&1 | tail -20
```

Очаквано: `✓ Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add src/app/uslugi/[slug]/page.tsx
git commit -m "feat: add emergency CTA section to service pages"
```

---

## Task 7: Финална проверка

- [ ] **Step 1: Стартирай всички тестове**

```bash
npx jest --no-coverage 2>&1 | tail -30
```

Очаквано: всички тестове `PASS`, 0 failures.

- [ ] **Step 2: Провери финален build**

```bash
npm run build 2>&1 | tail -30
```

Очаквано: `✓ Compiled successfully`, без TypeScript грешки.

- [ ] **Step 3: Финален commit ако има незаписани промени**

```bash
git status
```

Ако има нещо незаписано:
```bash
git add -A
git commit -m "chore: final cleanup after emergency accent implementation"
```
