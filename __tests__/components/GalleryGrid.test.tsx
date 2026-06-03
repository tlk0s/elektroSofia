import { render, screen } from '@testing-library/react'
import GalleryGrid from '@/components/GalleryGrid'
import type { GalleryProject } from '@/data/gallery'

const mockProjects: GalleryProject[] = [
  {
    slug: 'test-project',
    title: 'Тест проект',
    description: 'Описание на проекта',
    metaTitle: 'Тест | SEO',
    metaDescription: 'SEO описание',
    date: '2024-03',
    service: 'nova-instalaciya-sofia',
    coverImage: 'galeria/test-project/cover.jpg',
    images: [
      { file: 'galeria/test-project/cover.jpg', alt: 'Тест снимка', caption: 'Надпис' },
    ],
  },
]

describe('GalleryGrid', () => {
  it('renders project title', () => {
    render(<GalleryGrid projects={mockProjects} />)
    expect(screen.getByText('Тест проект')).toBeInTheDocument()
  })

  it('renders link to project page', () => {
    render(<GalleryGrid projects={mockProjects} />)
    const link = screen.getByRole('link', { name: /тест проект/i })
    expect(link).toHaveAttribute('href', '/galeria/test-project')
  })

  it('renders image count', () => {
    render(<GalleryGrid projects={mockProjects} />)
    expect(screen.getByText(/1 снимк/i)).toBeInTheDocument()
  })

  it('renders empty state when no projects', () => {
    render(<GalleryGrid projects={[]} />)
    expect(screen.getByText(/все още няма/i)).toBeInTheDocument()
  })
})
