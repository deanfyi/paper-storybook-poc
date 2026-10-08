import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { TextLink } from '../components/TextLink'
import { DepositForm, type DepositFormProps } from './DepositForm'

const meta: Meta<typeof DepositForm> = {
  title: 'Patterns/DepositForm',
  component: DepositForm,
  decorators: [
    (Story) => (
      <div className="bg-muted p-8">
        <Story />
      </div>
    ),
  ],
  args: {
    title: 'Deposit USDC',
    network: 'Ethereum',
    amountLabel: 'Amount',
    amountPlaceholder: '0.00',
    balanceHint: 'Balance: 1,240.50 USDC',
    value: '',
    terms: (
      <>
        By depositing you accept the{' '}
        <TextLink>
          <a href="#terms">vault terms</a>
        </TextLink>
      </>
    ),
    submitLabel: 'Deposit',
  },
  // Controlled component: keep the value in story state so typing works.
  render: function Render(args: DepositFormProps) {
    const [value, setValue] = useState(args.value)
    return <DepositForm {...args} value={value} onValueChange={setValue} />
  },
}
export default meta
type Story = StoryObj<typeof DepositForm>

export const Default: Story = {}
export const WithValue: Story = { args: { value: '250.00' } }
export const Error: Story = { args: { value: '2,000.00', error: 'Exceeds balance' } }
export const Submitting: Story = { args: { value: '250.00', submitting: true, submitLabel: 'Depositing…' } }

// i18n stress test: long German strings, link mid-sentence.
export const LongText: Story = {
  args: {
    title: 'USDC einzahlen',
    network: 'Ethereum-Hauptnetz',
    amountLabel: 'Einzuzahlender Betrag',
    balanceHint: 'Verfügbares Guthaben: 1.240,50 USDC',
    terms: (
      <>
        Mit der Einzahlung akzeptieren Sie die{' '}
        <TextLink>
          <a href="#terms">Nutzungsbedingungen des Tresors</a>
        </TextLink>{' '}
        sowie die Risikohinweise.
      </>
    ),
    submitLabel: 'Jetzt einzahlen',
  },
}
