import type { Metadata } from 'next'

export const BASE_URL = 'https://elektrotehnik-sofia.bg'
export const PHONE = '+359888888888'
export const PHONE_DISPLAY = '+359 88 888 8888'
export const EMAIL = 'info@elektrotehnik-sofia.bg'

export const NAP = {
  name: 'Николов инжинеринг',
  address: 'гр. София 1000, ул. Примерна 1',
  phone: PHONE_DISPLAY,
  email: EMAIL,
}

export function generateMeta({
  title,
  description,
  path = '',
}: {
  title: string
  description: string
  path?: string
}): Metadata {
  const url = `${BASE_URL}${path}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: NAP.name,
      locale: 'bg_BG',
      type: 'website',
    },
    other: {
      'geo.region': 'BG-SO',
      'geo.placename': 'Sofia',
    },
  }
}
