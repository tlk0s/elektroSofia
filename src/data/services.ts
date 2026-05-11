import { readFileSync } from 'fs'
import { join } from 'path'
import { PHONE_DISPLAY } from '../lib/metadata'

export interface FaqItem {
  question: string
  answer: string
}

export interface Service {
  slug: string
  title: string
  shortDescription: string
  description: string
  longDescription: string
  icon: string
  features: string[]
  faq: FaqItem[]
  relatedServices: string[]
  metaTitle: string
  metaDescription: string
}

interface ServicesJson {
  services: Array<Omit<Service, 'metaTitle' | 'metaDescription'>>
}

function loadServices(): Service[] {
  const raw = readFileSync(join(process.cwd(), 'content/services.json'), 'utf-8')
  const { services } = JSON.parse(raw) as ServicesJson
  return services.map((s) => ({
    ...s,
    metaTitle: `${s.title} София | Електротехник | ${PHONE_DISPLAY}`,
    metaDescription: `${s.shortDescription} в София. Лицензиран електротехник, бърза реакция. Обадете се: ${PHONE_DISPLAY}`,
  }))
}

export const services: Service[] = loadServices()

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}
