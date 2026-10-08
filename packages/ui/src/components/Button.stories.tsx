import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Deposit' },
}
export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {}
export const Secondary: Story = { args: { variant: 'secondary', children: 'Withdraw' } }
export const Disabled: Story = { args: { disabled: true } }

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
