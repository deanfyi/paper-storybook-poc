# paper-storybook-poc

From-scratch trial of a design-to-code flow: Paper → (MCP) → React components + Storybook → app.

- `packages/ui`: components, tokens (`src/styles/theme.css`), Storybook (`pnpm storybook`, :6006)
- `apps/web`: Next app; lint forbids raw HTML / `className` / `style` in `app/` (pages use `@poc/ui` only)

Node 22 (`.nvmrc`). `pnpm install && pnpm dev` (:3100).

## Success bar

1. One page built 100% from `@poc/ui` components
2. Bug fix in code → reflected in Paper, not overwritten by next export
3. Restyle in Paper → diff touches styles/tokens only

## Phases

1. ✅ Setup: workspace, Storybook, app, Paper MCP
2. ✅ Tokens, Paper → code
3. ✅ Components, Paper → code
4. ✅ Blocks + page built 100% from `@poc/ui` (success bar 1)
5. ✅ Round-trip (success bars 2 + 3)
   - ✅ 5a styles split (`*.styles.ts` = Paper-synced, `.tsx` = behaviour)
   - ✅ 5b–5c CopyButton (hooks + play tests) as the behaviour canary
   - ✅ 5d bug fix in code → Paper (Input `h-11`, Button hover as state frames)
   - ✅ 5e restyle in Paper → code: diff touches only styles/tokens, play tests still pass
   - ✅ 5f re-export from Paper: code fix not overwritten
6. ✅ Enforcement + agent workflow
   - ✅ CI (`.github/workflows/ci.yml`): lint, typecheck, every story + play test in headless Chromium (`pnpm test`, Storybook vitest addon)
   - ✅ Sync diff check (`scripts/check-sync-commits.mjs`, in CI): `sync(paper):` commits may only touch `*.styles.ts`, `theme.css`, icon files + registry
   - ✅ `CLAUDE.md` (ownership + rules) and skills `.claude/skills/paper-to-code`, `.claude/skills/code-to-paper`, written from the steps that worked in phase 5, so any agent (incl. Dean's) follows the same rules
7. ✅ Write-up: [`WRITEUP.md`](WRITEUP.md) (what worked, what broke, what needed hand fixes)

## Tokens (Paper → code)

- `packages/ui/src/styles/theme.css` is generated from Paper (`get_tokens` format `tailwind`), never hand-edited; regen = replace file
- `reset.css` drops Tailwind defaults (colors, type, weights, leading, tracking, radii) so only Paper tokens exist
- Sync needs Paper desktop + an MCP client (agent); no CLI/CI path found yet
