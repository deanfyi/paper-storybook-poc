import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'
import { textStyles } from './styles/typography'

// Text styles (`text-h1`, `text-body`…) are font sizes; without this tailwind-merge reads them
// as colours and drops one when merged with a `text-<colour>` class.
const twMerge = extendTailwindMerge({ extend: { classGroups: { 'font-size': [{ text: [...textStyles] }] } } })

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
