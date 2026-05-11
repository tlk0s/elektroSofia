import { render } from '@testing-library/react'
import SchemaOrg from '@/components/SchemaOrg'

describe('SchemaOrg', () => {
  it('renders a script tag with type application/ld+json', () => {
    const { container } = render(<SchemaOrg />)
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).toBeInTheDocument()
  })

  it('script contains valid JSON', () => {
    const { container } = render(<SchemaOrg />)
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(() => JSON.parse(script!.innerHTML)).not.toThrow()
  })

  it('JSON-LD has @type Electrician', () => {
    const { container } = render(<SchemaOrg />)
    const data = JSON.parse(container.querySelector('script[type="application/ld+json"]')!.innerHTML)
    expect(data['@type']).toBe('Electrician')
  })

  it('JSON-LD includes telephone', () => {
    const { container } = render(<SchemaOrg />)
    const data = JSON.parse(container.querySelector('script[type="application/ld+json"]')!.innerHTML)
    expect(data.telephone).toBeDefined()
  })

  it('JSON-LD address has addressLocality Sofia', () => {
    const { container } = render(<SchemaOrg />)
    const data = JSON.parse(container.querySelector('script[type="application/ld+json"]')!.innerHTML)
    expect(data.address?.addressLocality).toBe('Sofia')
  })
})
