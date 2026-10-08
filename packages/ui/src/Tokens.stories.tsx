import type { Meta, StoryObj } from '@storybook/react-vite'

const colors = [
  'background',
  'foreground',
  'primary',
  'primary-foreground',
  'muted',
  'muted-foreground',
  'border',
]

const Swatches = () => (
  <div className="grid grid-cols-4 gap-4 font-sans">
    {colors.map((name) => (
      <div key={name} className="flex flex-col gap-1 text-xs">
        <div
          className="h-12 w-24 rounded-md border border-border"
          style={{ background: `var(--color-${name})` }}
        />
        {name}
      </div>
    ))}
  </div>
)

const meta: Meta<typeof Swatches> = { title: 'Tokens/Colors', component: Swatches }
export default meta

export const Colors: StoryObj<typeof Swatches> = {}
