import {
  Check,
  Clock3,
  HelpCircle,
  Pause,
  SkipForward,
  ToggleLeft,
  ToggleRight,
  X,
} from 'lucide-react'
import type { ComponentType, HTMLAttributes, ReactNode } from 'react'
import { cn } from 'ui'

export type StatusValue =
  | 'enabled'
  | 'disabled'
  | 'success'
  | 'failure'
  | 'pending'
  | 'inactive'
  | 'unknown'
  | 'skipped'

interface StatusProps extends HTMLAttributes<HTMLDivElement> {
  value: StatusValue
  children?: ReactNode
}

type StatusTone = 'positive' | 'destructive' | 'neutral'

const statusClassName =
  'inline-flex items-center justify-center gap-1.5 rounded-md text-center font-mono uppercase whitespace-nowrap font-medium tracking-[0.06em] text-[11px] leading-[1.1] px-[7px] py-[3px] transition-all border'

const statusToneClassNames: Record<StatusTone, string> = {
  positive: 'bg-brand-default/10 text-brand-600 border-brand-500',
  destructive: 'bg-destructive/10 text-destructive-600 border-destructive-500',
  neutral: 'bg-surface-75 text-foreground-light border-strong',
}

const statusConfig: Record<
  StatusValue,
  {
    label: string
    tone: StatusTone
    icon: ComponentType<{ className?: string }>
  }
> = {
  enabled: {
    label: 'Enabled',
    tone: 'positive',
    icon: ToggleRight,
  },
  disabled: {
    label: 'Disabled',
    tone: 'neutral',
    icon: ToggleLeft,
  },
  success: {
    label: 'Success',
    tone: 'positive',
    icon: Check,
  },
  failure: {
    label: 'Failure',
    tone: 'destructive',
    icon: X,
  },
  pending: {
    label: 'Pending',
    tone: 'neutral',
    icon: Clock3,
  },
  inactive: {
    label: 'Inactive',
    tone: 'neutral',
    icon: Pause,
  },
  unknown: {
    label: 'Unknown',
    tone: 'neutral',
    icon: HelpCircle,
  },
  skipped: {
    label: 'Skipped',
    tone: 'neutral',
    icon: SkipForward,
  },
}

/**
 * Compact operational status for enabled/disabled and short lifecycle outcomes.
 * Prefer StateDot for dense live-process tables (pipelines, warehouse).
 * Prefer Badge for capsule context labels (plan, environment, "New").
 */
export function Status({ value, className, children, ...props }: StatusProps) {
  const { label, tone, icon: Icon } = statusConfig[value]

  return (
    <div
      className={cn(statusClassName, statusToneClassNames[tone], className)}
      data-value={value}
      data-tone={tone}
      {...props}
    >
      <Icon aria-hidden="true" data-slot="status-icon" className="size-3 shrink-0" />
      <span data-slot="status-label">{children ?? label}</span>
    </div>
  )
}
