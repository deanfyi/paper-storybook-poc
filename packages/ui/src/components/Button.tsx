// Source: Paper "Jazzy nest" › Components › Button (Button/Primary, Button/Secondary, Button/Disabled).
// Added in code (not in Paper): <button> semantics, focus ring, disabled cursor.
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../cn'

const variants = {
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-muted text-foreground border border-border',
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants
}

export const Button = ({ variant = 'primary', className, type = 'button', ...props }: ButtonProps) => (
  <button
    type={type}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md px-4 text-sm/tight font-semibold',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
      'disabled:cursor-not-allowed disabled:opacity-disabled',
      variants[variant],
      className,
    )}
    {...props}
  />
)
