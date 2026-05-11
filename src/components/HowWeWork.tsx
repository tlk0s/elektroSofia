const steps = [
  { number: '1', title: 'Обаждане', description: 'Обаждате се на нашия телефон. Описвате проблема — отговаряме веднага.' },
  { number: '2', title: 'Оглед', description: 'Идваме на адрес, правим оглед и даваме точна оферта без скрити такси.' },
  { number: '3', title: 'Изпълнение', description: 'Изпълняваме работата чисто и в срок. Издаваме протокол и даваме гаранция.' },
]

export default function HowWeWork() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Как работим</h2>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <li key={step.number} className="text-center">
              <div className="w-14 h-14 bg-blue-700 text-white text-2xl font-extrabold rounded-full flex items-center justify-center mx-auto mb-4">
                {step.number}
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
