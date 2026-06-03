import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { gallery, getProjectBySlug } from '@/data/gallery'
import { BASE_URL } from '@/lib/metadata'
import ProjectGallery from '@/components/ProjectGallery'
import CallButtons from '@/components/CallButtons'

export function generateStaticParams() {
  return gallery.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  if (!project) return {}
  return {
    title: project.metaTitle,
    description: project.metaDescription,
    alternates: { canonical: `${BASE_URL}/galeria/${project.slug}/` },
    openGraph: {
      title: project.metaTitle,
      description: project.metaDescription,
      images: [{ url: `${BASE_URL}/${project.coverImage}` }],
    },
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Начало', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Галерия', item: `${BASE_URL}/galeria/` },
      { '@type': 'ListItem', position: 3, name: project.title, item: `${BASE_URL}/galeria/${project.slug}/` },
    ],
  })

  const imageGallerySchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: project.title,
    description: project.description,
    image: project.images.map((img) => ({
      '@type': 'ImageObject',
      url: `${BASE_URL}/${img.file}`,
      name: img.alt,
      description: img.caption,
    })),
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: imageGallerySchema }} />

      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-700">Начало</Link>
          {' > '}
          <Link href="/galeria" className="hover:text-blue-700">Галерия</Link>
          {' > '}
          <span className="text-gray-900">{project.title}</span>
        </nav>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">{project.title}</h1>
        <p className="text-gray-500 text-sm mb-6">{project.date.replace('-', ' / ')}</p>
        <p className="text-gray-700 leading-relaxed mb-8">{project.description}</p>

        <ProjectGallery images={project.images} title={project.title} />

        {/* Link to related service */}
        <div className="mt-10 p-5 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Свързана услуга</p>
          <Link
            href={`/uslugi/${project.service}`}
            className="text-blue-700 font-semibold hover:underline"
          >
            Виж услугата →
          </Link>
        </div>

        {/* CTA */}
        <div className="mt-8 bg-blue-700 text-white rounded-xl p-6 text-center">
          <p className="font-semibold mb-1">Искате подобен проект?</p>
          <p className="text-blue-200 text-sm mb-4">Обадете се за безплатна консултация и оглед</p>
          <div className="flex flex-wrap justify-center gap-3">
            <CallButtons size="lg" />
          </div>
        </div>
      </div>
    </>
  )
}
