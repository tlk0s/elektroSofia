import type { Metadata } from 'next'
import { generateMeta } from '@/lib/metadata'
import { gallery } from '@/data/gallery'
import GalleryGrid from '@/components/GalleryGrid'

export const metadata: Metadata = generateMeta({
  title: 'Галерия | Николов инжинеринг | Електротехник София',
  description: 'Снимки от завършени електротехнически проекти в София — нови инсталации, смяна на табла, LED осветление.',
  path: '/galeria',
})

export default function GaleriaPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Галерия</h1>
      <p className="text-gray-500 mb-10">Завършени проекти в София</p>
      <GalleryGrid projects={gallery} />
    </div>
  )
}
