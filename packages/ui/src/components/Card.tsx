// Source: Paper "Jazzy nest" › Components › Card (Card/Header, Card/Body, Card/Footer).
import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../cn'

export const Card = ({ className, ...props }: HTMLAttributes<HTMLElement>) => (
  <section
    className={cn('flex w-sm flex-col rounded-md border border-border bg-background', className)}
    {...props}
  />
)

export type CardHeaderProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  title: ReactNode
  /** Right-aligned slot (Paper: "Action slot"). */
  action?: ReactNode
}

export const CardHeader = ({ title, action, className, ...props }: CardHeaderProps) => (
  <header
    className={cn('flex items-center justify-between border-b border-border px-6 py-4', className)}
    {...props}
  >
    <h3 className="text-base/normal font-semibold text-foreground">{title}</h3>
    {action && <div className="text-sm/tight text-muted-foreground">{action}</div>}
  </header>
)

export const CardBody = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-1 p-6', className)} {...props} />
)

export const CardFooter = ({ className, ...props }: HTMLAttributes<HTMLElement>) => (
  <footer
    className={cn('flex justify-end gap-2 border-t border-border px-6 py-4', className)}
    {...props}
  />
)
