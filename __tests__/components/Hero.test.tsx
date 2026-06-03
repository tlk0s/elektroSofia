import { render, screen } from '@testing-library/react'
import Hero from '@/components/Hero'

describe('Hero', () => {
  it('H1 contains "Електротехник в София"', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/електротехник в софия/i)
  })

  it('phone CTA links to tel:', () => {
    render(<Hero />)
    const links = screen.getAllByRole('link').filter(l => l.getAttribute('href')?.startsWith('tel:'))
    expect(links.length).toBeGreaterThan(0)
    expect(links[0]).toHaveAttribute('href', 'tel:+359888888888')
  })

  it('mentions 24/7', () => {
    render(<Hero />)
    expect(screen.getAllByText(/24\/7/i).length).toBeGreaterThan(0)
  })
})
