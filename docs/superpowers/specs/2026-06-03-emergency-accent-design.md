# Дизайн: Авариен акцент — Николов инжинеринг

Date: 2026-06-03
Status: Approved

## Обхват

Подсилване на аварийния акцент в сайта без пълен редизайн. Целта е потребителите при авария да намерят телефона мигновено, а Google да разбере че аварийната услуга е приоритетна.

## 1. Пренареждане на услугите

**Файл:** `content/services.json`

`avariyen-elektrotehnik-sofia` се мести на първа позиция в масива. Всички останали услуги запазват реда си.

SEO ефект: аварийната услуга е първа в DOM → по-висока семантична тежест при индексиране.

## 2. Визуална карта за аварийната услуга

**Файл:** `src/components/ServiceCard.tsx`

Условен стил само за `slug === 'avariyen-elektrotehnik-sofia'`:
- Червена рамка (`border-red-500`)
- Червен badge горе-вдясно: „24/7"
- Pulse dot до badge-а

Останалите карти — непроменени.

## 3. Нов CallButtons — пулсиращ телефон + SOS

**Файл:** `src/components/CallButtons.tsx`

### Телефонен бутон (преработен)
- Червен фон: `bg-red-600 hover:bg-red-500`
- Анимация: `animate-pulse`
- Надпис: „📞 Обади се — 24/7"

### SOS бутон (нов)
- Фон: `bg-red-800 hover:bg-red-700`
- Надпис: „🆘 АВАРИЯ"
- `href`: `tel:${PHONE}` (същия номер)
- `aria-label`: „Спешно обаждане: {PHONE_DISPLAY}"

Viber и WhatsApp иконите остават непроменени.

## 4. Нов компонент EmergencyBar

**Файл:** `src/components/EmergencyBar.tsx` (нов)
**Добавен в:** `src/app/layout.tsx`

### Поведение
- `position: fixed; bottom: 0` — залепен в дъното на viewport на всички страници
- Pulse dot „● ОНЛАЙН 24/7" (зелена точка с animate-pulse)
- Текст: „Авария? Реагираме до 60 мин — денонощно"
- CallButtons (телефон + SOS)
- Бутон „×" затваря лентата за сесията (sessionStorage)
- Добавя `pb-16` padding на `<body>` когато е видим за да не скрива съдържание

### Адаптивност
- Мобилни: два реда — текст горе, бутони долу
- Desktop: един ред — текст вляво, бутони вдясно, × крайно вдясно

### Достъпност
- `role="complementary"` + `aria-label="Авариен контакт"`
- Pulse dot има `aria-hidden="true"`

## 5. Авариена CTA секция на услугните страници

**Файл:** `src/app/uslugi/[slug]/page.tsx`

След FAQ, преди Related services — само когато `service.slug !== 'avariyen-elektrotehnik-sofia'`:

```
┌─────────────────────────────────────────────┐
│  🚨  Имате авария точно сега?               │
│  Реагираме до 60 минути — денонощно, 24/7   │
│  [ 📞 Обади се — 24/7 ]  [ 🆘 АВАРИЯ ]     │
└─────────────────────────────────────────────┘
```

Червен фон (`bg-red-700`), бял текст.

## SEO съображения

- Аварийната услуга първа в DOM — по-висока семантична тежест
- EmergencyBar е `role="complementary"` — screen readers го обявяват
- SOS бутонът има `aria-label` с телефона
- `animate-pulse` е CSS-only — CLS = 0, не влияе на Core Web Vitals
- Без нови routes — без промени в sitemap

## Файлове за промяна/създаване

| Файл | Действие |
|------|---------|
| `content/services.json` | Преместване на avariyen на позиция 0 |
| `src/components/ServiceCard.tsx` | Условен стил за авариената карта |
| `src/components/CallButtons.tsx` | Пулсиращ телефон + SOS бутон |
| `src/components/EmergencyBar.tsx` | Нов компонент |
| `src/app/layout.tsx` | Добавяне на EmergencyBar |
| `src/app/uslugi/[slug]/page.tsx` | Авариена CTA секция |
