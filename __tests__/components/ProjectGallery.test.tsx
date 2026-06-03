import { render, screen, fireEvent } from '@testing-library/react'
import ProjectGallery from '@/components/ProjectGallery'
import type { GalleryImage } from '@/data/gallery'

const mockImages: GalleryImage[] = [
  { file: 'galeria/test/img1.jpg', alt: 'Снимка едно', caption: 'Надпис едно' },
  { file: 'galeria/test/img2.jpg', alt: 'Снимка две', caption: 'Надпис две' },
]

describe('ProjectGallery', () => {
  it('renders all thumbnails', () => {
    render(<ProjectGallery images={mockImages} title="Тест проект" />)
    const imgs = screen.getAllByRole('img')
    expect(imgs.length).toBeGreaterThanOrEqual(2)
  })

  it('opens lightbox on thumbnail click', () => {
    render(<ProjectGallery images={mockImages} title="Тест проект" />)
    fireEvent.click(screen.getAllByRole('button')[0])
    expect(screen.getByText('Надпис едно')).toBeInTheDocument()
  })

  it('closes lightbox on close button click', () => {
    render(<ProjectGallery images={mockImages} title="Тест проект" />)
    fireEvent.click(screen.getAllByRole('button')[0])
    fireEvent.click(screen.getByRole('button', { name: /затвори/i }))
    expect(screen.queryByText('Надпис едно')).not.toBeInTheDocument()
  })

  it('navigates to next image in lightbox', () => {
    render(<ProjectGallery images={mockImages} title="Тест проект" />)
    fireEvent.click(screen.getAllByRole('button')[0])
    expect(screen.getByText('Надпис едно')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /следваща/i }))
    expect(screen.getByText('Надпис две')).toBeInTheDocument()
  })

  it('navigates to previous image in lightbox', () => {
    render(<ProjectGallery images={mockImages} title="Тест проект" />)
    fireEvent.click(screen.getAllByRole('button')[1])
    expect(screen.getByText('Надпис две')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /предишна/i }))
    expect(screen.getByText('Надпис едно')).toBeInTheDocument()
  })
})
