# Remotion Video Intro Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Изграждане на 5-секундна Remotion шапка за TikTok/Instagram Reels за Николов инжинеринг — електро стил, конфигурация от `.env`, render до MP4.

**Architecture:** Отделна папка `remotion/` в корена на репото, scaffolded с `npx create-video@latest`. Главният компонент `Intro.tsx` оркестрира под-компоненти чрез `<Sequence>` (официален Remotion pattern). Конфигурацията (телефон + услуга) се чете от `remotion/.env` чрез `src/lib/config.ts`.

**Tech Stack:** Remotion 4.x (create-video scaffold), React 18, TypeScript 5, `@remotion/google-fonts` за Inter шрифт.

**Ключови правила от официалния Remotion skill:**
- CSS transitions и animations са ЗАБРАНЕНИ — не работят при render
- Tailwind animation класове са ЗАБРАНЕНИ
- Timing се прави с `<Sequence from={fps * N}>` — `useCurrentFrame()` вътре започва от 0
- Винаги `premountFor` на `<Sequence>`
- Assets в `public/`, достъпват се с `staticFile()`
- Шрифтове: `@remotion/google-fonts` с `loadFont()`

---

## File Map

| Файл | Действие | Отговорност |
|------|---------|-------------|
| `remotion/` | Scaffold | `npx create-video@latest --yes --blank --no-tailwind remotion` |
| `remotion/.env` | Create | `REMOTION_PHONE`, `REMOTION_SERVICE` |
| `remotion/.env.example` | Create | Шаблон |
| `remotion/public/logo.png` | Copy | Копие на `../public/logo.png` за `staticFile()` |
| `remotion/src/lib/config.ts` | Create | Чете `process.env.REMOTION_*` → `{ phone, service }` |
| `remotion/src/components/LightningBolt.tsx` | Create | SVG зигзаг, `strokeDashoffset` draw анимация |
| `remotion/src/components/AmberLine.tsx` | Create | Хоризонтална amber линия, `scaleX` interpolate |
| `remotion/src/components/Logo.tsx` | Create | Лого + scale spring + glow (Math.sin пулс) |
| `remotion/src/components/BrandName.tsx` | Create | „Николов инжинеринг" slide-up |
| `remotion/src/components/Tagline.tsx` | Create | Typewriter „Електротехник в София 24/7" |
| `remotion/src/components/ServiceLabel.tsx` | Create | Service от .env в amber кутийка |
| `remotion/src/components/PhoneTag.tsx` | Create | Телефон + Math.sin пулсираща зелена точка |
| `remotion/src/Intro.tsx` | Create | Главен компонент — `<Sequence>` оркестрация |
| `remotion/src/Root.tsx` | Modify | Замени default composition с Intro, 1080×1920, 150f, 30fps |

---

## Task 1: Scaffold и конфигурация

**Files:**
- Scaffold: `remotion/`
- Create: `remotion/.env`, `remotion/.env.example`
- Copy: `remotion/public/logo.png`

- [ ] **Step 1: Scaffold с create-video**

```bash
cd /Users/I313229/private/elektrotehnik-sofia
npx create-video@latest --yes --blank --no-tailwind remotion
```

Очаквано: папка `remotion/` с `package.json`, `src/`, `public/`, `src/Root.tsx`, `src/Composition.tsx`.

- [ ] **Step 2: Копирай логото в `remotion/public/`**

```bash
cp public/logo.png remotion/public/logo.png
```

- [ ] **Step 3: Добави Inter шрифт**

```bash
cd remotion && npx remotion add @remotion/google-fonts
```

- [ ] **Step 4: Създай `remotion/.env.example`**

```
REMOTION_PHONE=+359 88 888 8888
REMOTION_SERVICE=Смяна на табло
```

- [ ] **Step 5: Създай `remotion/.env` от примера**

```bash
cp remotion/.env.example remotion/.env
```

- [ ] **Step 6: Добави `.env` и `out/` в `remotion/.gitignore`**

Отвори `remotion/.gitignore` (или го създай ако не съществува) и добави:

```
.env
out/
```

- [ ] **Step 7: Commit**

```bash
git add remotion/ -A
git rm --cached remotion/.env 2>/dev/null || true
git add remotion/.env.example remotion/public/logo.png remotion/.gitignore
git commit -m "feat(remotion): scaffold project with create-video"
```

---

## Task 2: `config.ts` и Inter шрифт

**Files:**
- Create: `remotion/src/lib/config.ts`
- Create: `remotion/src/lib/fonts.ts`

- [ ] **Step 1: Създай `remotion/src/lib/` директория**

```bash
mkdir -p remotion/src/lib
```

- [ ] **Step 2: Създай `remotion/src/lib/config.ts`**

```typescript
// Remotion зарежда .env автоматично при studio/render.
export const config = {
  phone: process.env.REMOTION_PHONE ?? '+359 88 888 8888',
  service: process.env.REMOTION_SERVICE ?? 'Електротехник в София',
}
```

- [ ] **Step 3: Създай `remotion/src/lib/fonts.ts`**

```typescript
import { loadFont } from '@remotion/google-fonts/Inter'

export const { fontFamily } = loadFont('normal', {
  weights: ['400', '600', '700'],
  subsets: ['latin', 'cyrillic'],
})
```

- [ ] **Step 4: Commit**

```bash
git add remotion/src/lib/config.ts remotion/src/lib/fonts.ts
git commit -m "feat(remotion): add config and Inter font loader"
```

---

## Task 3: `LightningBolt.tsx`

**Files:**
- Create: `remotion/src/components/LightningBolt.tsx`

SVG зигзаг path, draw анимация с `strokeDashoffset`. Компонентът се използва вътре в `<Sequence from={0} durationInFrames={45}>` — `useCurrentFrame()` тук връща 0–44.

- [ ] **Step 1: Създай `remotion/src/components/` директория**

```bash
mkdir -p remotion/src/components
```

- [ ] **Step 2: Създай `remotion/src/components/LightningBolt.tsx`**

```tsx
import { useCurrentFrame, interpolate, Easing } from 'remotion'

const PATH = 'M 980 60 L 920 280 L 960 280 L 870 520 L 930 520 L 820 780'
const PATH_LENGTH = 780

export const LightningBolt: React.FC = () => {
  const frame = useCurrentFrame()

  // Draw: frames 0–15 (в контекста на Sequence — локални frames)
  const drawProgress = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })

  const dashOffset = PATH_LENGTH * (1 - drawProgress)

  // Glow избледнява след draw
  const glowOpacity = interpolate(frame, [15, 44], [1, 0.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      viewBox="0 0 1080 1920"
    >
      <path
        d={PATH}
        fill="none"
        stroke="#ffffff"
        strokeWidth={14}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={PATH_LENGTH}
        strokeDashoffset={dashOffset}
        style={{ opacity: glowOpacity * 0.25, filter: 'blur(6px)' }}
      />
      <path
        d={PATH}
        fill="none"
        stroke="#1d4ed8"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={PATH_LENGTH}
        strokeDashoffset={dashOffset}
        style={{
          filter: 'drop-shadow(0 0 8px #ffffff) drop-shadow(0 0 16px #1d4ed8)',
          opacity: glowOpacity,
        }}
      />
    </svg>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add remotion/src/components/LightningBolt.tsx
git commit -m "feat(remotion): add LightningBolt SVG draw animation"
```

---

## Task 4: `AmberLine.tsx` и `BrandName.tsx`

**Files:**
- Create: `remotion/src/components/AmberLine.tsx`
- Create: `remotion/src/components/BrandName.tsx`

Двата компонента влизат заедно на frame 45 (1.5 сек). Вътре в `<Sequence from={45}>` — `useCurrentFrame()` = 0 при frame 45.

- [ ] **Step 1: Създай `remotion/src/components/AmberLine.tsx`**

```tsx
import { useCurrentFrame, interpolate, Easing } from 'remotion'

export const AmberLine: React.FC = () => {
  const frame = useCurrentFrame()

  const scaleX = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })

  return (
    <div
      style={{
        position: 'absolute',
        top: 860,
        left: 0,
        width: '100%',
        height: 4,
        backgroundColor: '#f59e0b',
        transformOrigin: 'left center',
        transform: `scaleX(${scaleX})`,
      }}
    />
  )
}
```

- [ ] **Step 2: Създай `remotion/src/components/BrandName.tsx`**

```tsx
import { useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion'
import { fontFamily } from '../lib/fonts'

export const BrandName: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const s = spring({
    frame,
    fps,
    config: { damping: 18, mass: 0.8, stiffness: 120, overshootClamping: false },
  })

  const translateY = interpolate(s, [0, 1], [40, 0])
  const opacity = interpolate(s, [0, 0.2], [0, 1], {
    extrapolateRight: 'clamp',
  })

  return (
    <div
      style={{
        position: 'absolute',
        top: 880,
        left: 0,
        right: 0,
        textAlign: 'center',
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      <span
        style={{
          color: '#ffffff',
          fontSize: 64,
          fontWeight: 700,
          fontFamily,
          letterSpacing: '-0.01em',
        }}
      >
        Николов инжинеринг
      </span>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add remotion/src/components/AmberLine.tsx remotion/src/components/BrandName.tsx
git commit -m "feat(remotion): add AmberLine and BrandName components"
```

---

## Task 5: `Logo.tsx`

**Files:**
- Create: `remotion/src/components/Logo.tsx`

Вътре в `<Sequence from={15}>` — frame 0 = глобален frame 15.

- [ ] **Step 1: Създай `remotion/src/components/Logo.tsx`**

```tsx
import { Img, staticFile, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion'

export const Logo: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const s = spring({
    frame,
    fps,
    config: { damping: 28, mass: 1, stiffness: 100, overshootClamping: true },
  })

  const scale = interpolate(s, [0, 1], [0.6, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const opacity = interpolate(s, [0, 0.3], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Glow пулс: засилва се в началото и се стабилизира — Math.sin вместо CSS animation
  const glowIntensity = interpolate(frame, [0, 15, 30], [0, 22, 10], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <div
      style={{
        position: 'absolute',
        top: 600,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <Img
        src={staticFile('logo.png')}
        style={{
          width: 160,
          height: 'auto',
          filter: `drop-shadow(0 0 ${glowIntensity}px #1d4ed8) drop-shadow(0 0 ${glowIntensity * 1.5}px #3b82f6)`,
        }}
      />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add remotion/src/components/Logo.tsx
git commit -m "feat(remotion): add Logo component with spring scale and glow"
```

---

## Task 6: `Tagline.tsx` и `ServiceLabel.tsx`

**Files:**
- Create: `remotion/src/components/Tagline.tsx`
- Create: `remotion/src/components/ServiceLabel.tsx`

- [ ] **Step 1: Създай `remotion/src/components/Tagline.tsx`**

Typewriter: string slicing по официалния Remotion pattern. Вътре в `<Sequence from={75}>`.

```tsx
import { useCurrentFrame, interpolate, Easing } from 'remotion'
import { fontFamily } from '../lib/fonts'

const TAGLINE = 'Електротехник в София 24/7'

export const Tagline: React.FC = () => {
  const frame = useCurrentFrame()

  // Typewriter: slice по брой символи
  const charsVisible = Math.floor(
    interpolate(frame, [0, 30], [0, TAGLINE.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.linear,
    })
  )

  const text = TAGLINE.slice(0, charsVisible)

  // Мигащ курсор: видим докато пише (frame 0–33), Math-базиран без CSS
  const cursorVisible = charsVisible < TAGLINE.length && Math.floor(frame / 4) % 2 === 0

  // Fade-in на целия блок
  const opacity = interpolate(frame, [0, 5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <div
      style={{
        position: 'absolute',
        top: 980,
        left: 0,
        right: 0,
        textAlign: 'center',
        opacity,
      }}
    >
      <span
        style={{
          color: '#ffffff',
          fontSize: 48,
          fontWeight: 600,
          fontFamily,
          letterSpacing: '0.01em',
        }}
      >
        {text}
        {cursorVisible && (
          <span style={{ opacity: 1 }}>|</span>
        )}
      </span>
    </div>
  )
}
```

- [ ] **Step 2: Създай `remotion/src/components/ServiceLabel.tsx`**

```tsx
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion'
import { fontFamily } from '../lib/fonts'
import { config } from '../lib/config'

export const ServiceLabel: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const s = spring({
    frame,
    fps,
    config: { damping: 18, mass: 0.8, stiffness: 120, overshootClamping: false },
  })

  const translateY = interpolate(s, [0, 1], [30, 0])
  const opacity = interpolate(s, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' })

  return (
    <div
      style={{
        position: 'absolute',
        top: 1080,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      <span
        style={{
          color: '#f59e0b',
          fontSize: 52,
          fontWeight: 700,
          fontFamily,
          border: '2px solid #f59e0b',
          borderRadius: 8,
          padding: '8px 20px',
          letterSpacing: '0.02em',
        }}
      >
        {config.service}
      </span>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add remotion/src/components/Tagline.tsx remotion/src/components/ServiceLabel.tsx
git commit -m "feat(remotion): add Tagline typewriter and ServiceLabel components"
```

---

## Task 7: `PhoneTag.tsx`

**Files:**
- Create: `remotion/src/components/PhoneTag.tsx`

Вътре в `<Sequence from={135}>` — frame 0 = глобален frame 135. Пулсираща точка с `Math.sin` (не CSS animation).

- [ ] **Step 1: Създай `remotion/src/components/PhoneTag.tsx`**

```tsx
import { useCurrentFrame, interpolate, Easing } from 'remotion'
import { fontFamily } from '../lib/fonts'
import { config } from '../lib/config'

export const PhoneTag: React.FC = () => {
  const frame = useCurrentFrame()

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  })

  // Math.sin пулс — задължително вместо CSS animation
  const pulseOpacity = 0.5 + 0.5 * Math.sin((frame / 6) * Math.PI)

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 120,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 14,
        opacity,
      }}
    >
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          backgroundColor: '#4ade80',
          opacity: pulseOpacity,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          color: '#ffffff',
          fontSize: 42,
          fontWeight: 600,
          fontFamily,
          letterSpacing: '0.02em',
        }}
      >
        {config.phone}
      </span>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add remotion/src/components/PhoneTag.tsx
git commit -m "feat(remotion): add PhoneTag with Math.sin pulse"
```

---

## Task 8: `Intro.tsx` и `Root.tsx`

**Files:**
- Create: `remotion/src/Intro.tsx`
- Modify: `remotion/src/Root.tsx`

Оркестрира всички компоненти с `<Sequence>` + `premountFor`. Фонът е `#0f172a`.

- [ ] **Step 1: Създай `remotion/src/Intro.tsx`**

```tsx
import { AbsoluteFill, Sequence, useVideoConfig, interpolate } from 'remotion'
import { LightningBolt } from './components/LightningBolt'
import { AmberLine } from './components/AmberLine'
import { BrandName } from './components/BrandName'
import { Logo } from './components/Logo'
import { Tagline } from './components/Tagline'
import { ServiceLabel } from './components/ServiceLabel'
import { PhoneTag } from './components/PhoneTag'

export const Intro: React.FC = () => {
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f172a', overflow: 'hidden' }}>
      {/* Светкавица: frame 0–44 */}
      <Sequence from={0} durationInFrames={45} premountFor={0}>
        <LightningBolt />
      </Sequence>

      {/* Лого: frame 15 → края */}
      <Sequence from={15} premountFor={fps}>
        <Logo />
      </Sequence>

      {/* Amber линия: frame 45 → края */}
      <Sequence from={45} premountFor={fps}>
        <AmberLine />
      </Sequence>

      {/* Бранд name: frame 45 → края */}
      <Sequence from={45} premountFor={fps} layout="none">
        <BrandName />
      </Sequence>

      {/* Tagline typewriter: frame 75 → края */}
      <Sequence from={75} premountFor={fps} layout="none">
        <Tagline />
      </Sequence>

      {/* Service label: frame 105 → края */}
      <Sequence from={105} premountFor={fps} layout="none">
        <ServiceLabel />
      </Sequence>

      {/* Телефон: frame 135 → края */}
      <Sequence from={135} premountFor={fps} layout="none">
        <PhoneTag />
      </Sequence>
    </AbsoluteFill>
  )
}
```

- [ ] **Step 2: Замени съдържанието на `remotion/src/Root.tsx`**

```tsx
import { Composition } from 'remotion'
import { Intro } from './Intro'

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Intro"
      component={Intro}
      durationInFrames={150}
      fps={30}
      width={1080}
      height={1920}
    />
  )
}
```

- [ ] **Step 3: Провери дали `remotion/src/index.ts` регистрира `RemotionRoot`**

Отвори `remotion/src/index.ts`. Трябва да съдържа:

```typescript
import { registerRoot } from 'remotion'
import { RemotionRoot } from './Root'

registerRoot(RemotionRoot)
```

Ако е различно, замени с горното.

- [ ] **Step 4: Commit**

```bash
git add remotion/src/Intro.tsx remotion/src/Root.tsx remotion/src/index.ts
git commit -m "feat(remotion): add Intro composition with Sequence orchestration"
```

---

## Task 9: Studio проверка и render

**Files:** Няма нови файлове.

- [ ] **Step 1: Стартирай Studio**

```bash
cd remotion && npm run studio
```

Очаквано: `http://localhost:3000` с `Intro` composition, 150f, 1080×1920.

Провери визуално всеки phase:
- Frame 0–15: светкавица draw от горе надолу, синьо glow
- Frame 15–45: лого scale-in с glow
- Frame 45–75: amber линия slide-in + „Николов инжинеринг" slide-up
- Frame 75–105: typewriter „Електротехник в София 24/7" с мигащ курсор
- Frame 105–135: service label в amber кутийка
- Frame 135–150: телефон fade-in с пулсираща зелена точка

- [ ] **Step 2: Single-frame sanity check**

```bash
cd remotion && npx remotion still Intro --frame=30 --scale=0.25
```

Очаквано: PNG файл с лого, amber линия частично visible.

- [ ] **Step 3: Render до MP4**

```bash
cd remotion && npm run render
```

Очаквано: `remotion/out/intro.mp4`, ~5 сек, 1080×1920.

- [ ] **Step 4: Добави `remotion/out/` в root `.gitignore`**

```bash
echo "remotion/out/" >> .gitignore
git add .gitignore
git commit -m "chore: ignore remotion render output"
```

---

## Промяна на услугата за нов render

```bash
# Редактирай remotion/.env
REMOTION_SERVICE=Авариен електротехник 24/7

# Render с различно output
cd remotion && npx remotion render Intro out/intro-avariyen.mp4
```
