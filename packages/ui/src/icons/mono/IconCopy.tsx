// SYNCED FROM PAPER (Icons › Mono › Copy). Mono: all paint is currentColor or none.
import { iconDefaults, type IconSvgProps } from '../types'

export const IconCopy = (props: IconSvgProps) => (
  <svg viewBox="0 0 16 16" fill="none" {...iconDefaults} {...props}>
    <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M10.5 3.5V3A1.5 1.5 0 0 0 9 1.5H3A1.5 1.5 0 0 0 1.5 3v6A1.5 1.5 0 0 0 3 10.5h.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
)
