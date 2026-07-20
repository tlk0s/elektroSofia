import { BASE_URL, NAP, PHONE, business } from '@/lib/metadata'

export default function SchemaOrg() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    name: NAP.name,
    url: BASE_URL,
    telephone: PHONE,
    email: NAP.email,
    image: `${BASE_URL}/og-image.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Йоан Екзарх 13',
      addressLocality: 'София',
      addressRegion: 'ж.к. Лозенец',
      postalCode: '1421',
      addressCountry: 'BG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 42.6775,
      longitude: 23.3252,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        description: 'Аварийно обслужване 24/7',
        opens: '00:00',
        closes: '23:59',
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'София', sameAs: 'https://www.wikidata.org/wiki/Q472' },
      { '@type': 'AdministrativeArea', name: 'Лозенец' },
      { '@type': 'AdministrativeArea', name: 'Люлин' },
      { '@type': 'AdministrativeArea', name: 'Младост' },
      { '@type': 'AdministrativeArea', name: 'Надежда' },
      { '@type': 'AdministrativeArea', name: 'Витоша' },
      { '@type': 'AdministrativeArea', name: 'Красно село' },
      { '@type': 'AdministrativeArea', name: 'Овча купел' },
      { '@type': 'AdministrativeArea', name: 'Студентски град' },
      { '@type': 'AdministrativeArea', name: 'Дружба' },
      { '@type': 'AdministrativeArea', name: 'Оборище' },
    ],
    sameAs: [
      'https://www.facebook.com/nikolovinzhenering',
    ],
    identifier: {
      '@type': 'PropertyValue',
      name: 'Лиценз',
      value: business.licenseNumber,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Електротехнически услуги',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Авариен електротехник 24/7', url: `${BASE_URL}/uslugi/avariyen-elektrotehnik-sofia/` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Смяна на електрическо табло', url: `${BASE_URL}/uslugi/smyana-tabla-sofia/` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Нова електрическа инсталация', url: `${BASE_URL}/uslugi/nova-instalaciya-sofia/` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Монтаж на осветление', url: `${BASE_URL}/uslugi/montaj-osvetlenie-sofia/` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Контакти и ключове', url: `${BASE_URL}/uslugi/kontakti-klyuchove-sofia/` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Промишлени обекти', url: `${BASE_URL}/uslugi/promishleni-obekti-sofia/` } },
      ],
    },
    priceRange: '$$',
  }

  // Static object — no user input — safe to inject as JSON-LD
  // eslint-disable-next-line react/no-danger
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
