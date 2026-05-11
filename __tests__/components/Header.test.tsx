import { render, screen } from '@testing-library/react'
import Header from '@/components/Header'

describe('Header', () => {
  it('renders the site name', () => {
    render(<Header />)
    expect(screen.getByText(/николов инжинеринг/i)).toBeInTheDocument()
  })

  it('renders Услуги nav link', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /услуги/i })).toBeInTheDocument()
  })

  it('renders За нас nav link', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /за нас/i })).toBeInTheDocument()
  })

  it('renders Контакти nav link', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /контакти/i })).toBeInTheDocument()
  })

  it('phone CTA has tel: href', () => {
    render(<Header />)
    const phoneLink = screen.getByRole('link', { name: /\+359/ })
    expect(phoneLink).toHaveAttribute('href', 'tel:+359888888888')
  })

  it('header element has sticky class', () => {
    const { container } = render(<Header />)
    expect(container.querySelector('header')?.className).toMatch(/sticky/)
  })
})
