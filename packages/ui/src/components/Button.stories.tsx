import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: { variant: 'primary', children: 'Deposit' },
}
export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {}
export const Secondary: Story = { args: { variant: 'secondary', children: 'Withdraw' } }
export const Disabled: Story = { args: { disabled: true } }

// asChild: the app's link (next/link in apps/web) styled as a button.
export const AsLink: Story = {
  args: { asChild: true, variant: 'secondary', children: <a href="#vaults">View vaults</a> },
}

// Mirrors the Paper board.
export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button>Deposit</Button>
      <Button variant="secondary">Withdraw</Button>
      <Button disabled>Deposit</Button>
    </div>
  ),
}
