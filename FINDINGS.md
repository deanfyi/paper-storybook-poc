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
