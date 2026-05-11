const stats = [
  { value: '500+', label: 'Доволни клиента' },
  { value: '15+', label: 'Години опит' },
  { value: 'Лицензиран', label: 'Електротехник' },
  { value: '24/7', label: 'Аварийна помощ' },
]

export default function TrustBar() {
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
