import { render, screen } from '@testing-library/react'
import Hero from '@/components/Hero'

describe('Hero', () => {
  it('H1 contains "Електротехник в София"', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/електротехник в софия/i)
  })

  it('phone CTA links to tel:', () => {
    render(<Hero />)
    const link = screen.getByRole('link', { name: /обади се/i })
    expect(link).toHaveAttribute('href', 'tel:+359888888888')
  })

  it('mentions 24/7', () => {
    render(<Hero />)
    expect(screen.getByText(/24\/7/i)).toBeInTheDocument()
  })
})
