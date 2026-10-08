// Source: Paper "Jazzy nest" › Screens › Deposit (artboard: muted ground, 64px vertical padding, 824px column).
import type { ReactNode } from 'react'

export type PageProps = { children: ReactNode }

export const Page = ({ children }: PageProps) => (
  <main className="flex min-h-screen flex-col items-center bg-muted px-4 py-16">
    <div className="flex w-full max-w-[824px] flex-col gap-8">{children}</div>
  </main>
)
