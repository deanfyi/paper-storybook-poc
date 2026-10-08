// SYNCED FROM PAPER: icon geometry exported via get_jsx. Color is currentColor so the
// owning component's *.styles.ts decides it (Paper used var(--color-*) strokes).
import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

// Source: Paper › Components › CopyButton › CopyButton/Idle › Icon.
export const CopyIcon = (props: IconProps) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
    <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M10.5 3.5V3A1.5 1.5 0 0 0 9 1.5H3A1.5 1.5 0 0 0 1.5 3v6A1.5 1.5 0 0 0 3 10.5h.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
)

// Source: Paper › Components › CopyButton › CopyButton/Copied › Icon.
export const CheckIcon = (props: IconProps) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
    <path
      d="M3 8.5l3 3 7-7"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
