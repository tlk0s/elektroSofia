import { readFileSync } from 'fs'
import { join } from 'path'

export interface GalleryImage {
  file: string
  alt: string
  caption: string
}

export interface GalleryProject {
  slug: string
  title: string
  description: string
  metaTitle: string
  metaDescription: string
  date: string
  service: string
  coverImage: string
  images: GalleryImage[]
}

interface GalleryJson {
  projects: GalleryProject[]
}

export function loadGallery(): GalleryProject[] {
  const raw = readFileSync(join(process.cwd(), 'content/gallery.json'), 'utf-8')
  const { projects } = JSON.parse(raw) as GalleryJson
  return projects
}

export function getProjectBySlug(slug: string): GalleryProject | undefined {
  return loadGallery().find((p) => p.slug === slug)
}
