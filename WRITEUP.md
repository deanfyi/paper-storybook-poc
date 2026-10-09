# Paper + Storybook design-to-code: POC write-up

**Question:** can Paper, driven by an AI agent over MCP, hand off a design
to React components and keep design and code in sync both ways?

**Answer: yes, with conditions.** All three parts of the success bar passed. What makes it work
isn't the tool alone but a split of ownership plus checks that enforce it. The main limits are
on Paper's side (no component instances, no change feed) and cost (Paper Pro).

Details and reasoning for every decision: [`FINDINGS.md`](FINDINGS.md).

## Success bar

| Test                                                       | Result                                                                                  |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| A real page built 100% from handed-off components          | ✅ Deposit page: only `@poc/ui` components, lint-enforced                               |
| A bug fix made in code survives the next design sync       | ✅ Input height fix pushed to Paper (6 copies), a fresh sync kept it                    |
| A restyle in Paper reaches code without touching behaviour | ✅ Token + CopyButton restyle: diff only in style files, all behaviour tests still pass |
| Another agent can do it from the repo alone                | ✅ Blind test: a fresh agent synced 5 hidden changes correctly and caught both traps    |

## How it works

**Paper owns how things look; code owns how they behave.**

- Paper → code: tokens (`theme.css`), text styles (`typography.css`), visual classes per
  component (`*.styles.ts`, keyed by Paper layer names), icon geometry. Generated, never hand-edited.
- Code only: markup, hooks, accessibility, states, the focus ring. A sync never touches these files.
- The agent follows two skills in the repo: `paper-to-code` (sync a design change) and
  `code-to-paper` (push a code-side visual fix back, or the next sync reverts it).

**Enforced, not documented:**

- Lint: pages use only ui components; no hardcoded text (i18n); links only via the app's own
  `Link`; no visual classes outside style files; icon rules (colour only via `currentColor` or tokens).
- CI on every push: lint, types, every Storybook story run as a test in a real browser (including
  behaviour tests), and a check that a `sync(paper):` commit only touched design-owned files.
- Rules that live only in docs drift (the webapp's icon rules already have ~8 violations);
  every rule here has a check.

## What worked

- **Tokens and text styles** map cleanly to Tailwind v4. A token change in Paper reaches every
  component in code, and every copy in Paper.
- **The style/behaviour split** made the restyle safe to verify mechanically: if only style
  files changed, behaviour is untouched. A full CopyButton restyle kept its copy → copied → reset
  behaviour intact.
- **Storybook mirrors Paper** (Tokens, Icons, Components, Blocks, Pages), with `States` stories
  forcing hover/focus side by side for a 1:1 visual comparison with Paper's state frames.
- **Long-text (German) variants** caught a real layout bug (Badge text wrapping) on both sides.
- **The rules transfer**: a fresh agent with no context did a correct sync from the repo alone.

## What broke or is limited

- **No component instances in Paper** (on their roadmap). Every copy of a component is separate:
  a fix must be pushed to each copy (findable by style signature, but easy to miss). Only token
  changes propagate.
- **No change feed.** The export has no layer names and Paper doesn't say what changed. Fix:
  the sync keeps raw export snapshots in the repo, so `git diff` shows what changed (also useful
  for PR review). Caveat: Paper's export format shifts with unrelated token changes.
- **Cost.** The free plan's MCP limit stopped work after one session, and the window is rolling
  and invisible. Whoever runs syncs needs Paper Pro.
- **Export quirks the sync must normalise**: raw hex/`text-black` (not tokens), Paper-internal
  layout classes, hardcoded gradient ids, HTML-style SVG attributes.
- **Active state can't be previewed** in Storybook's state boards (addon limitation with
  Tailwind's colour-opacity CSS).

## What needed hand fixes

- Untokened colours in Paper (sync keeps the code token and reports them to the designer).
- Drift: a few classes existed in code but not in Paper; pushed to Paper.
- A `tailwind-merge` bug that silently dropped text styles (caught by a before/after check).
- Storybook preset resolution under pnpm (fixed with Storybook's documented setup).

## What it asks of each role

**Designer (Paper):** name layers and variants as in code (`Button/Primary`); one frame per state
(`Button/Primary/Hover`); use tokens, never raw colours; text styles from the Typography board;
icons on the Icons page (mono = one colour, colour = fixed). Focus ring: only its colour.

**Developers:** never edit generated files; a visual fix in code goes back to Paper
(`code-to-paper`); behaviour stays in `.tsx`.

**Agent runs the sync** with the skills; humans review the PR (design diff in `paper-snapshots/`,
code diff in style files).

## Recommendation

1. Trial it on one real webapp page, with Dean designing in Paper and the sync run from the repo.
2. Budget Paper Pro for whoever runs syncs.
3. Use colour tokens for interaction states (`--color-primary-hover`) instead of opacity modifiers.
4. Adopt the icon and style-split lint rules in the webapp regardless of the design tool.
5. Revisit when Paper ships component instances: most of the copy-related pain goes away.
