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

const emergencyService: Service = {
  slug: 'avariyen-elektrotehnik-sofia',
  title: 'Авариен електротехник 24/7',
  shortDescription: 'Спешна помощ при авария',
  description: 'Авариен електротехник в София',
  icon: '🚨',
  features: [],
  metaTitle: 'Авариен | SEO',
  metaDescription: 'SEO описание',
}

describe('ServiceCard — emergency variant', () => {
  it('shows 24/7 badge for emergency service', () => {
    render(<ServiceCard service={emergencyService} />)
    expect(screen.getByText('24/7')).toBeInTheDocument()
  })

  it('does not show 24/7 badge for regular service', () => {
    render(<ServiceCard service={{ ...emergencyService, slug: 'other-service' }} />)
    expect(screen.queryByText('24/7')).not.toBeInTheDocument()
  })
})
