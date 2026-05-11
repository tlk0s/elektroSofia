import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

describe('Footer', () => {
  it('renders the business name', () => {
    render(<Footer />)
    expect(screen.getByText(/николов инжинеринг/i)).toBeInTheDocument()
  })

  it('phone number links to tel:', () => {
    render(<Footer />)
    const link = screen.getByRole('link', { name: /\+359/ })
    expect(link).toHaveAttribute('href', 'tel:+359888888888')
  })

  it('renders address with София', () => {
    render(<Footer />)
    expect(screen.getByText(/софия/i)).toBeInTheDocument()
  })

  it('renders Понеделник working hours', () => {
    render(<Footer />)
    expect(screen.getByText(/понеделник/i)).toBeInTheDocument()
  })
})
