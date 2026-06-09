import { useCurrentFrame, interpolate, Easing } from 'remotion'

const PATH = 'M 980 60 L 920 280 L 960 280 L 870 520 L 930 520 L 820 780'
const PATH_LENGTH = 780

export const LightningBolt: React.FC = () => {
  const frame = useCurrentFrame()

  const drawProgress = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })

  const dashOffset = PATH_LENGTH * (1 - drawProgress)

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
