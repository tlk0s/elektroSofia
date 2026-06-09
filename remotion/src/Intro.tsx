import { AbsoluteFill, Sequence } from 'remotion'
import { LightningBolt } from './components/LightningBolt'
import { AmberLine } from './components/AmberLine'
import { BrandName } from './components/BrandName'
import { Logo } from './components/Logo'
import { Tagline } from './components/Tagline'
import { ServiceLabel } from './components/ServiceLabel'
import { PhoneTag } from './components/PhoneTag'

export const Intro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0f172a', overflow: 'hidden' }}>
      {/* Светкавица: global 0–44 */}
      <Sequence from={0} durationInFrames={45}>
        <LightningBolt />
      </Sequence>

      {/* Лого: global 15+ */}
      <Sequence from={15}>
        <Logo />
      </Sequence>

      {/* Amber линия: global 45+ */}
      <Sequence from={45}>
        <AmberLine />
      </Sequence>

      {/* Бранд name: global 45+ */}
      <Sequence from={45} layout="none">
        <BrandName />
      </Sequence>

      {/* Tagline typewriter: global 75+ */}
      <Sequence from={75} layout="none">
        <Tagline />
      </Sequence>

      {/* Service label: global 105+ */}
      <Sequence from={105} layout="none">
        <ServiceLabel />
      </Sequence>

      {/* Телефон: global 135–150 */}
      <Sequence from={135} durationInFrames={15} layout="none">
        <PhoneTag />
      </Sequence>
    </AbsoluteFill>
  )
}
