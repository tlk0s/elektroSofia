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
