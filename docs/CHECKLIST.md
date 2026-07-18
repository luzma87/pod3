# Pod3 Progress Checklist

Mirrors the phases in `docs/PLAN.md` — check that file for the reasoning
and details behind each item. Check items off as they land.

## Phase 1: Scaffold

- [x] Vite + React 19 + TypeScript project created
- [x] Node upgraded to a supported version (22.23.1 via fnm)
- [x] Linting: oxlint kept and passing
- [x] Formatting: Prettier configured (`npm run format` / `format:check`)
- [x] Testing: Vitest + React Testing Library wired up, first smoke test
      passing
- [x] Production build verified (`npm run build`)
- [x] Port cursor assets (`assets/cursors/*.cur`)
- [x] Port SVG block assets (`assets/images/js/**` + category index files)
- [x] Pre-push hook running `npm run validate` (format:check, lint, build,
      test)
- [x] Base routing (`/` and `/:quiltId`)

## Phase 2: Store + Firebase core

- [ ] Zustand stores (`designerStore`, `uiStore`, catalog state) ported 1:1
      from `GlobalProvider`
- [ ] Firebase modular SDK wrapper (auth, database)
- [ ] Load/save round-trip verified against existing saved quilts

## Phase 3: Visual system

- [ ] Theme tokens (colors, fonts) implemented
- [ ] Base components: buttons, dialogs, cards
- [ ] Info/save/load/reset/recolor dialogs re-themed

## Phase 4: Interaction upgrade

- [ ] Drag-and-drop block placement (dnd-kit)
- [ ] Drag-to-move already-placed blocks
- [ ] Contextual block toolbar for spells (flip/rotate/recolor/delete)
- [ ] Smoothed color painting/bucket tool

## Phase 5: Gallery

- [ ] `quiltIndex` write-on-save
- [ ] Gallery browse grid
- [ ] Clone-to-new-quilt flow

## Phase 6: Polish

- [ ] Responsive check
- [ ] Loading/empty states
- [ ] Info dialog content rewritten
- [ ] Firebase error states handled

## Phase 7: Cutover

- [ ] Firebase security rules drafted (`database.rules.json`)
- [ ] Security rules deployed (with explicit go-ahead)
- [ ] Firebase Hosting pointed at the new build
- [ ] pod2 kept read-only until confidence is high
