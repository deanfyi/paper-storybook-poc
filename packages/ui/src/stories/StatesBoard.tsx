// Story-only layout for the States comparison boards: one row per variant, one column per
// state, mirroring the Paper boards' state frames. Each cell gets data-state="<state>" so a
// story can force its pseudo-class with parameters.pseudo (storybook-addon-pseudo-states).
import type { ReactNode } from 'react'

export type StateCell = { state: string; node: ReactNode }

export const StatesBoard = ({
  columns,
  rows,
}: {
  columns: string[]
  rows: { name: string; cells: StateCell[] }[]
}) => (
  <table className="border-separate border-spacing-4 font-sans">
    <thead>
      <tr>
        <th />
        {columns.map((column) => (
          <th key={column} className="text-left text-xs font-medium text-muted-foreground">
            {column}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={row.name}>
          <th className="pr-4 text-left text-xs font-medium text-muted-foreground">{row.name}</th>
          {row.cells.map((cell) => (
            <td key={cell.state} data-state={cell.state}>
              {cell.node}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)

// Pseudo-state selectors for parameters.pseudo: the first element inside a cell of that state.
export const pseudo = {
  hover: ['[data-state="hover"] > *', '[data-state="disabled-hover"] > *'],
  focusVisible: ['[data-state="focus"] > *', '[data-state="focus"] input'],
}
