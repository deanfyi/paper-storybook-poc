import tseslint from 'typescript-eslint'

// Classes the .tsx may own: behaviour/a11y, never Paper visuals.
const CODE_OWNED = '/^((focus-visible:|disabled:cursor-|cursor-|sr-only)\\S*\\s*)+$/'

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
  // Round-trip: visual classes live only in *.styles.ts (synced from Paper). Class strings in
  // .tsx may only hold code-owned concerns (focus ring, cursor, screen-reader utilities).
  {
    selector: `:matches(JSXAttribute[name.name="className"], CallExpression[callee.name="cn"]) Literal[value!=${CODE_OWNED}]`,
    message: 'Visual classes belong in the component .styles.ts (synced from Paper), not in the .tsx.',
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
