import { readFileSync } from 'fs'
import { join } from 'path'

interface TrustBarContent {
  stats: Array<{ value: string; label: string }>
}

function loadContent(): TrustBarContent {
  const raw = readFileSync(join(process.cwd(), 'content/trust-bar.json'), 'utf-8')
  return JSON.parse(raw)
}

export default function TrustBar() {
  const { stats } = loadContent()
  return (
    <section className="bg-blue-700 text-white py-6">
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {stats.map((stat) => (
          <div key={stat.value}>
            <p className="text-2xl font-extrabold text-amber-400">{stat.value}</p>
            <p className="text-sm text-blue-100">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
