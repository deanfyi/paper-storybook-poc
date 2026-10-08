// Always asChild: ui never renders <a> itself, the app passes its own link (e.g. next/link).
// Visuals come from TextLink.styles.ts (synced from Paper); focus ring from ../focusRing.
import type { ReactElement } from 'react'
import { cn } from '../cn'
import { focusRing } from '../focusRing'
import { Slot } from '../Slot'
import { textLinkStyles as s } from './TextLink.styles'

export type TextLinkProps = { children: ReactElement }

export const TextLink = ({ children }: TextLinkProps) => (
  <Slot className={cn(s.base, focusRing)}>{children}</Slot>
)
