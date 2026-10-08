// Source: Paper "Jazzy nest" › Components › Input (Input/Default, Input/Error).
// Added in code (not in Paper): <label>/<input> semantics, aria wiring, focus ring.
import { useId, type InputHTMLAttributes } from 'react'
import { cn } from '../cn'

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

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={inputId} className="text-sm/tight font-medium text-foreground">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        className={cn(
          'h-10 rounded-md border bg-background px-3 text-sm/tight text-foreground',
          'placeholder:text-muted-foreground',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
          error ? 'border-danger' : 'border-border',
        )}
        {...props}
      />
      {message && (
        <span id={messageId} className={cn('text-xs/tight', error ? 'text-danger' : 'text-muted-foreground')}>
          {message}
        </span>
      )}
    </div>
  )
}
