import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextLink } from './TextLink'

const meta: Meta<typeof TextLink> = {
  title: 'Components/TextLink',
  component: TextLink,
}
export default meta
type Story = StoryObj<typeof TextLink>

// The app passes its own link element (next/link in apps/web); a plain <a> here.
export const Default: Story = { args: { children: <a href="#terms">vault terms</a> } }
