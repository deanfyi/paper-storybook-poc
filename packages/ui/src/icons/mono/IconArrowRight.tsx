// SYNCED FROM PAPER (Icons › Mono › arrow-right). Mono: all paint is currentColor or none.
import { iconDefaults, type IconSvgProps } from '../types'

export const IconArrowRight = (props: IconSvgProps) => (
  <svg viewBox="0 0 16 16" fill="none" {...iconDefaults} {...props}>
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
