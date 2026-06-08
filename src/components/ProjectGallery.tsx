'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import type { GalleryImage } from '@/data/gallery'
import { assetPath } from '@/lib/asset-path'

interface Props {
  images: GalleryImage[]
  title: string
}

export default function ProjectGallery({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const close = useCallback(() => setActiveIndex(null), [])

  const prev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
  }, [images.length])

  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length))
  }, [images.length])

  useEffect(() => {
    if (activeIndex === null) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIndex, close, prev, next])

  return (
    <>
      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button
            key={img.file}
            onClick={() => setActiveIndex(i)}
            className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={img.alt}
          >
            <Image
              src={assetPath(img.file)}
              alt={img.alt}
              fill
              className="object-cover"
              unoptimized
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={close}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
              <Image
                src={assetPath(images[activeIndex].file)}
                alt={images[activeIndex].alt}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <p className="text-white text-center mt-3 text-sm">
              {images[activeIndex].caption}
            </p>
            <p className="text-gray-400 text-center text-xs mt-1">
              {activeIndex + 1} / {images.length}
            </p>

            {/* Controls */}
            <button
              onClick={close}
              className="absolute -top-10 right-0 text-white text-3xl leading-none hover:text-gray-300"
              aria-label="Затвори галерията"
            >
              ×
            </button>
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-white text-4xl leading-none hover:text-gray-300"
                  aria-label="Предишна снимка"
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-white text-4xl leading-none hover:text-gray-300"
                  aria-label="Следваща снимка"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
