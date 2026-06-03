import { loadGallery, getProjectBySlug } from '@/data/gallery'

describe('loadGallery', () => {
  it('returns array of projects', () => {
    const projects = loadGallery()
    expect(Array.isArray(projects)).toBe(true)
    expect(projects.length).toBeGreaterThan(0)
  })

  it('each project has required fields', () => {
    const projects = loadGallery()
    for (const p of projects) {
      expect(p.slug).toBeTruthy()
      expect(p.title).toBeTruthy()
      expect(p.description).toBeTruthy()
      expect(p.metaTitle).toBeTruthy()
      expect(p.metaDescription).toBeTruthy()
      expect(p.date).toBeTruthy()
      expect(p.coverImage).toBeTruthy()
      expect(Array.isArray(p.images)).toBe(true)
    }
  })

  it('each image has file, alt, caption', () => {
    const projects = loadGallery()
    for (const p of projects) {
      for (const img of p.images) {
        expect(img.file).toBeTruthy()
        expect(img.alt).toBeTruthy()
        expect(img.caption).toBeTruthy()
      }
    }
  })
})

describe('getProjectBySlug', () => {
  it('returns project for valid slug', () => {
    const project = getProjectBySlug('nova-instalaciya-lyulin-2024')
    expect(project).toBeDefined()
    expect(project?.slug).toBe('nova-instalaciya-lyulin-2024')
  })

  it('returns undefined for unknown slug', () => {
    expect(getProjectBySlug('non-existent')).toBeUndefined()
  })
})
