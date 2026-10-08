// The one focus ring for every interactive ui component. Code owns its structure so a Paper
// sync can never drop it (WCAG 2.4.7); Paper will own its look via focus tokens (pending:
// values below are today's, switch to the tokens once they exist in Paper).
export const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
