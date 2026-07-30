import { readFileSync } from 'fs'
import { join } from 'path'

export interface FaqEntry {
  question: string
  answer: string
}

interface FaqJson {
  faqs: FaqEntry[]
}

function loadFaqs(): FaqEntry[] {
  const raw = readFileSync(join(process.cwd(), 'content/faq.json'), 'utf-8')
  return (JSON.parse(raw) as FaqJson).faqs
}

export const faqs: FaqEntry[] = loadFaqs()
