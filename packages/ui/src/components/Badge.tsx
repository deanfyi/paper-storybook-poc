// Source: Paper "Jazzy nest" › Components › Badge (Badge/Success, Badge/Warning, Badge/Neutral).
import type { HTMLAttributes } from 'react'
import { cn } from '../cn'

const tones = {
  success: 'bg-success/tint text-success',
  warning: 'bg-warning/tint text-warning',
  neutral: 'bg-muted text-muted-foreground',
}

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: keyof typeof tones
}

export const Badge = ({ tone = 'neutral', className, ...props }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex h-6 items-center rounded-full px-2 text-xs/tight font-semibold',
      tones[tone],
      className,
    )}
    {...props}
  />
)
