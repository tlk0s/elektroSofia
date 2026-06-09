# Remotion Video Intro Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Изграждане на 5-секундна Remotion шапка за TikTok/Instagram Reels за Николов инжинеринг — електро стил, props от `.env`, render до MP4.

**Architecture:** Отделна папка `remotion/` в корена на репото с независим `package.json`. Главният компонент `Intro.tsx` оркестрира 5 под-компонента по timeline. Конфигурацията (телефон + услуга) се чете от `remotion/.env` чрез `src/lib/config.ts` и се подава като props.

**Tech Stack:** Remotion 4.x, React 18, TypeScript 5, `@remotion/cli` за Studio preview и render.

---

## File Map

| Файл | Действие | Отговорност |
|------|---------|-------------|
| `remotion/package.json` | Create | Remotion зависимости, npm scripts |
| `remotion/tsconfig.json` | Create | TS конфиг за remotion/ |
| `remotion/.env.example` | Create | Шаблон с placeholder стойности |
| `remotion/.gitignore` | Create | Игнорира `.env` и `out/` |
| `remotion/src/lib/config.ts` | Create | Чете `process.env.REMOTION_*` → `{ phone, service }` |
| `remotion/src/lib/easings.ts` | Create | `springConfig`, `fadeIn()`, `slideUp()`, `slideRight()` helpers |
| `remotion/src/components/LightningBolt.tsx` | Create | SVG зигзаг с `strokeDashoffset` draw анимация |
| `remotion/src/components/AmberLine.tsx` | Create | Хоризонтална amber линия slide-in |
| `remotion/src/components/Logo.tsx` | Create | Лого + scale spring + glow пулс |
| `remotion/src/components/PhoneTag.tsx` | Create | Телефон + пулсираща зелена точка |
| `remotion/src/Intro.tsx` | Create | Главен компонент — оркестрира всички под-компоненти по timeline |
| `remotion/src/Root.tsx` | Create | `<Composition>` регистрация |
| `remotion/src/index.ts` | Create | `registerRoot(Root)` |

---

## Task 1: Scaffold — package.json, tsconfig, gitignore

**Files:**
- Create: `remotion/package.json`
- Create: `remotion/tsconfig.json`
- Create: `remotion/.gitignore`
- Create: `remotion/.env.example`

- [ ] **Step 1: Създай `remotion/` директорията и `package.json`**

```bash
mkdir -p remotion/src/components remotion/src/lib remotion/out
```

Създай `remotion/package.json`:

```json
{
  "name": "nikolov-remotion",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "studio": "remotion studio src/index.ts",
    "render": "remotion render src/index.ts Intro out/intro.mp4"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "remotion": "^4.0.0"
  },
  "devDependencies": {
    "@remotion/cli": "^4.0.0",
    "@types/react": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
```

- [ ] **Step 2: Инсталирай зависимостите**

```bash
cd remotion && npm install
```

Очаквано: `node_modules/` се създава, без грешки.

- [ ] **Step 3: Създай `remotion/tsconfig.json`**

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "target": "es2020"
  },
  "include": ["src/**/*"]
}
```

- [ ] **Step 4: Създай `remotion/.gitignore`**

```
node_modules/
out/
.env
```

- [ ] **Step 5: Създай `remotion/.env.example`**

```
REMOTION_PHONE=+359 88 888 8888
REMOTION_SERVICE=Смяна на табло
```

- [ ] **Step 6: Създай `remotion/.env` от примера**

```bash
cp remotion/.env.example remotion/.env
```

- [ ] **Step 7: Commit**

```bash
git add remotion/package.json remotion/tsconfig.json remotion/.gitignore remotion/.env.example
git commit -m "feat(remotion): scaffold package with deps"
```

---

## Task 2: `config.ts` и `easings.ts`

**Files:**
- Create: `remotion/src/lib/config.ts`
- Create: `remotion/src/lib/easings.ts`

- [ ] **Step 1: Създай `remotion/src/lib/config.ts`**

```typescript
// Remotion зарежда .env файла автоматично при стартиране на studio/render.
// Стойностите се четат от process.env по времето на bundle-а.

export const config = {
  phone: process.env.REMOTION_PHONE ?? '+359 88 888 8888',
  service: process.env.REMOTION_SERVICE ?? 'Електротехник в София',
}
```

- [ ] **Step 2: Създай `remotion/src/lib/easings.ts`**

```typescript
import { interpolate, spring, type SpringConfig } from 'remotion'

// Spring конфиг за влизане на елементи — бавен overshoot
export const springConfig: SpringConfig = {
  damping: 18,
  mass: 0.8,
  stiffness: 120,
  overshootClamping: false,
}

// Spring конфиг без bounce — за лого scale
export const springConfigSmooth: SpringConfig = {
  damping: 28,
  mass: 1,
  stiffness: 100,
  overshootClamping: true,
}

/** fade-in: 0→1 за `durationFrames` frames, стартира от `startFrame` */
export function fadeIn(
  frame: number,
  startFrame: number,
  durationFrames: number,
): number {
  return interpolate(frame, [startFrame, startFrame + durationFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
}

/** slide-up: translateY от `fromY` до 0 с spring */
export function slideUp(
  frame: number,
  startFrame: number,
  fps: number,
  fromY: number = 40,
): { translateY: number; opacity: number } {
  const s = spring({ frame: frame - startFrame, fps, config: springConfig })
  const translateY = interpolate(s, [0, 1], [fromY, 0])
  const opacity = interpolate(s, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' })
  return { translateY, opacity }
}

/** slide-right: scaleX от 0 → 1 за amber линията */
export function slideRight(
  frame: number,
  startFrame: number,
  durationFrames: number,
): number {
  return interpolate(frame, [startFrame, startFrame + durationFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
}
```

- [ ] **Step 3: Commit**

```bash
git add remotion/src/lib/config.ts remotion/src/lib/easings.ts
git commit -m "feat(remotion): add config and easing helpers"
```

---

## Task 3: `LightningBolt.tsx`

**Files:**
- Create: `remotion/src/components/LightningBolt.tsx`

Светкавицата се "рисува" от горе надолу с `strokeDashoffset` анимация — frames 0–15.

- [ ] **Step 1: Създай `remotion/src/components/LightningBolt.tsx`**

```tsx
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion'

// Зигзаг path — горен десен ъгъл на 1080x1920 frame
// Координатите са абсолютни пиксели, SVG viewport съвпада с frame размера
const PATH = 'M 980 60 L 920 280 L 960 280 L 870 520 L 930 520 L 820 780'
const PATH_LENGTH = 780 // приблизителна дължина на path-а в px

export default function LightningBolt() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Draw анимация: frames 0–15 (0.5 сек)
  const drawProgress = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const dashOffset = PATH_LENGTH * (1 - drawProgress)

  // Glow избледнява малко след draw-а
  const glowOpacity = interpolate(frame, [15, 45], [1, 0.4], {
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
      {/* Glow слой — по-широк, по-прозрачен */}
      <path
        d={PATH}
        fill="none"
        stroke="#ffffff"
        strokeWidth={12}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={PATH_LENGTH}
        strokeDashoffset={dashOffset}
        style={{ opacity: glowOpacity * 0.3, filter: 'blur(8px)' }}
      />
      {/* Основен stroke */}
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
          filter: `drop-shadow(0 0 8px #ffffff) drop-shadow(0 0 16px #1d4ed8)`,
          opacity: glowOpacity,
        }}
      />
    </svg>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add remotion/src/components/LightningBolt.tsx
git commit -m "feat(remotion): add LightningBolt SVG draw animation"
```

---

## Task 4: `AmberLine.tsx`

**Files:**
- Create: `remotion/src/components/AmberLine.tsx`

- [ ] **Step 1: Създай `remotion/src/components/AmberLine.tsx`**

```tsx
import { useCurrentFrame, useVideoConfig } from 'remotion'
import { slideRight } from '../lib/easings'

// Стартира на frame 45 (1.5 сек), продължава 30 frames (1 сек)
const START_FRAME = 45
const DURATION_FRAMES = 30

export default function AmberLine() {
  const frame = useCurrentFrame()

  const scaleX = slideRight(frame, START_FRAME, DURATION_FRAMES)

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 920, // центъра вертикално + малко над средата
        left: 0,
        width: '100%',
        height: 3,
        backgroundColor: '#f59e0b',
        transformOrigin: 'left center',
        transform: `scaleX(${scaleX})`,
      }}
    />
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add remotion/src/components/AmberLine.tsx
git commit -m "feat(remotion): add AmberLine slide-in component"
```

---

## Task 5: `Logo.tsx`

**Files:**
- Create: `remotion/src/components/Logo.tsx`

Логото се взема от `../public/logo.png` (relative path от `remotion/` към Next.js `public/`). Влиза с scale spring + glow.

- [ ] **Step 1: Създай `remotion/src/components/Logo.tsx`**

```tsx
import { Img, staticFile, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion'
import { springConfigSmooth } from '../lib/easings'

// Стартира на frame 15 (0.5 сек)
const START_FRAME = 15

export default function Logo() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const s = spring({
    frame: frame - START_FRAME,
    fps,
    config: springConfigSmooth,
  })

  const scale = interpolate(s, [0, 1], [0.6, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const opacity = interpolate(s, [0, 0.3], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Glow пулс: frames 15–45 — glow се засилва веднъж и избледнява
  const glowIntensity = interpolate(frame, [15, 30, 45], [0, 20, 8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        marginTop: -200, // изместване нагоре от центъра
      }}
    >
      <Img
        // staticFile() резолвира спрямо remotion/ директорията
        // Remotion bundler-ът достъпва файлове само от собствената си директория,
        // затова логото се копира в remotion/public/ при setup-а (Task 1 Step 6 вариант)
        src={staticFile('logo.png')}
        style={{
          width: 160,
          height: 'auto',
          filter: `drop-shadow(0 0 ${glowIntensity}px #1d4ed8) drop-shadow(0 0 ${glowIntensity * 2}px #3b82f6)`,
        }}
      />
    </div>
  )
}
```

> **Важно за `staticFile()`:** Remotion's `staticFile()` търси файлове в `remotion/public/`. Затова трябва да се копира логото:

- [ ] **Step 2: Копирай логото в `remotion/public/`**

```bash
mkdir -p remotion/public
cp public/logo.png remotion/public/logo.png
```

Добави в `remotion/.gitignore` бележка — логото се копира при setup, не се commit-ва дублирано:

```bash
# Добави ред в remotion/.gitignore
echo "# logo се копира от ../public/logo.png при setup" >> remotion/.gitignore
```

- [ ] **Step 3: Commit**

```bash
git add remotion/src/components/Logo.tsx remotion/public/logo.png remotion/.gitignore
git commit -m "feat(remotion): add Logo component with scale spring and glow"
```

---

## Task 6: `PhoneTag.tsx`

**Files:**
- Create: `remotion/src/components/PhoneTag.tsx`

- [ ] **Step 1: Създай `remotion/src/components/PhoneTag.tsx`**

```tsx
import { useCurrentFrame, interpolate } from 'remotion'
import { config } from '../lib/config'

// Стартира на frame 135 (4.5 сек)
const START_FRAME = 135

export default function PhoneTag() {
  const frame = useCurrentFrame()

  const opacity = interpolate(frame, [START_FRAME, START_FRAME + 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Зелената точка пулсира — синусоидален opacity
  const pulseOpacity = 0.6 + 0.4 * Math.sin((frame / 8) * Math.PI)

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
        gap: 12,
        opacity,
      }}
    >
      {/* Пулсираща зелена точка */}
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: '50%',
          backgroundColor: '#4ade80',
          opacity: pulseOpacity,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          color: '#ffffff',
          fontSize: 40,
          fontWeight: 600,
          fontFamily: 'Inter, system-ui, sans-serif',
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
git commit -m "feat(remotion): add PhoneTag component with pulsing dot"
```

---

## Task 7: `Intro.tsx` — главният компонент

**Files:**
- Create: `remotion/src/Intro.tsx`

Оркестрира всички под-компоненти по timeline. Всички frame числа съвпадат с дизайн документа.

- [ ] **Step 1: Създай `remotion/src/Intro.tsx`**

```tsx
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion'
import { AbsoluteFill } from 'remotion'
import LightningBolt from './components/LightningBolt'
import AmberLine from './components/AmberLine'
import Logo from './components/Logo'
import PhoneTag from './components/PhoneTag'
import { fadeIn, slideUp } from './lib/easings'
import { config } from './lib/config'

export default function Intro() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Фон: черен → тъмно синьо frames 0–15
  const bgBlue = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // "Николов инжинеринг" — slide-up frames 45–75
  const brandName = slideUp(frame, 45, fps, 40)

  // "Електротехник в София 24/7" typewriter — frames 75–105
  const TAGLINE = 'Електротехник в София 24/7'
  const taglineProgress = interpolate(frame, [75, 105], [0, TAGLINE.length], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const taglineText = TAGLINE.slice(0, Math.floor(taglineProgress))

  // Service label — slide-up frames 105–135
  const serviceAnim = slideUp(frame, 105, fps, 30)

  return (
    <AbsoluteFill
      style={{
        backgroundColor: `rgb(${interpolate(bgBlue, [0, 1], [0, 15])}, ${interpolate(bgBlue, [0, 1], [0, 23])}, ${interpolate(bgBlue, [0, 1], [0, 42])})`,
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Светкавица — frames 0–45 */}
      <LightningBolt />

      {/* Лого — frames 15–45 */}
      <Logo />

      {/* Amber линия — frames 45–75 */}
      <AmberLine />

      {/* Бранд name — frames 45–75 */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          textAlign: 'center',
          marginTop: 30,
          transform: `translateY(${brandName.translateY}px)`,
          opacity: brandName.opacity,
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: '-0.01em',
          }}
        >
          Николов инжинеринг
        </span>
      </div>

      {/* Tagline typewriter — frames 75–105 */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          textAlign: 'center',
          marginTop: 120,
          opacity: fadeIn(frame, 75, 10),
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontSize: 48,
            fontWeight: 600,
            letterSpacing: '0.01em',
          }}
        >
          {taglineText}
          {/* Мигащ курсор докато пише */}
          {frame >= 75 && frame <= 108 && (
            <span style={{ opacity: Math.floor(frame / 4) % 2 === 0 ? 1 : 0 }}>|</span>
          )}
        </span>
      </div>

      {/* Service label — frames 105–135 */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          marginTop: 240,
          transform: `translateY(${serviceAnim.translateY}px)`,
          opacity: serviceAnim.opacity,
        }}
      >
        <span
          style={{
            color: '#f59e0b',
            fontSize: 52,
            fontWeight: 700,
            border: '2px solid #f59e0b',
            borderRadius: 8,
            padding: '8px 20px',
            letterSpacing: '0.02em',
          }}
        >
          {config.service}
        </span>
      </div>

      {/* Телефон — frames 135–150 */}
      <PhoneTag />
    </AbsoluteFill>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add remotion/src/Intro.tsx
git commit -m "feat(remotion): add main Intro composition component"
```

---

## Task 8: `Root.tsx` и `index.ts` — регистрация

**Files:**
- Create: `remotion/src/Root.tsx`
- Create: `remotion/src/index.ts`

- [ ] **Step 1: Създай `remotion/src/Root.tsx`**

```tsx
import { Composition } from 'remotion'
import Intro from './Intro'

export default function Root() {
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

- [ ] **Step 2: Създай `remotion/src/index.ts`**

```typescript
import { registerRoot } from 'remotion'
import Root from './Root'

registerRoot(Root)
```

- [ ] **Step 3: Commit**

```bash
git add remotion/src/Root.tsx remotion/src/index.ts
git commit -m "feat(remotion): register Root composition"
```

---

## Task 9: Проверка в Studio и финален render

**Files:** Няма нови файлове — само проверка.

- [ ] **Step 1: Стартирай Remotion Studio**

```bash
cd remotion && npm run studio
```

Очаквано: браузърът отваря `http://localhost:3000`, вижда се `Intro` composition, 150 frames, 1080×1920.

Провери визуално:
- Frame 0–15: светкавица се "рисува" от горе надолу
- Frame 15–45: лого влиза с scale и glow
- Frame 45–75: amber линия slide-in + „Николов инжинеринг" slide-up
- Frame 75–105: typewriter за „Електротехник в София 24/7"
- Frame 105–135: service label в amber кутийка
- Frame 135–150: телефон с пулсираща зелена точка

- [ ] **Step 2: Провери `.env` стойностите**

```bash
cat remotion/.env
```

Очаквано:
```
REMOTION_PHONE=+359 88 888 8888
REMOTION_SERVICE=Смяна на табло
```

- [ ] **Step 3: Render до MP4**

```bash
cd remotion && npm run render
```

Очаквано: `remotion/out/intro.mp4` се създава, ~5 секунди, 1080×1920.

- [ ] **Step 4: Добави `remotion/out/` в `.gitignore` на root ниво**

```bash
echo "remotion/out/" >> .gitignore
```

```bash
git add .gitignore
git commit -m "chore: ignore remotion render output"
```

- [ ] **Step 5: Финален commit**

```bash
git status
# Ако има незаписани файлове:
git add -A
git commit -m "feat(remotion): complete video intro implementation"
```

---

## Бързо ръководство за промяна на услугата

За да генерираш intro за различна услуга:

```bash
# Редактирай remotion/.env
REMOTION_SERVICE=Авариен електротехник 24/7

# Render
cd remotion && npm run render -- --output out/intro-avariyen.mp4
```
