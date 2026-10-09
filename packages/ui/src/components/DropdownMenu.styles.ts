// SYNCED FROM PAPER: visuals from Deans Experiment › Components › DropdownMenu.
// Behaviour, listbox semantics and focus-ring structure live in DropdownMenu.tsx.
export const dropdownMenuStyles = {
  root: 'relative flex shrink-0', // Open sample: relative anchor; board labels excluded
  trigger:
    'inline-flex h-10 w-max shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-border bg-muted px-4 font-sans text-sm/tight font-semibold text-foreground not-disabled:hover:bg-border disabled:opacity-disabled', // DropdownMenu/Trigger(/Hover, /Disabled)
  content:
    'absolute left-0 top-[calc(100%+var(--spacing-3))] flex w-58 flex-col rounded-md border border-border bg-background p-1', // DropdownMenu/Content: top 80 minus trigger bottom 68 = 12px
  inForm: 'right-0 left-auto top-[calc(100%+var(--spacing-2))]', // Blocks/DepositForm/NetworkOpen: top 64 minus trigger bottom 56 = 8px; right-aligned
  option:
    'flex h-10 shrink-0 items-center justify-between gap-3 rounded-sm px-3 font-sans text-body text-foreground', // DropdownMenu/Option
  active: 'bg-muted', // DropdownMenu/Option/Hover
  selected: 'bg-primary/tint', // DropdownMenu/Option/Selected
  disabled: 'opacity-disabled', // DropdownMenu/Option/Disabled
  label: 'whitespace-nowrap', // Every option text layer: w-max
  indicator: 'inline-flex size-4 shrink-0', // Fixed trailing slot in every option
  check: 'text-primary', // Selected option SVG stroke
  chevron: 'shrink-0', // Trigger SVG
}
