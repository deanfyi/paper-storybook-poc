// Minimal asChild support: render the single child element instead of our own,
// merging className and props onto it (e.g. <Button asChild><Link href="/" /></Button>).
import { cloneElement, isValidElement, type HTMLAttributes, type ReactElement } from 'react'
import { cn } from './cn'

type SlotProps = HTMLAttributes<HTMLElement> & { children?: React.ReactNode }

export const Slot = ({ children, className, ...props }: SlotProps) => {
  if (!isValidElement(children)) return null
  const child = children as ReactElement<HTMLAttributes<HTMLElement>>
  return cloneElement(child, {
    ...props,
    ...child.props,
    className: cn(className, child.props.className),
  })
}
