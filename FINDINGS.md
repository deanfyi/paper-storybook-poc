# Findings (running log)

## Phase 2: tokens (Paper → code)
- 👍 `get_tokens` exports a Tailwind 4 `@theme` block verbatim; token names match Tailwind namespaces, so `theme.css` is a pure file replace.
- 👍 Token edits in Paper re-render every component on the canvas instantly (restyle-friendly).
- ⚠️ Font token exported without fallbacks; fixed in Paper (not code) to keep the generated file untouched.
- ⚠️ Tailwind 4 only emits vars used by utilities; tokens referenced via `var()` (stories, `color-mix`) were missing. Fix: `@import "./theme.css" theme(static)`.
- ⚠️ Sync requires Paper desktop + an MCP client (agent). No CLI/CI path found.
- Guard: `reset.css` drops Tailwind defaults, so only Paper tokens produce classes (`bg-red-500` emits nothing).

## Phase 3: components (Paper → code)
- 👍 `get_jsx` uses token classes throughout (`bg-primary`, `text-sm/tight`, `opacity-disabled`, `bg-success/tint`, `w-sm`); all resolve against our theme.
- ⚠️ Inherited styles are lost/wrong: text inheriting color/font from its frame exports as `text-black` / `font-[system-ui,sans-serif]` instead of `text-foreground` / Inter. The reset catches `text-black` (emits nothing).
- ⚠️ Output is static markup: all `div`s, no `<button>`/`<input>`/`<label>`, no props, no variants-as-props, no interaction states (hover/focus).
- ⚠️ Noise per export: `[font-synthesis:none] wrap-anywhere antialiased`, `[color:var(--x)]` instead of `text-x`.
- Result: components are hand-authored, using the export as the style reference. Paper's variant frames (`Button/Primary`…) map 1:1 to props and stories; the visual match with Paper is exact.
- Added in code, absent from Paper: semantics, aria wiring, focus ring, disabled cursor. Paper has no place to express these, so they live only in code → round-trip question (phase 5).

## Phase 4: composed components + screen
- ⚠️ Paper has no component instances (on their roadmap). `x-paper-clone`/duplicate = detached copy: changing Button/Primary's radius did not update the Deposit screen's button. Screens drift from components exactly like code would; only token changes propagate.
- ⚠️ Paper has no link concept: "Terms link" exports as a styled `div`.
- i18n: a sentence with an embedded link ("accept the {vault terms}") can't be split into fixed strings (word order varies by language), so it's a single `terms: ReactNode` slot the app fills with translated rich text + its own Link.
- Paper has no i18n concept; its text is sample copy. Layer names (`Label`, `Hint`, `Terms link`) map to prop names.
- Enforced in `packages/ui` lint: no JSX text / string literals / text attributes (i18n), no `<a>` (links via slot, `<TextLink>`, `<Button asChild>`), no `next/*` imports (framework-agnostic). Stories exempt.
- Composed components, now "Blocks" (`blocks/`, Dean uses the same term), are presentational + controlled; stories cover states (empty, value, error, submitting) and a long-German-text stress case.
- Page built 100% from `@poc/ui` (success bar 1 ✅): layout `div`/`main` only, all copy from `messages/en.tsx`, `next/link` only via `<TextLink>` / `<Button asChild>`.
- The app lint policy forced two more ui components that weren't obvious up front: `PageHeader` (styled title text) and `Page` (muted ground, padding, column width). Any visual decision in a page = a ui component = a Paper frame. The rule surfaces gaps in the design system early.
- App lint (`apps/web/app/**`): only `div`/`main` intrinsics; `className` limited to layout (visual prefixes like `text-`/`bg-`/`rounded-`, incl. `md:` variants, rejected); no `style`; no JSX text (i18n); `<Link>` must sit inside `TextLink`/`Button`. Limitation: dynamic classNames (template strings, `cn()`) bypass the class check.
- Behaviour added in code with no Paper counterpart: disabled-while-empty submit, submitting label, validation messages. Paper shows static states only.
- Caveat: `/terms` was built only to test links; it has no Paper design, which strictly violates "every shipped page designed in Paper".
- Storybook mirrors Paper's pages: Tokens → Components → Blocks → Pages. `Pages/Deposit` composes blocks with sample data (design mirror); the shipped page lives in `apps/web`. Trade-off: page composition is duplicated (story vs app) because ui can't import app code.
- Paper now has a Blocks page (DepositForm, VaultSummary, PageHeader × Default/state/LongText) mirroring Storybook's Blocks.
- 👍 The LongText (German) variants caught a real layout bug on both sides: Badge text wrapped in a tight header ("Geringe Liquidität"). Fixed in code (`shrink-0 whitespace-nowrap`) and in Paper.
- ⚠️ The same one-line Badge fix had to be applied to 7 separate copies in Paper (no instances). In code it was one line. This is the "drift" cost in practice.
- ⚠️ Paper ignores `whiteSpace` on frames; it must be set on each text layer.
- Behaviour fed back from code to Paper by hand: disabled-while-empty submit is now shown in Paper's Default variants and the Deposit screen.
- Paper pages can't be reordered via MCP: order is Tokens, Components, Pages, Blocks (Storybook: Tokens, Components, Blocks, Pages).

## Phase 5: round-trip
- Convention: every component/block has `*.styles.ts` (visual classes only, keyed by Paper layer/variant names) and a `.tsx` (markup, hooks, a11y, code-only states). A Paper sync may rewrite only `*.styles.ts` + `theme.css` (checked by which files the diff touches). Lint keeps Paper classes out of `.tsx`: class strings there may only be code-owned (`focus-visible:*`, `cursor-*`, `sr-only`). Refactor verified output-identical (rendered class sets equal on all 34 elements).
- Split is a choice, not a requirement: it makes "sync can't break behaviour" mechanically checkable. Cost: extra file per component, style keys coupled to Paper layer names. Alternative for the webapp: sync agent edits classes in place in `.tsx` (or a colocated styles object): fewer files, safety via review instead of path check. Kept for the POC since 5e measures it.
- States: interaction states (hover/active/focus/disabled) are live in Storybook (one pseudo-states matrix story, not a story per state) and state frames in Paper (`Button / Primary / Hover`); sync writes each frame's delta from default as `hover:`/`active:` in `*.styles.ts`. Data states (error, submitting, copied) stay a story + Paper variant frame each.
- Focus is the exception (a11y, WCAG 2.4.7): code owns the ring's structure in one `focusRing` constant so a sync can't drop it; Paper owns only its look via focus tokens (pending MCP reset). Lint: no literal focus classes in `.tsx` (use `focusRing`) or in `*.styles.ts` (sync must not emit them). Trade-off: no per-component focus treatment without code.
- CopyButton: designed in Paper (Idle/Copied), built with `useState` + `useEffect` reset timer + clipboard + `aria-live`. Behaviour covered by Storybook play tests (copies full value, calls onCopy, shows Copied, auto-resets), all passing. These are the regression check for "behaviour survives a Paper sync".
- Icons are a third synced asset kind (after tokens and classes): `get_jsx` exports SVG geometry with `var(--color-*)` strokes; stored in `icons.tsx` with `currentColor` so color stays in `*.styles.ts`.
- ⛔ Cost/limits: Paper's free plan has a weekly MCP call limit. Hit it mid-phase-5 (2026-10-08) after one session of building tokens, components, blocks and screens: "Weekly MCP limit reached… Upgrade to Paper Pro". An agent-driven design↔code flow needs Paper Pro for whoever runs syncs, and call volume matters (no instances means one call per copy for every propagated fix).
