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
          width: 540,
          height: 'auto',
          filter: `drop-shadow(0 0 ${glowIntensity}px #1d4ed8) drop-shadow(0 0 ${glowIntensity * 1.5}px #3b82f6)`,
        }}
      />
    </div>
  )
}
