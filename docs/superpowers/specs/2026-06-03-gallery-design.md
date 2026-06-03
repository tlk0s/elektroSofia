# Дизайн: Галерия — Николов инжинеринг

Date: 2026-06-03
Status: Approved

## Обхват

Галерия от завършени проекти, поддържана изцяло през git. Всеки проект има страница с пълно SEO, lightbox за снимките и линк към свързаната услуга. Секция „Последни проекти" на началната страница.

## Структура на данните

### `content/gallery.json`

```json
{
  "projects": [
    {
      "slug": "nova-instalaciya-lyulin-2024",
      "title": "Нова инсталация — жк Люлин",
      "description": "Цялостна нова електрическа инсталация в 3-стаен апартамент. Подмяна на стара инсталация с нова по БДС EN 60364, ново табло с диференциална защита, 14 контура.",
      "metaTitle": "Нова инсталация жк Люлин 2024 | Галерия | Николов инжинеринг",
      "metaDescription": "Снимки от изграждане на нова електрическа инсталация в апартамент в жк Люлин, София. Ново табло, кабели в тръби, диференциална защита.",
      "date": "2024-03",
      "service": "nova-instalaciya-sofia",
      "coverImage": "galeria/nova-instalaciya-lyulin-2024/cover.jpg",
      "images": [
        {
          "file": "galeria/nova-instalaciya-lyulin-2024/tabelo-predi.jpg",
          "alt": "Старото табло преди подмяна — жк Люлин",
          "caption": "Старото табло с топящи се предпазители"
        }
      ]
    }
  ]
}
```

### `public/galeria/<slug>/`

Снимките се съхраняват в `public/galeria/<slug>/` и се commit-ват директно в git. Next.js ги сервира статично от `/galeria/<slug>/filename.jpg`.

**Полета на проект:**
| Поле | Тип | Описание |
|------|-----|---------|
| `slug` | string | URL-friendly идентификатор, уникален |
| `title` | string | Заглавие на проекта |
| `description` | string | Описание на проекта (видимо на страницата) |
| `metaTitle` | string | SEO title tag |
| `metaDescription` | string | SEO meta description |
| `date` | string | YYYY-MM формат |
| `service` | string | Slug на свързаната услуга (от services.json) |
| `coverImage` | string | Път до cover снимката (от public/) |
| `images` | Image[] | Масив от снимки |

**Полета на снимка:**
| Поле | Тип | Описание |
|------|-----|---------|
| `file` | string | Път от public/ (напр. `galeria/slug/foto.jpg`) |
| `alt` | string | Alt текст за достъпност и SEO |
| `caption` | string | Видим надпис под снимката в lightbox |

## Маршрути

| URL | Компонент | Описание |
|-----|-----------|---------|
| `/galeria` | `src/app/galeria/page.tsx` | Грид от всички проекти |
| `/galeria/[slug]` | `src/app/galeria/[slug]/page.tsx` | Страница на проект + lightbox |

## Компоненти

### `GalleryGrid`
Грид от проект-карти. Всяка карта: cover снимка, заглавие, дата, брой снимки, линк към `/galeria/[slug]`.

### `ProjectGallery`
Client component. Грид от thumbnail снимки + lightbox overlay. Keyboard навигация: Escape затваря, ← / → сменят снимка. Без external библиотека.

### `RecentProjects`
Секция за началната страница. Показва последните 3 проекта по дата. Линк „Виж всички проекти →" към `/galeria`.

## SEO

### `/galeria/[slug]` страница
- `<title>` и `<meta description>` от JSON полетата `metaTitle` / `metaDescription`
- `og:image` — `coverImage` на проекта
- Canonical URL: `https://elektrotehnik-sofia.bg/galeria/<slug>/`

### Schema.org
- `BreadcrumbList`: Начало → Галерия → {title}
- `ImageGallery` с `ImageObject` за всяка снимка (url, name=alt, description=caption)

### Alt текстове
Всяка `<img>` рендерира `alt` от JSON — задължително поле.

## Навигация

`Header.tsx` — добавяне на „Галерия" между „Услуги" и „За нас":

```
Услуги | Галерия | За нас | Контакти
```

## Файлове

| Файл | Действие |
|------|---------|
| `content/gallery.json` | Нов — данни + примерен проект |
| `public/galeria/.gitkeep` | Нов — запазва папката в git |
| `src/data/gallery.ts` | Нов — типове + loadGallery() |
| `src/components/GalleryGrid.tsx` | Нов — грид от проекти |
| `src/components/ProjectGallery.tsx` | Нов — грид + lightbox (client) |
| `src/components/RecentProjects.tsx` | Нов — секция за начало |
| `src/app/galeria/page.tsx` | Нов — /galeria |
| `src/app/galeria/[slug]/page.tsx` | Нов — /galeria/[slug] |
| `src/app/page.tsx` | Modify — RecentProjects секция |
| `src/components/Header.tsx` | Modify — Галерия в навигацията |
