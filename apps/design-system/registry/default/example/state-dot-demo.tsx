import { StateDot } from 'ui-patterns/StateDot'

export default function StateDotDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <StateDot variant="success">Enabled</StateDot>
      <StateDot variant="default">Disabled</StateDot>
      <StateDot variant="success">Live</StateDot>
      <StateDot variant="warning" isPulsing>
        Starting
      </StateDot>
      <StateDot variant="destructive">Failed</StateDot>
      <StateDot variant="default">Unknown</StateDot>
    </div>
  )
}
