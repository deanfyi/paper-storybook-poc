// One entry point for every icon, mono or color: callers never need to know the kind.
// Mono icons follow the text colour (set it with a text-* class); color icons keep theirs.
import { iconNames, type IconName } from '../icons/iconNames'
import type { IconSvgProps } from '../icons/types'

export type IconProps = IconSvgProps & { name: IconName }

export const Icon = ({ name, ...props }: IconProps) => {
  const Component = iconNames[name]
  return <Component {...props} />
}
