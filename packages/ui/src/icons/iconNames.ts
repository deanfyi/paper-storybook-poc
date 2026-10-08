// Registry: kebab-case name (Paper frame name) → component. Two kinds, one public namespace:
// the kind only decides authoring rules (lint per folder) and catalog grouping, never usage.
import { IconCheck, IconCopy, IconPocMark } from '.'

export const monoIcons = {
  check: IconCheck,
  copy: IconCopy,
} as const

export const colorIcons = {
  'poc-mark': IconPocMark,
} as const

// Compile-time guard: a name can't be both kinds.
type Overlap = keyof typeof monoIcons & keyof typeof colorIcons
const noOverlap: [Overlap] extends [never] ? true : never = true
void noOverlap

export const iconNames = { ...monoIcons, ...colorIcons }

export type IconName = keyof typeof iconNames

export const isColorIcon = (name: IconName): name is keyof typeof colorIcons => name in colorIcons
