import { render, screen } from '@testing-library/react'
import Reviews from '@/components/Reviews'

describe('Reviews', () => {
  it('renders "Отзиви" heading', () => {
    render(<Reviews />)
    expect(screen.getByRole('heading', { name: /отзиви/i })).toBeInTheDocument()
  })

  it('renders at least 3 blockquote elements by default', () => {
    render(<Reviews />)
    expect(screen.getAllByRole('blockquote').length).toBeGreaterThanOrEqual(3)
  })

  it('renders passed-in reviews when provided', () => {
    const custom = [
      { name: 'Тест Потребител', text: 'Страхотна работа!', stars: 5 },
      { name: 'Друг Клиент', text: 'Много доволен.', stars: 5 },
      { name: 'Трети Клиент', text: 'Препоръчвам.', stars: 4 },
    ]
    render(<Reviews reviews={custom} />)
    expect(screen.getByText('Страхотна работа!')).toBeInTheDocument()
    expect(screen.getByText('Тест Потребител')).toBeInTheDocument()
  })

  it('each blockquote has text content', () => {
    render(<Reviews />)
    screen.getAllByRole('blockquote').forEach((el) => {
      expect(el.textContent!.length).toBeGreaterThan(10)
    })
  })
})
