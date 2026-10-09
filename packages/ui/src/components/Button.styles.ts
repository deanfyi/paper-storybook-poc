// SYNCED FROM PAPER: only visual classes, keyed by Paper layer/variant names.
// A Paper sync may rewrite this file; behaviour lives in the .tsx and is never touched.
// Source: Paper "Jazzy nest" › Components › Button.
export const buttonStyles = {
  base: 'inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-4 text-sm/tight font-semibold',
  variant: {
    primary:
      'bg-primary text-primary-foreground not-disabled:hover:bg-primary/90 not-disabled:active:bg-primary/80', // Button/Primary(/Hover, /Active)
    secondary: 'bg-muted text-foreground border border-border not-disabled:hover:bg-border', // Button/Secondary(/Hover)
  },
  disabled: 'disabled:opacity-disabled', // Button/Disabled
}
