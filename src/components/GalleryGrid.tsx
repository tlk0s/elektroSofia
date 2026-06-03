import Link from 'next/link'
import Image from 'next/image'
import type { GalleryProject } from '@/data/gallery'

function imageCount(n: number): string {
  if (n === 1) return '1 снимка'
  if (n < 5) return `${n} снимки`
  return `${n} снимки`
}

function formatDate(date: string): string {
  const [year, month] = date.split('-')
  const months = ['яну', 'фев', 'мар', 'апр', 'май', 'юни', 'юли', 'авг', 'сеп', 'окт', 'ное', 'дек']
  return `${months[parseInt(month) - 1]} ${year}`
}

export default function GalleryGrid({ projects }: { projects: GalleryProject[] }) {
  if (projects.length === 0) {
    return (
      <p className="text-center text-gray-500 py-16">
        Все още няма добавени проекти в галерията.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/galeria/${project.slug}`}
          aria-label={project.title}
          className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100"
        >
          <div className="relative h-52 bg-gray-100">
            <Image
              src={`/${project.coverImage}`}
              alt={project.images[0]?.alt ?? project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
            <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
              {imageCount(project.images.length)}
            </span>
          </div>
          <div className="p-4">
            <p className="text-xs text-gray-400 mb-1">{formatDate(project.date)}</p>
            <h3 className="font-bold text-gray-900 text-base leading-snug">{project.title}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
