// SYNCED FROM PAPER (Icons › Color › Poc mark). Dummy brand mark: fixed colours (brand hex or
// var(--color-*) tokens). Defs ids come from useId so repeated/hidden instances never collide.
import { useId } from 'react'
import { iconDefaults, type IconSvgProps } from '../types'

export const IconPocMark = (props: IconSvgProps) => {
  const gradient = `${useId()}-gradient`
  return (
    <svg viewBox="0 0 16 16" fill="none" {...iconDefaults} {...props}>
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="16" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-primary)" />
          <stop offset="1" stopColor="#2DD4BF" />
        </linearGradient>
      </defs>
      <circle cx="8" cy="8" r="7.5" fill={`url(#${gradient})`} />
      <path
        d="M5 8.25l2 2 4-4.5"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
