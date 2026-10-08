import type { Preview } from '@storybook/react-vite'
import '../src/styles/index.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    // Same order as the Paper file's pages.
    options: { storySort: { order: ['Tokens', 'Icons', 'Components', 'Blocks', 'Pages'] } },
  },
}

export default preview
