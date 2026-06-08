import { readFileSync } from 'fs'
import { join } from 'path'
import type { Metadata } from 'next'

export { assetPath, BASE_PATH } from './asset-path'

interface BusinessContent {
  name: string
  phone: string
  phoneDisplay: string
  email: string
  address: string
  licenseNumber: string
  yearsExperience: string
  clientsServed: string
  workingHours: { weekdays: string; saturday: string; emergency: string }
}

function loadBusiness(): BusinessContent {
  const raw = readFileSync(join(process.cwd(), 'content/business.json'), 'utf-8')
  return JSON.parse(raw)
}

const business = loadBusiness()

export const BASE_URL = 'https://elektrotehnik-sofia.bg'
export const PHONE = business.phone
export const PHONE_DISPLAY = business.phoneDisplay
export const EMAIL = business.email

export const NAP = {
  name: business.name,
  address: business.address,
  phone: business.phoneDisplay,
  email: business.email,
}

export { business }

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
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/og-image.png`],
    },
    other: {
      'geo.region': 'BG-SO',
      'geo.placename': 'Sofia',
    },
  }
}
