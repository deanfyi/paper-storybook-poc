# paper-storybook-poc

From-scratch trial of a design-to-code flow: Paper → (MCP) → React components + Storybook → app.

- `packages/ui`: components, tokens (`src/styles/theme.css`), Storybook (`pnpm storybook`, :6006)
- `apps/web`: Next app; lint forbids raw HTML / `className` / `style` in `app/` (pages use `@poc/ui` only)

Node 22 (`.nvmrc`). `pnpm install && pnpm dev` (:3100).

## Success bar
1. One page built 100% from `@poc/ui` components
2. Bug fix in code → reflected in Paper, not overwritten by next export
3. Restyle in Paper → diff touches styles/tokens only

## Tokens (Paper → code)
- `packages/ui/src/styles/theme.css` is generated from Paper (`get_tokens` format `tailwind`), never hand-edited; regen = replace file
- `reset.css` drops Tailwind defaults (colors, type, weights, leading, tracking, radii) so only Paper tokens exist
- Sync needs Paper desktop + an MCP client (agent); no CLI/CI path found yet
