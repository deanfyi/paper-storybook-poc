// SYNCED FROM PAPER: only visual classes, keyed by Paper layer/variant names.
// A Paper sync may rewrite this file; behaviour lives in the .tsx and is never touched.
// Source: Paper "Jazzy nest" › Components › Card.
export const cardStyles = {
  root: 'flex w-sm flex-col rounded-md border border-border bg-background', // Card/Default
  header: 'flex items-center justify-between border-b border-border px-6 py-4', // Card/Header
  title: 'text-h3 text-foreground', // Title
  action: 'text-body text-muted-foreground', // Action slot
  body: 'flex flex-col gap-1 p-6', // Card/Body
  footer: 'flex justify-end gap-2 border-t border-border px-6 py-4', // Card/Footer
}
