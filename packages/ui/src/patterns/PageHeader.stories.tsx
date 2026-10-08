import type { Meta, StoryObj } from '@storybook/react-vite'
import { PageHeader } from './PageHeader'

const meta: Meta<typeof PageHeader> = {
  title: 'Patterns/PageHeader',
  component: PageHeader,
  args: { title: 'Deposit', description: 'Earn variable yield on idle USDC. Withdraw anytime.' },
}
export default meta
type Story = StoryObj<typeof PageHeader>

export const Default: Story = {}
export const LongText: Story = {
  args: {
    title: 'Einzahlung in den Tresor',
    description: 'Erzielen Sie eine variable Rendite auf ungenutzte USDC. Auszahlung jederzeit möglich.',
  },
}
