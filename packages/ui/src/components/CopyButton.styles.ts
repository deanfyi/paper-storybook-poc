// SYNCED FROM PAPER: only visual classes, keyed by Paper layer/variant names.
// A Paper sync may rewrite this file; behaviour lives in the .tsx and is never touched.
// Source: Paper "Jazzy nest" › Components › CopyButton.
export const copyButtonStyles = {
  base: 'inline-flex h-8 items-center gap-2 rounded-full border px-3 text-sm/tight font-medium',
  state: {
    idle: { root: 'border-border bg-background text-foreground', icon: 'shrink-0 text-muted-foreground' }, // CopyButton/Idle
    copied: { root: 'border-success/40 bg-success/tint text-success', icon: 'shrink-0 text-success' }, // CopyButton/Copied
  },
}
