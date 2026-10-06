import { Status } from 'ui-patterns/Status'

export default function StatusDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Status value="enabled" />
      <Status value="disabled" />
      <Status value="success" />
      <Status value="failure" />
      <Status value="pending" />
      <Status value="inactive" />
      <Status value="unknown" />
      <Status value="skipped" />
      <Status value="enabled">Active</Status>
      <Status value="success">Running</Status>
    </div>
  )
}
