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
