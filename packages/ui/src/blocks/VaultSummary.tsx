// Source: Paper "Jazzy nest" › Screens › Deposit › VaultSummary.
// Presentational: all text and values arrive pre-translated / pre-formatted.
import type { ReactNode } from 'react'
import { Card, CardBody, CardHeader } from '../components/Card'

export type VaultSummaryProps = {
  title: ReactNode
  /** Header slot, e.g. <Badge tone="success">. */
  status?: ReactNode
  apyLabel: ReactNode
  apy: ReactNode
  stats: { label: ReactNode; value: ReactNode }[]
}

export const VaultSummary = ({ title, status, apyLabel, apy, stats }: VaultSummaryProps) => (
  <Card>
    <CardHeader title={title} action={status} />
    <CardBody>
      <span className="text-sm/tight text-muted-foreground">{apyLabel}</span>
      <span className="text-xl/display font-semibold tracking-tight">{apy}</span>
      <dl className="flex flex-col gap-2 pt-4">
        {stats.map((stat, i) => (
          <div key={i} className="flex justify-between gap-4 text-sm/tight">
            <dt className="text-muted-foreground">{stat.label}</dt>
            <dd className="text-right font-medium">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </CardBody>
  </Card>
)
