// Source: Paper "Jazzy nest" › Screens › Deposit › "Terms link" (exported as a styled div; Paper has no link concept).
// Always asChild: ui never renders <a> itself, the app passes its own link (e.g. next/link).
import type { ReactElement } from 'react'
import { Slot } from '../Slot'

export type TextLinkProps = { children: ReactElement }

export const TextLink = ({ children }: TextLinkProps) => (
  <Slot className="font-medium text-primary underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-primary">
    {children}
  </Slot>
)
