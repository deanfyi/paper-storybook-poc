import type { SVGProps } from 'react'

// No colour props: mono icons take colour from the text (currentColor), color icons have fixed
// colours. Either way there's no prop that could silently do nothing.
export type IconSvgProps = Omit<SVGProps<SVGSVGElement>, 'fill' | 'stroke' | 'color'>

// Size and a11y defaults, spread first so callers can override. Decorative unless the caller
// passes aria-hidden={false} plus a label.
export const iconDefaults = { width: 16, height: 16, 'aria-hidden': true } as const
