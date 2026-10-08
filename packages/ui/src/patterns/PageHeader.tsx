// Source: Paper "Jazzy nest" › Screens › Deposit › "Page header".
import type { ReactNode } from 'react'

export type PageHeaderProps = { title: ReactNode; description?: ReactNode }

export const PageHeader = ({ title, description }: PageHeaderProps) => (
  <header className="flex flex-col gap-1">
    <h1 className="text-xl/display font-semibold tracking-tight text-foreground">{title}</h1>
    {description && <p className="text-sm/tight text-muted-foreground">{description}</p>}
  </header>
)
