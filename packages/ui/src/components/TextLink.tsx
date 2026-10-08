// Always asChild: ui never renders <a> itself, the app passes its own link (e.g. next/link).
// Visuals come from TextLink.styles.ts (synced from Paper); focus ring is code-only.
import type { ReactElement } from 'react'
import { cn } from '../cn'
import { Slot } from '../Slot'
import { textLinkStyles as s } from './TextLink.styles'

export type TextLinkProps = { children: ReactElement }

export const TextLink = ({ children }: TextLinkProps) => (
  <Slot className={cn(s.base, 'focus-visible:outline-2 focus-visible:outline-primary')}>{children}</Slot>
)
