import { render, screen, fireEvent } from '@testing-library/react'
import EmergencyBar from '@/components/EmergencyBar'

describe('EmergencyBar', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('renders emergency text', () => {
    render(<EmergencyBar />)
    expect(screen.getAllByText(/авария/i).length).toBeGreaterThan(0)
  })

  it('renders online indicator', () => {
    render(<EmergencyBar />)
    expect(screen.getByText(/онлайн/i)).toBeInTheDocument()
  })

  it('renders close button', () => {
    render(<EmergencyBar />)
    expect(screen.getByRole('button', { name: /затвори/i })).toBeInTheDocument()
  })

  it('hides when close button is clicked', () => {
    render(<EmergencyBar />)
    fireEvent.click(screen.getByRole('button', { name: /затвори/i }))
    expect(screen.queryAllByText(/авария/i)).toHaveLength(0)
  })

  it('stays hidden after close when re-rendered (sessionStorage)', () => {
    const { unmount } = render(<EmergencyBar />)
    fireEvent.click(screen.getByRole('button', { name: /затвори/i }))
    unmount()
    render(<EmergencyBar />)
    expect(screen.queryAllByText(/авария/i)).toHaveLength(0)
  })
})
