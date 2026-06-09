import { useCurrentFrame, interpolate, Easing } from 'remotion'
import { fontFamily } from '../lib/fonts'

const TAGLINE = 'Електротехник в София 24/7'

export const Tagline: React.FC = () => {
  const frame = useCurrentFrame()

  const charsVisible = Math.floor(
    interpolate(frame, [0, 30], [0, TAGLINE.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.linear,
    })
  )

  const text = TAGLINE.slice(0, charsVisible)
  const cursorVisible = charsVisible < TAGLINE.length && Math.floor(frame / 4) % 2 === 0

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
        {cursorVisible && <span>|</span>}
      </span>
    </div>
  )
}
