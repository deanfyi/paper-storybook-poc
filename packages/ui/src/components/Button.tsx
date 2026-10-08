// Behaviour + semantics only; visuals come from Button.styles.ts (synced from Paper).
// Code-only: <button> semantics, focus ring, disabled cursor, asChild.
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../cn'
import { Slot } from '../Slot'
import { buttonStyles as s } from './Button.styles'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof s.variant
  /** Style the child element (e.g. a framework Link) as a button instead of rendering <button>. */
  asChild?: boolean
}

export const Button = ({
  variant = 'primary',
  asChild,
  className,
  type = 'button',
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      {...(asChild ? {} : { type })}
      className={cn(
        s.base,
        s.variant[variant],
        s.disabled,
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    />
  )
}
