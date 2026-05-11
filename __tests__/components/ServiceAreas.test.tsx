import { render, screen } from '@testing-library/react'
import ServiceAreas from '@/components/ServiceAreas'

describe('ServiceAreas', () => {
  it('renders heading with "Зони"', () => {
    render(<ServiceAreas />)
    expect(screen.getByRole('heading', { name: /зони/i })).toBeInTheDocument()
  })

  it('lists Люлин', () => {
    render(<ServiceAreas />)
    expect(screen.getByText(/люлин/i)).toBeInTheDocument()
  })

  it('lists Младост', () => {
    render(<ServiceAreas />)
    expect(screen.getByText(/младост/i)).toBeInTheDocument()
  })

  it('lists Витоша', () => {
    render(<ServiceAreas />)
    expect(screen.getByText(/витоша/i)).toBeInTheDocument()
  })

  it('renders at least 8 list items', () => {
    render(<ServiceAreas />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(8)
  })
})
