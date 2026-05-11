import { render, screen } from '@testing-library/react'
import ServiceCard from '@/components/ServiceCard'
import type { Service } from '@/data/services'

const mockService: Service = {
  slug: 'test-service',
  title: 'Тест услуга',
  shortDescription: 'Кратко описание',
  description: 'Пълно описание',
  icon: '🔧',
  features: ['Характеристика 1'],
  metaTitle: 'Тест | SEO',
  metaDescription: 'SEO описание',
}

describe('ServiceCard', () => {
  it('renders the service title', () => {
    render(<ServiceCard service={mockService} />)
    expect(screen.getByText('Тест услуга')).toBeInTheDocument()
  })

  it('renders the service icon', () => {
    render(<ServiceCard service={mockService} />)
    expect(screen.getByText('🔧')).toBeInTheDocument()
  })

  it('renders the short description', () => {
    render(<ServiceCard service={mockService} />)
    expect(screen.getByText('Кратко описание')).toBeInTheDocument()
  })

  it('links to /uslugi/test-service', () => {
    render(<ServiceCard service={mockService} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/uslugi/test-service')
  })
})
