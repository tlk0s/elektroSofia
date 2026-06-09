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
