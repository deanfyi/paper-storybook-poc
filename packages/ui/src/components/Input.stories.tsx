import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  args: { label: 'Amount', placeholder: '0.00', hint: 'Balance: 1,240.50 USDC', className: 'w-[232px]' },
}
export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {}
export const Error: Story = { args: { defaultValue: '2,000.00', error: 'Exceeds balance' } }

// Mirrors the Paper board.
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-6">
      <Input className="w-[232px]" label="Amount" placeholder="0.00" hint="Balance: 1,240.50 USDC" />
      <Input className="w-[232px]" label="Amount" defaultValue="2,000.00" error="Exceeds balance" />
    </div>
  ),
}
