/**
 * Runs after `next build` to write sitemap.xml and llms.txt into out/.
 * Reads content JSON files so the output always matches what's on the page.
 */
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outDir = join(root, 'out')

function read(file) {
  return JSON.parse(readFileSync(join(root, 'content', file), 'utf-8'))
}

const BASE_URL = 'https://elektrotehnik-sofia.bg'

const business = read('business.json')
const hero = read('hero.json')
const services = read('services.json')
const gallery = read('gallery.json')
const zaНас = read('za-nas.json')
const howWeWork = read('how-we-work.json')
const areas = read('service-areas.json')

// ─── sitemap.xml ────────────────────────────────────────────────────────────

const today = new Date().toISOString().split('T')[0]

const staticRoutes = [
  { path: '/',         priority: '1.0', changefreq: 'weekly' },
  { path: '/uslugi/',  priority: '0.9', changefreq: 'monthly' },
  { path: '/za-nas/',  priority: '0.7', changefreq: 'monthly' },
  { path: '/kontakti/', priority: '0.7', changefreq: 'monthly' },
]

const serviceRoutes = services.services.map((s) => ({
  path: `/uslugi/${s.slug}/`,
  priority: '0.8',
  changefreq: 'monthly',
}))

const galleryRoutes = [
  { path: '/galeria/', priority: '0.8', changefreq: 'monthly' },
  ...gallery.projects.map((p) => ({
    path: `/galeria/${p.slug}/`,
    priority: '0.7',
    changefreq: 'monthly',
  })),
]

const allRoutes = [...staticRoutes, ...serviceRoutes, ...galleryRoutes]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (r) => `  <url>
    <loc>${BASE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

writeFileSync(join(outDir, 'sitemap.xml'), sitemap)
console.log('✓ sitemap.xml written')

// ─── llms.txt ────────────────────────────────────────────────────────────────

const serviceList = services.services
  .map((s) => `- **${s.title}**: ${s.shortDescription}`)
  .join('\n')

const stepList = howWeWork.steps
  .map((s, i) => `${i + 1}. **${s.title}** — ${s.description}`)
  .join('\n')

const credList = zaНас.credentials.map((c) => `- ${c}`).join('\n')

const llmsTxt = `# ${business.name}

> ${hero.headline} — ${hero.subheadline}

${hero.description}

## Контакти

- **Телефон:** ${business.phoneDisplay}
- **Имейл:** ${business.email}
- **Адрес:** ${business.address}
- **Работно време:** ${business.workingHours.weekdays} | ${business.workingHours.saturday} | ${business.workingHours.emergency}

## Услуги

${serviceList}

## Как работим

${stepList}

## За нас

${zaНас.subheading}

${zaНас.paragraphs.join('\n\n')}

${credList}

## Зони на обслужване

${areas.areas.join(', ')}

## Страници

${allRoutes.map((r) => `- ${BASE_URL}${r.path}`).join('\n')}
`

writeFileSync(join(outDir, 'llms.txt'), llmsTxt)
console.log('✓ llms.txt written')

// ─── robots.txt ──────────────────────────────────────────────────────────────

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`

writeFileSync(join(outDir, 'robots.txt'), robotsTxt)
console.log('✓ robots.txt written')

// ─── og-image.png ─────────────────────────────────────────────────────────────

const svgPath = join(root, 'public', 'og-image.svg')
const svgBuffer = readFileSync(svgPath)
await sharp(svgBuffer).resize(1200, 630).png().toFile(join(outDir, 'og-image.png'))
console.log('✓ og-image.png written')

// ─── favicon.svg → favicon files ─────────────────────────────────────────────

const faviconSvgPath = join(root, 'public', 'favicon.svg')
const faviconBuffer = readFileSync(faviconSvgPath)
await sharp(faviconBuffer).resize(32, 32).png().toFile(join(outDir, 'favicon.png'))
await sharp(faviconBuffer).resize(180, 180).png().toFile(join(outDir, 'apple-touch-icon.png'))
console.log('✓ favicon.png + apple-touch-icon.png written')
