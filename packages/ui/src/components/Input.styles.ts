// SYNCED FROM PAPER: only visual classes, keyed by Paper layer/variant names.
// A Paper sync may rewrite this file; behaviour lives in the .tsx and is never touched.
// Source: Paper "Jazzy nest" › Components › Input (Input/Default, Input/Error).
export const inputStyles = {
  root: 'flex flex-col gap-2',
  label: 'text-sm/tight font-medium text-foreground', // Label
  field: 'h-11 rounded-md border bg-background px-3 text-sm/tight text-foreground', // Field
  placeholder: 'placeholder:text-muted-foreground', // Placeholder
  message: 'text-xs/tight', // Hint
  state: {
    default: { field: 'border-border', message: 'text-muted-foreground' }, // Input/Default
    error: { field: 'border-danger', message: 'text-danger' }, // Input/Error
  },
}
