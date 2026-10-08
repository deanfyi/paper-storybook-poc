// Visuals come from Badge.styles.ts (synced from Paper).
import type { HTMLAttributes } from 'react'
import { cn } from '../cn'
import { badgeStyles as s } from './Badge.styles'

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: keyof typeof s.tone
}

export const Badge = ({ tone = 'neutral', className, ...props }: BadgeProps) => (
  <span className={cn(s.base, s.tone[tone], className)} {...props} />
)
