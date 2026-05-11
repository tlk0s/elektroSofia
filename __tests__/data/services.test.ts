import { services, getServiceBySlug } from '@/data/services'

describe('services data', () => {
  it('exports an array of at least 6 services', () => {
    expect(services.length).toBeGreaterThanOrEqual(6)
  })

  it('each service has required fields', () => {
    services.forEach((s) => {
      expect(s).toHaveProperty('slug')
      expect(s).toHaveProperty('title')
      expect(s).toHaveProperty('shortDescription')
      expect(s).toHaveProperty('description')
      expect(s).toHaveProperty('icon')
      expect(s).toHaveProperty('features')
      expect(Array.isArray(s.features)).toBe(true)
    })
  })

  it('getServiceBySlug returns correct service', () => {
    const s = getServiceBySlug('avariyen-elektrotehnik-sofia')
    expect(s).toBeDefined()
    expect(s?.slug).toBe('avariyen-elektrotehnik-sofia')
  })

  it('getServiceBySlug returns undefined for unknown slug', () => {
    expect(getServiceBySlug('nonexistent')).toBeUndefined()
  })

  it('all slugs are unique', () => {
    const slugs = services.map((s) => s.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})
