import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  framework: { name: '@storybook/react-vite', options: {} },
  // Forces :hover / :focus-visible via parameters.pseudo, for the States comparison stories.
  addons: ['storybook-addon-pseudo-states'],
  // Resolves derived prop types (e.g. `keyof typeof s.variant`) to literal unions, so controls
  // get their options. Default react-docgen can't follow the styles import.
  typescript: { reactDocgen: 'react-docgen-typescript' },
  viteFinal: (config) => {
    config.plugins = [...(config.plugins ?? []), tailwindcss()]
    return config
  },
}

export default config
