// Visuals come from Card.styles.ts (synced from Paper).
import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../cn'
import { cardStyles as s } from './Card.styles'

export const Card = ({ className, ...props }: HTMLAttributes<HTMLElement>) => (
  <section className={cn(s.root, className)} {...props} />
)

export type CardHeaderProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  title: ReactNode
  /** Right-aligned slot (Paper: "Action slot"). */
  action?: ReactNode
}

export const CardHeader = ({ title, action, className, ...props }: CardHeaderProps) => (
  <header className={cn(s.header, className)} {...props}>
    <h3 className={s.title}>{title}</h3>
    {action && <div className={s.action}>{action}</div>}
  </header>
)

export const CardBody = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(s.body, className)} {...props} />
)

export const CardFooter = ({ className, ...props }: HTMLAttributes<HTMLElement>) => (
  <footer className={cn(s.footer, className)} {...props} />
)
