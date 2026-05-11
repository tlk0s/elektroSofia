import { generateMeta, BASE_URL, PHONE, NAP } from '@/lib/metadata'

describe('generateMeta', () => {
  it('returns title and description', () => {
    const meta = generateMeta({ title: 'Тест', description: 'Описание' })
    expect(meta.title).toBe('Тест')
    expect(meta.description).toBe('Описание')
  })

  it('includes openGraph with locale bg_BG', () => {
    const meta = generateMeta({ title: 'T', description: 'D' })
    expect((meta.openGraph as any)?.locale).toBe('bg_BG')
  })

  it('includes canonical url when path provided', () => {
    const meta = generateMeta({ title: 'T', description: 'D', path: '/uslugi' })
    expect((meta as any).alternates?.canonical).toBe(`${BASE_URL}/uslugi`)
  })

  it('PHONE starts with +359', () => {
    expect(PHONE).toMatch(/^\+359/)
  })

  it('NAP has name, address, phone', () => {
    expect(NAP).toHaveProperty('name')
    expect(NAP).toHaveProperty('address')
    expect(NAP).toHaveProperty('phone')
  })
})
