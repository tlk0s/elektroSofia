import { readFileSync } from 'fs'
import { join } from 'path'

interface ServiceAreasContent {
  heading: string
  subheading: string
  areas: string[]
}

function loadContent(): ServiceAreasContent {
  const raw = readFileSync(join(process.cwd(), 'content/service-areas.json'), 'utf-8')
  return JSON.parse(raw)
}

export default function ServiceAreas() {
  const { heading, subheading, areas } = loadContent()
  return (
    <section className="py-16 bg-blue-50">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">{heading}</h2>
        <p className="text-center text-gray-600 mb-8">{subheading}</p>
        <ul className="flex flex-wrap justify-center gap-3">
          {areas.map((area) => (
            <li key={area} className="bg-white text-blue-800 font-medium px-4 py-2 rounded-full shadow-sm border border-blue-100 text-sm">
              {area}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
