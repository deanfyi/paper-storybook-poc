import type { Meta, StoryObj } from '@storybook/react-vite'

// Mirrors the "Colors & Type" board in Paper (Tokens page).
const colors = [
  'background',
  'foreground',
  'muted',
  'muted-foreground',
  'border',
  'primary',
  'primary-foreground',
  'success',
  'warning',
  'danger',
]

const Tokens = () => (
  <div className="flex flex-col gap-8 p-8">
    <div className="flex flex-wrap gap-4">
      {colors.map((name) => (
        <div key={name} className="flex w-40 flex-col gap-2">
          <div
            className="h-16 rounded-md border border-border"
            style={{ background: `var(--color-${name})` }}
          />
          <span className="text-sm leading-tight font-medium">{name}</span>
        </div>
      ))}
    </div>
    <div className="flex flex-col gap-3">
      <span className="text-xl leading-display font-semibold tracking-tight">
        xl 28 · Earn on idle assets
      </span>
      <span className="text-lg leading-normal font-semibold">lg 20 · Deposit USDC</span>
      <span className="text-base leading-normal">base 16 · Your position updates every block.</span>
      <span className="text-sm leading-tight text-muted-foreground">sm 14 · Balance: 1,240.50 USDC</span>
      <span className="text-xs leading-tight text-muted-foreground">xs 12 · Rates are variable</span>
    </div>
  </div>
)

const meta: Meta<typeof Tokens> = {
  title: 'Tokens',
  component: Tokens,
  parameters: { layout: 'fullscreen' },
}
export default meta

export const ColorsAndType: StoryObj<typeof Tokens> = {}
