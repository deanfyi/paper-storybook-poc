// The one focus ring for every interactive ui component. Code owns its structure (2px outline,
// 2px offset) so a Paper sync can never drop or shrink it (WCAG 2.4.7); Paper owns only its
// colour via the --color-focus token.
export const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus'
