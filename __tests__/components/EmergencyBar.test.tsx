import { render, screen, fireEvent } from '@testing-library/react'
import EmergencyBar from '@/components/EmergencyBar'

const props = { phone: '+359888888888', phoneDisplay: '+359 88 888 8888' }

describe('EmergencyBar', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('renders emergency text', () => {
    render(<EmergencyBar {...props} />)
    expect(screen.getAllByText(/авария/i).length).toBeGreaterThan(0)
  })

  it('renders online indicator', () => {
    render(<EmergencyBar {...props} />)
    expect(screen.getByText(/онлайн/i)).toBeInTheDocument()
  })

  it('renders close button', () => {
    render(<EmergencyBar {...props} />)
    expect(screen.getByRole('button', { name: /затвори/i })).toBeInTheDocument()
  })

  it('hides when close button is clicked', () => {
    render(<EmergencyBar {...props} />)
    fireEvent.click(screen.getByRole('button', { name: /затвори/i }))
    expect(screen.queryAllByText(/авария/i)).toHaveLength(0)
  })

  it('stays hidden after close when re-rendered (sessionStorage)', () => {
    const { unmount } = render(<EmergencyBar {...props} />)
    fireEvent.click(screen.getByRole('button', { name: /затвори/i }))
    unmount()
    render(<EmergencyBar {...props} />)
    expect(screen.queryAllByText(/авария/i)).toHaveLength(0)
  })
})
