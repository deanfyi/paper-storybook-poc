import tseslint from 'typescript-eslint'

// ui policy (stories exempt: they supply sample copy and plain <a> links).
const policy = [
  'error',
  // i18n: no user-facing text inside ui. All copy arrives via props/children.
  {
    selector: 'JSXText[value=/\\S/]',
    message: 'No hardcoded text in ui: take it as a prop so the app can translate it.',
  },
  {
    selector: 'JSXExpressionContainer > Literal[value=/\\S/]',
    message: 'No hardcoded text in ui: take it as a prop so the app can translate it.',
  },
  {
    selector:
      'JSXAttribute[name.name=/^(label|placeholder|title|hint|error|alt|aria-label|aria-description)$/] > Literal',
    message: 'No hardcoded text in ui: take it as a prop so the app can translate it.',
  },
  // Links: ui never renders <a>; the app passes its own link via a slot or asChild.
  {
    selector: 'JSXOpeningElement[name.name="a"]',
    message: 'No <a> in ui: accept a link via a ReactNode slot, <TextLink>, or <Button asChild>.',
  },
]

const config = tseslint.config(
  { ignores: ['storybook-static/**'] },
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/**/*.stories.tsx'],
    languageOptions: { parser: tseslint.parser },
    rules: {
      'no-restricted-syntax': policy,
      // ui stays framework-agnostic: no Next.js (or other app framework) imports.
      'no-restricted-imports': [
        'error',
        { patterns: [{ group: ['next', 'next/*'], message: 'ui must not depend on Next.js.' }] },
      ],
    },
  },
)

export default config
