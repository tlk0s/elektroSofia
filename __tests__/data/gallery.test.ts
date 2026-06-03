import { gallery, getProjectBySlug } from '@/data/gallery'

describe('gallery', () => {
  it('returns array of projects', () => {
    expect(Array.isArray(gallery)).toBe(true)
    expect(gallery.length).toBeGreaterThan(0)
  })

  it('each project has required fields', () => {
    for (const p of gallery) {
      expect(p.slug).toBeTruthy()
      expect(p.title).toBeTruthy()
      expect(p.description).toBeTruthy()
      expect(p.metaTitle).toBeTruthy()
      expect(p.metaDescription).toBeTruthy()
      expect(p.date).toBeTruthy()
      expect(p.service).toBeTruthy()
      expect(p.coverImage).toBeTruthy()
      expect(Array.isArray(p.images)).toBe(true)
    }
  })

  it('each image has file, alt, caption', () => {
    for (const p of gallery) {
      expect(p.images.length).toBeGreaterThan(0)
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
