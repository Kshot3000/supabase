import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Status, type StatusValue } from './index'

const statusExpectations: Array<{
  value: StatusValue
  label: string
  tone: 'positive' | 'destructive' | 'neutral'
}> = [
  { value: 'enabled', label: 'Enabled', tone: 'positive' },
  { value: 'disabled', label: 'Disabled', tone: 'neutral' },
  { value: 'success', label: 'Success', tone: 'positive' },
  { value: 'failure', label: 'Failure', tone: 'destructive' },
  { value: 'pending', label: 'Pending', tone: 'neutral' },
  { value: 'inactive', label: 'Inactive', tone: 'neutral' },
  { value: 'unknown', label: 'Unknown', tone: 'neutral' },
  { value: 'skipped', label: 'Skipped', tone: 'neutral' },
]

describe('Status', () => {
  it.each(statusExpectations)('renders the default $label label for $value', ({ value, label }) => {
    render(<Status value={value} />)

    expect(screen.getByText(label)).toBeVisible()
  })

  it.each(statusExpectations)(
    'applies the expected $tone tone and icon for $value',
    ({ value, label, tone }) => {
      render(<Status value={value} />)

      const root = screen.getByText(label).closest('[data-value]')

      expect(root).not.toBeNull()
      expect(root).toHaveAttribute('data-value', value)
      expect(root).toHaveAttribute('data-tone', tone)
      expect(root?.querySelector('[data-slot="status-icon"]')).toBeInTheDocument()
    }
  )

  it('allows children to override the rendered label without changing the semantic styling', () => {
    render(<Status value="enabled">Active</Status>)

    const root = screen.getByText('Active').closest('[data-value]')

    expect(screen.getByText('Active')).toBeVisible()
    expect(screen.queryByText('Enabled')).not.toBeInTheDocument()
    expect(root).not.toBeNull()
    expect(root).toHaveAttribute('data-value', 'enabled')
    expect(root).toHaveAttribute('data-tone', 'positive')
  })

  it('passes className through to the root and keeps the status non-wrapping', () => {
    render(<Status value="enabled" className="test-class" />)

    const root = screen.getByText('Enabled').closest('[data-value]')

    expect(root).not.toBeNull()
    expect(root).toHaveClass('test-class')
    expect(root).toHaveClass('whitespace-nowrap')
    expect(root?.querySelector('[data-slot="status-icon"]')).toBeInTheDocument()
  })
})
