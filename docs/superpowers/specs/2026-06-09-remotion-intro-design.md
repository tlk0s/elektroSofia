# Дизайн: Remotion Video Intro — Николов инжинеринг

Date: 2026-06-09
Status: Approved

## Обхват

5-секундна шапка (intro) за TikTok и Instagram Reels видеа на Николов инжинеринг. Props-базиран компонент — подаваш `service` от `.env` и телефонният номер също идва от `.env`. Електро визуален стил с тъмен фон, синьо glow, SVG светкавица и amber акценти.

## Формат

- **Резолюция:** 1080×1920 (9:16 вертикално)
- **FPS:** 30
- **Продължителност:** 150 frames = 5 секунди

## Timeline

| Секунди | Frames | Събитие |
|---------|--------|---------|
| 0.0–0.5 | 0–15 | Черен фон fade-in до тъмно синьо (`#0f172a`) + SVG светкавица draw анимация |
| 0.5–1.5 | 15–45 | Лого влиза от центъра с scale + синьо glow (`drop-shadow`) пулсира веднъж |
| 1.5–2.5 | 45–75 | Amber хоризонтална линия slide-in отляво надясно + „Николов инжинеринг" slide-in отдолу |
| 2.5–3.5 | 75–105 | „Електротехник в София 24/7" — typewriter ефект буква по буква |
| 3.5–4.5 | 105–135 | Service label от `.env` влиза с amber акцент (кутийка с amber рамка) |
| 4.5–5.0 | 135–150 | Телефон от `.env` fade-in + пулсираща зелена точка вляво |

## Визуален стил

**Фон:** `#0f172a` (тъмно тъмносиньо, почти черно)

**Светкавица:**
- SVG зигзаг path, рендерира се с `strokeDashoffset` анимация (draw от горе надолу)
- Цвят: `#1d4ed8` (blue-700) с бял glow (`filter: drop-shadow(0 0 8px #fff)`)
- Позиция: горен десен ъгъл, декоративна

**Лого:**
- `../public/logo.png` (relative от remotion/ към Next.js public/)
- `filter: drop-shadow(0 0 20px #1d4ed8)` — синьо свечение
- Анимация: scale от 0.6 → 1.0 с spring + glow пулсира веднъж

**Amber акцент линия:**
- 3px height, amber (`#f59e0b`), full width
- slide-in от ляво на дясно, продължителност ~30 frames

**Типография:**
- Бранд name „Николов инжинеринг": бял, bold, 64px, slide-in от Y+40
- Главно послание „Електротехник в София 24/7": бял, semibold, 48px, typewriter
- Service label: amber (`#f59e0b`), bold, 52px, в кутийка с `border: 2px solid #f59e0b`, padding 8px 20px
- Телефон: бял, 40px, с пулсираща зелена точка (`#4ade80`) вляво — аналогично на EmergencyBar в сайта

## Конфигурация

**`.env` файл в `remotion/`:**
```
REMOTION_PHONE=+359 88 888 8888
REMOTION_SERVICE=Смяна на табло
```

**`src/lib/config.ts`** чете тези стойности и ги експортира. Нито телефонът, нито услугата са хардкоднати никъде в компонентите.

## Файлова структура

```
remotion/
  .env                    # REMOTION_PHONE, REMOTION_SERVICE (gitignore-нат)
  .env.example            # шаблон с placeholder стойности
  package.json            # remotion, @remotion/cli
  tsconfig.json           # самостоятелен TS конфиг
  src/
    index.ts              # registerRoot()
    Root.tsx              # <Composition id="Intro" ...> регистрация
    Intro.tsx             # главният 5-сек компонент
    components/
      Logo.tsx            # лого + scale spring + glow
      LightningBolt.tsx   # SVG светкавица с strokeDashoffset draw анимация
      AmberLine.tsx       # хоризонтална amber линия slide-in
      PhoneTag.tsx        # телефон + пулсираща зелена точка
    lib/
      config.ts           # чете process.env.REMOTION_* → { phone, service }
      easings.ts          # spring конфиги и easing helpers
```

## Команди

```bash
# Preview в браузър
cd remotion && npx remotion studio

# Render до MP4
cd remotion && npx remotion render Intro out/intro.mp4
```

## Зависимости

- `remotion` — ядрото
- `@remotion/cli` — studio + render команди
- Без допълнителни шрифтови пакети — ползва системния Inter (вече зареден от Next.js сайта) или Google Fonts чрез `@remotion/google-fonts`

## Изолация от Next.js

- Отделен `package.json` и `tsconfig.json` в `remotion/`
- Не споделя `node_modules` с Next.js
- Логото се достъпва с relative path `../public/logo.png` — без копиране
- Не влияе на `npm run build` на Next.js сайта
- `.env` в `remotion/` е отделен от `.env.local` на Next.js

## Бъдещи варианти (извън обхвата)

- Аутро (outro) компонент — lower third с телефон и QR
- Различни цветови теми за различни услуги
- GitHub Actions job за автоматичен render при push
