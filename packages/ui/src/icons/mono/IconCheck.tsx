// SYNCED FROM PAPER (Icons › Mono › Check). Mono: all paint is currentColor or none.
import { iconDefaults, type IconSvgProps } from '../types'

export const IconCheck = (props: IconSvgProps) => (
  <svg viewBox="0 0 16 16" fill="none" {...iconDefaults} {...props}>
    <path
      d="M3 8.5l3 3 7-7"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
