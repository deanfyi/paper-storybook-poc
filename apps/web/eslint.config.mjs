import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({ baseDirectory: import.meta.dirname })

// Policy: pages ship only with @poc/ui components. No raw HTML elements
// (except the document shell) and no ad-hoc styling in app code.
const uiOnly = [
  'error',
  {
    selector: 'JSXOpeningElement[name.name=/^(?!html$|body$)[a-z]/]',
    message: 'Use @poc/ui components instead of raw HTML elements.',
  },
  {
    selector: 'JSXAttribute[name.name=/^(className|style)$/]',
    message: 'No ad-hoc styling in app code; add a variant to @poc/ui instead.',
  },
]

const config = [
  { ignores: ['.next/**', 'next-env.d.ts'] },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  { files: ['app/**/*.tsx'], rules: { 'no-restricted-syntax': uiOnly } },
]

export default config
