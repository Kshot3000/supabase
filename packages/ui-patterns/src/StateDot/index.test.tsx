import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { StateDot } from './index'

describe('StateDot', () => {
  it('renders the label', () => {
    render(<StateDot variant="success">Enabled</StateDot>)

    expect(screen.getByText('Enabled')).toBeVisible()
  })

  it('applies the variant colour class on the dot', () => {
    const { container } = render(<StateDot variant="destructive">Failed</StateDot>)

    expect(container.querySelector('.bg-destructive')).toBeInTheDocument()
  })

  it('renders a ping layer when pulsing', () => {
    const { container } = render(
      <StateDot variant="warning" isPulsing>
        Starting
      </StateDot>
    )

    expect(container.querySelector('.animate-ping')).toBeInTheDocument()
  })

  it('does not render a ping layer when not pulsing', () => {
    const { container } = render(<StateDot variant="default">Idle</StateDot>)

    expect(container.querySelector('.animate-ping')).not.toBeInTheDocument()
  })

  it('passes className and labelClassName through', () => {
    render(
      <StateDot variant="success" className="root-class" labelClassName="label-class">
        Live
      </StateDot>
    )

    const label = screen.getByText('Live')
    expect(label).toHaveClass('label-class')
    expect(label.parentElement).toHaveClass('root-class')
  })
})
