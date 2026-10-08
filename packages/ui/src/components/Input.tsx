// Behaviour + semantics only; visuals come from Input.styles.ts (synced from Paper).
// Code-only: <label>/<input> semantics, aria wiring, focus ring.
import { useId, type InputHTMLAttributes } from 'react'
import { cn } from '../cn'
import { focusRing } from '../focusRing'
import { inputStyles as s } from './Input.styles'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
  /** Replaces the hint and switches to the error style. */
  error?: string
}

export const Input = ({ label, hint, error, id, className, ...props }: InputProps) => {
  const autoId = useId()
  const inputId = id ?? autoId
  const messageId = `${inputId}-message`
  const message = error ?? hint
  const state = s.state[error ? 'error' : 'default']

  return (
    <div className={cn(s.root, className)}>
      <label htmlFor={inputId} className={s.label}>
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        className={cn(s.field, s.placeholder, state.field, focusRing)}
        {...props}
      />
      {message && (
        <span id={messageId} className={cn(s.message, state.message)}>
          {message}
        </span>
      )}
    </div>
  )
}
