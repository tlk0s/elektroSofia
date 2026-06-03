import { render, screen } from '@testing-library/react'
import CallButtons from '@/components/CallButtons'

describe('CallButtons', () => {
  it('renders SOS emergency button', () => {
    render(<CallButtons />)
    expect(screen.getByRole('link', { name: /авария/i })).toBeInTheDocument()
  })

  it('SOS button links to tel:', () => {
    render(<CallButtons />)
    const sos = screen.getByRole('link', { name: /авария/i })
    expect(sos.getAttribute('href')).toMatch(/^tel:/)
  })

  it('phone button has animate-pulse class', () => {
    render(<CallButtons />)
    // The phone link aria-label starts with "Обади се:" — distinguish from SOS
    const phoneLink = screen.getByRole('link', { name: /^обади се:/i })
    expect(phoneLink.className).toContain('animate-pulse')
  })
})
