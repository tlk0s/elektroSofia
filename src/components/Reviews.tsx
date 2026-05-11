export interface Review {
  name: string
  text: string
  stars: number
}

const fallbackReviews: Review[] = [
  { name: 'Иван П.', text: 'Много доволен от работата! Смениха ми таблото за 2 часа, чисто и точно. Ще ги препоръчам на всички.', stars: 5 },
  { name: 'Мария Г.', text: 'Обадих се за авария в събота вечер — дойдоха за 45 минути. Отстраниха проблема веднага. Страхотна реакция!', stars: 5 },
  { name: 'Петър Д.', text: 'Изградиха цялата нова инсталация при ремонт на апартамента ни. Работят прецизно, спазиха срока и бюджета.', stars: 5 },
  { name: 'Елена С.', text: 'Монтираха LED осветление в офиса ни. Много добра консултация и качествена работа. Препоръчвам!', stars: 5 },
]

export default function Reviews({ reviews = fallbackReviews }: { reviews?: Review[] }) {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Отзиви от клиенти</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, i) => (
            <blockquote key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <p className="text-yellow-500 text-lg mb-3">{'★'.repeat(review.stars)}</p>
              <p className="text-gray-700 italic mb-4 before:content-[open-quote] after:content-[close-quote]">{review.text}</p>
              <footer className="text-gray-900 font-semibold text-sm"><span aria-hidden="true">— </span><span>{review.name}</span></footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
