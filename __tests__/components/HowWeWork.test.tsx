import { render, screen } from '@testing-library/react'
import HowWeWork from '@/components/HowWeWork'

describe('HowWeWork', () => {
  it('renders "Как работим" heading', () => {
    render(<HowWeWork />)
    expect(screen.getByRole('heading', { name: /как работим/i })).toBeInTheDocument()
  })

  it('renders exactly 3 steps', () => {
    render(<HowWeWork />)
    expect(screen.getAllByRole('listitem').length).toBe(3)
  })

  it('first step mentions Обаждане', () => {
    render(<HowWeWork />)
    expect(screen.getByText(/обаждане/i)).toBeInTheDocument()
  })
})
