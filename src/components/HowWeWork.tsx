import { readFileSync } from 'fs'
import { join } from 'path'

interface HowWeWorkContent {
  heading: string
  steps: Array<{ title: string; description: string }>
}

function loadContent(): HowWeWorkContent {
  const raw = readFileSync(join(process.cwd(), 'content/how-we-work.json'), 'utf-8')
  return JSON.parse(raw)
}

export default function HowWeWork() {
  const { heading, steps } = loadContent()
  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">{heading}</h2>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <li key={step.title} className="text-center">
              <div className="w-14 h-14 bg-blue-700 text-white text-2xl font-extrabold rounded-full flex items-center justify-center mx-auto mb-4">
                {i + 1}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
