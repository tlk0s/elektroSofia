import { render, screen } from '@testing-library/react'
import TrustBar from '@/components/TrustBar'

describe('TrustBar', () => {
  it('shows 500+ clients', () => {
    render(<TrustBar />)
    expect(screen.getByText(/500\+/)).toBeInTheDocument()
  })

  it('shows 15+ years', () => {
    render(<TrustBar />)
    expect(screen.getByText(/15\+/)).toBeInTheDocument()
  })

  it('shows Лицензиран', () => {
    render(<TrustBar />)
    expect(screen.getByText(/лицензиран/i)).toBeInTheDocument()
  })
})
