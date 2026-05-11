import { BASE_URL, NAP, PHONE } from '@/lib/metadata'

export default function SchemaOrg() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    name: NAP.name,
    url: BASE_URL,
    telephone: PHONE,
    email: NAP.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Примерна 1',
      addressLocality: 'Sofia',
      postalCode: '1000',
      addressCountry: 'BG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 42.6977,
      longitude: 23.3219,
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
    ],
    areaServed: { '@type': 'City', name: 'Sofia' },
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
