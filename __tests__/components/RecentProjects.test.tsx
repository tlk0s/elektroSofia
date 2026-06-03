import { render, screen } from '@testing-library/react'
import RecentProjects from '@/components/RecentProjects'
import type { GalleryProject } from '@/data/gallery'

const mockProjects: GalleryProject[] = [
  {
    slug: 'project-a',
    title: 'Проект А',
    description: 'Описание А',
    metaTitle: '', metaDescription: '',
    date: '2024-06',
    service: 'nova-instalaciya-sofia',
    coverImage: 'galeria/project-a/cover.jpg',
    images: [{ file: 'galeria/project-a/cover.jpg', alt: 'alt', caption: 'cap' }],
  },
  {
    slug: 'project-b',
    title: 'Проект Б',
    description: 'Описание Б',
    metaTitle: '', metaDescription: '',
    date: '2024-05',
    service: 'smyana-tabla-sofia',
    coverImage: 'galeria/project-b/cover.jpg',
    images: [{ file: 'galeria/project-b/cover.jpg', alt: 'alt', caption: 'cap' }],
  },
]

describe('RecentProjects', () => {
  it('renders section heading', () => {
    render(<RecentProjects projects={mockProjects} />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('renders project titles', () => {
    render(<RecentProjects projects={mockProjects} />)
    expect(screen.getByText('Проект А')).toBeInTheDocument()
    expect(screen.getByText('Проект Б')).toBeInTheDocument()
  })

  it('renders link to full gallery', () => {
    render(<RecentProjects projects={mockProjects} />)
    const links = screen.getAllByRole('link', { name: /виж всички/i })
    expect(links[0]).toHaveAttribute('href', '/galeria')
  })

  it('renders nothing when projects array is empty', () => {
    const { container } = render(<RecentProjects projects={[]} />)
    expect(container.firstChild).toBeNull()
  })
})
