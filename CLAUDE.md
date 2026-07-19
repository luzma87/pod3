# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Pod3 is a from-scratch rewrite of "pod2", a single-page quilt-block designer for the
Harry Potter fandom-quilt community (Fandom in Stitches / Project of Doom). Users pick
pre-made SVG quilt blocks, place them on a grid, paint plain squares, and manipulate
placed blocks ("spells": Flipendo=flip, Wingardium Leviosa=move, Circumrota=rotate,
Colovaria=recolor, Evanesco=delete). Designs save to Firebase Realtime Database with a
shareable URL. Full rationale and the phased build plan live in `docs/PLAN.md`; current
progress is tracked slice-by-slice in `docs/CHECKLIST.md`.

**Read `docs/workflow.md` before making changes** — it documents the working agreement
for this repo (small incremental slices, ask rather than assume, proactive tests, manual
git staging/commits, manual UI verification steps instead of browser automation). It also
explains where `docs/PLAN.md`, `docs/CHECKLIST.md`, and `docs/todo.md` fit.

## Commands

```
npm run dev            # start Vite dev server
npm run build           # tsc -b && vite build (type-check, then production build)
npm run lint             # oxlint
npm run format            # prettier --write .
npm run format:check       # prettier --check .
npm test                    # vitest run (single run)
npm run test:watch           # vitest (watch mode)
npm run validate              # format:check && lint && build && test — runs on pre-push via simple-git-hooks
```

Run a single test file: `npx vitest run src/store/designerStore.test.ts`
Run tests matching a name: `npx vitest run -t "some test name"`

Tests are colocated with source as `*.test.ts(x)` (Vitest + React Testing Library,
jsdom environment configured in `vite.config.ts`, setup file at `src/test/setup.ts`).

## Architecture

### State: Zustand, split by concern

`src/store/designerStore.ts` holds the core "what's on the quilt" state: placed blocks,
painted squares, and the currently-selected/pending block. Key modeling detail: placing,
grabbing, and moving a block all go through the same `blockToPlace`/`placeBlockAt` pair —
`grabBlock` removes a placed instance and turns it back into a pending block (preserving
its rotation/flip/color overrides), then a subsequent grid click re-places it via the same
path used for fresh placement. When adding new global state, prefer a new focused
store/slice over growing this one into a god-object (see `docs/PLAN.md`'s State
management section for the reasoning — this replaced pod2's single ~20-method
`GlobalProvider`).

### Block catalog: generated, categorized SVG components

`src/assets/blocks/*.tsx` (`weeklyBlocks`, `supplementalBlocks`, `topSidesBlocks`,
`otherBlocks`, `beastsBlocks`, `disneyBlocks`, `customBlocks`) are per-category arrays of
block metadata + SVG React components, generated from source SVGs under
`src/assets/blocks/svg/<category>/`. `allBlocks.ts` merges them into one flat list tagged
with `category`, and derives the `QuiltBlock` type from it. Treat files under
`src/assets/blocks/` as largely generated/ported content, not hand-authored — the SVG
artwork itself is licensed/attributed community content and should stay untouched (see
`src/attributions.ts` and the `/attributions` route); only the surrounding chrome changes.

### Feature/route layout

- `src/app/` — routing (`AppRoutes.tsx`: `/`, `/:quiltId`, `/attributions`, 404 catch-all),
  persistent `Layout`, and the `InfoDialog`.
- `src/features/block-catalog/` — sidebar block browsing/search.
- `src/features/workspace/` — the quilt grid, size picker, placed-block rendering,
  color-swatch picker, recolor/reset dialogs. The grid is one element with a CSS
  background-pattern, deliberately not one DOM node per cell (a King-size quilt would be
  ~11,880 divs) — preserve this when touching grid rendering.
- `src/components/ui/` — theme-aware base components (`Button`, `Card`, `Dialog`,
  `Tooltip`, `ThemeToggle`, `LanguageSwitcher`), built on Radix UI primitives + Tailwind.
- `src/firebase/` — modular Firebase SDK wrapper (`client.ts`: app/auth/database init,
  anonymous sign-in; `config.ts`: env-driven config). Firebase-backed save/load is not yet
  wired into the UI (see Slices 7–9 in `docs/CHECKLIST.md`).
- `src/i18n/` — `react-i18next` setup with browser-language detection
  (`localStorage` → `navigator.language` → `en` fallback). `locales/en.json` and
  `locales/es.json` are the only two languages; every user-visible string must go through
  a translation key, no hardcoded UI text. Adding a language later is just adding another
  `locales/<lang>.json`.
- `src/store/` — Zustand stores.

### Theming

Light/dark is a manual toggle (not just OS `prefers-color-scheme`), persisted to
`localStorage` under `pod3-theme`, applied via a `.dark` class on `<html>` (set by an
inline script in `index.html` before first paint to avoid a flash of the wrong theme).
Colors are semantic CSS custom properties (parchment/ink/maroon/gold tokens) overridden
by `.dark`, consumed via Tailwind utility classes like `bg-parchment`/`text-ink` —
don't sprinkle `dark:` variants through components; add/adjust the token instead.

### Firebase

Config comes from `VITE_FIREBASE_*` env vars (`.env.example` documents them; real values
go in gitignored `.env.local`, from the `poddesigner-7d754` Firebase project console).
Auth is anonymous sign-in (`waitForUser` in `src/firebase/client.ts` signs in
automatically if no user is present). Planned data model (not fully implemented yet):
`/quilts/{quiltId}` for full quilt data, `/quiltIndex/{quiltId}` as a lightweight
gallery-browsing index written alongside every save. Security rules
(`database.rules.json`) are drafted in `docs/PLAN.md` but **deploying rule/infra changes
to the live Firebase project requires explicit user go-ahead** — never run `firebase
deploy` unprompted.

## Notes

- Package manager is npm only — no yarn/pnpm lockfiles.
- Linting is `oxlint`, not ESLint (intentional choice, see `README.md`).
- The production bundle is ~855KB largely because all 527 blocks are bundled eagerly;
  known follow-up (code-splitting/virtualization) tracked in `docs/CHECKLIST.md`'s Slice 1
  notes and `docs/todo.md`, not yet addressed.
