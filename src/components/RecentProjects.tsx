import Link from 'next/link'
import Image from 'next/image'
import type { GalleryProject } from '@/data/gallery'

export default function RecentProjects({ projects }: { projects: GalleryProject[] }) {
  if (projects.length === 0) return null

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Последни проекти</h2>
            <p className="text-gray-500">Реализирани обекти в София</p>
          </div>
          <Link
            href="/galeria"
            className="text-blue-700 font-semibold text-sm hover:underline hidden sm:block"
          >
            Виж всички проекти →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/galeria/${project.slug}`}
              className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100"
            >
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={`/${project.coverImage}`}
                  alt={project.images[0]?.alt ?? project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm leading-snug">{project.title}</h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link href="/galeria" className="text-blue-700 font-semibold text-sm hover:underline">
            Виж всички проекти →
          </Link>
        </div>
      </div>
    </section>
  )
}
