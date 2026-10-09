---
name: paper-to-code
description: Sync design changes from the Paper file into code (tokens, component styles, icons). Use when the designer changed Paper and the code must follow. Writes only Paper-owned files; behaviour is never touched.
---

# Paper → code sync

Paper owns how things look; code owns how they behave. A sync may write only:

- `packages/ui/src/styles/theme.css` (tokens)
- `packages/ui/src/**/*.styles.ts` (visual classes, keyed by Paper layer/variant names)
- `packages/ui/src/icons/{mono,color}/Icon*.tsx`, `icons/index.ts`, `icons/iconNames.ts` (icon geometry + registry)

CI fails any `sync(paper):` commit that touches anything else (`scripts/check-sync-commits.mjs`).
If the design needs something outside these files (a new prop, a new element, behaviour), stop
and report it: that's a code change for a human-reviewed commit, not a sync.

## Before starting

- Paper desktop open on the file "Jazzy nest"; call `get_guide("paper-mcp-instructions")` once.
- Clean working tree. Read `FINDINGS.md` if a rule below is unclear: it explains why.

## 1. Tokens

`get_tokens({ format: "tailwind" })` → replace the `@theme { … }` block of `theme.css`
(lowercase hex, keep the header, set "tokens hash" to the response's `contentHash.tokens`).
Never hand-edit tokens in code.

## 2. Components and blocks

Source of truth: the **Components** page (blocks: the **Blocks** page). Copies on other pages are
never a source. `get_jsx` each board, then per frame `Component/Variant[/State]` update the matching
keys in `<Component>.styles.ts` (the `// Frame/Name` comments say which frame feeds which key).

Mapping rules:

- Base frame = default variant. A **state frame** (`…/Hover`, `…/Active`) contributes only its
  difference from its base frame, emitted as `not-disabled:hover:*` / `not-disabled:active:*`
  (a disabled control never reacts).
- **`…/Focus` frames are reference only: skip them.** The focus ring is code-owned (`focusRing.ts`);
  Paper owns only `--color-focus`. Lint rejects focus classes in `*.styles.ts`.
- Text layer of a single-label component (Button, Badge): its text classes go on the root
  (the label is `children`). Text layer `w-max` (Paper's "no wrap") → `whitespace-nowrap`.
- SVG `stroke`/`fill="var(--color-x)"` inside a component → icon `text-x` (icons paint `currentColor`).
- Ignore board-only styles: artboard padding/background, board `flex-wrap`, `font-[system-ui,…]`,
  `wrap-anywhere`, `antialiased`, sample copy (all text comes from props in code).
- A colour not bound to a token (`text-black`, raw hex) has no code equivalent (`reset.css` drops
  Tailwind's defaults): keep the existing token class and report it to the designer.
- Prefer tokens over arbitrary values (`h-[44px]` → `h-11`, `opacity-[40%]` → `opacity-disabled`).

## 3. Icons

**Icons** page, boards `Mono` and `Color`; each SVG layer is named by its registry key
(`copy`, `poc-mark`). `get_jsx` on the SVG layer, then:

- Strip `width`/`height`/`style` from the root; keep `viewBox`; spread `{...iconDefaults} {...props}`.
- Mono: every `stroke`/`fill` colour → `currentColor` (`none` stays). No defs allowed.
- Color: keep token (`var(--color-*)`) and brand hex colours. Replace Paper's ids (`_8Z-0__…`)
  with ids from `useId()`, and `url(#…)` with the same. Convert raw defs markup to JSX
  (`stop-color` → `stopColor`).
- New icon: add `Icon<Name>.tsx` in the right folder, export it from `icons/index.ts`, add it to
  `monoIcons` or `colorIcons` in `iconNames.ts`.

## 4. Verify

```bash
pnpm lint && pnpm typecheck && pnpm test
```

`pnpm test` runs every story in headless Chromium, including play tests (e.g. CopyButton's
copy → copied → reset): a sync must never break them. Then compare Storybook's `States` stories
with the Paper boards (screenshots) for a visual check.

## 5. Commit

`sync(paper): <what changed>` with only the allowed files, then run
`node scripts/check-sync-commits.mjs HEAD~1 HEAD`. Docs/findings go in a separate commit.
Report anything you skipped (untokened colours, structural changes) to the user.
