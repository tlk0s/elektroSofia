import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion'
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
  const opacity = interpolate(s, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' })

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
