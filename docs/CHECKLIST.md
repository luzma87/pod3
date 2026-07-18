# Pod3 Progress Checklist

Tracks work as vertical slices (see `docs/PLAN.md`'s "Build order" section
for the reasoning) — each slice is meant to be manually testable in the
browser on its own, not just a layer that compiles. Check items off as
they land, and use the "Manual test" line under each slice to verify it
yourself.

## Foundation (infrastructure, not a user-visible slice)

- [x] Vite + React 19 + TypeScript project created
- [x] Node upgraded to a supported version (22.23.1 via fnm)
- [x] Linting: oxlint kept and passing
- [x] Formatting: Prettier configured (`npm run format` / `format:check`)
- [x] Testing: Vitest + React Testing Library wired up
- [x] Production build verified (`npm run build`)
- [x] Pre-push hook running `npm run validate` (format:check, lint, build,
      test)
- [x] Base routing (`/` and `/:quiltId`), currently placeholder pages
- [x] Cursor and SVG block assets ported (data only, not shown in the UI
      yet — that's Slice 1)
- [x] Firebase modular SDK wrapper (`src/firebase/`) — connectivity
      verified against the live project (527 existing quilts read
      successfully); nothing in the UI uses it yet

## Slice 0: Theme foundation

- [x] Tailwind CSS v4 + Radix UI installed and wired up
- [x] Design tokens: colors (parchment/maroon/gold palette), fonts
      (Cinzel display, Inter body)
- [x] Base components: `Button`, `Card`, `Dialog` (Radix-powered)
- **Manual test**: open the app — the shell visibly uses the
  parchment/maroon theme, not default browser styling. On the designer
  page, click "Open info" to confirm the themed dialog opens/closes.

## Slice 1: Block catalog sidebar

- [ ] Themed list of ported blocks
- [ ] Search/filter
- **Manual test**: browse the block list, search narrows it.

## Slice 2: Quilt grid + size picker

- [ ] Empty themed grid for the selected quilt size
- [ ] Size picker resizes the grid
- **Manual test**: change the size dropdown, grid dimensions update.

## Slice 3: Click-to-place blocks

- [ ] Select a block from the sidebar, click a grid square, block appears
      there
- **Manual test**: place a couple of different blocks on the grid.

## Slice 4: Bucket paint tool

- [ ] Click an empty square, pick a color, square gets painted
- **Manual test**: paint a few squares with different colors.

## Slice 5: Manipulate placed blocks

- [ ] Move/grab a placed block
- [ ] Delete a placed block
- [ ] Flip a placed block
- [ ] Rotate a placed block
- [ ] Recolor a placed block
- **Manual test**: for each action, place a block and try it.

## Slice 6: Reset & info dialog

- [ ] Reset-with-confirmation clears the quilt
- [ ] Info/help dialog content matches the new interactions
- **Manual test**: reset a quilt with blocks on it; open the info dialog.

## Slice 7: Save to Firebase

- [ ] Save button writes the quilt to `/quilts/{id}`
- [ ] Shareable id/URL generated
- **Manual test**: save a design, confirm the URL changes and the save
  succeeds.

## Slice 8: Load from Firebase via URL

- [ ] `/:quiltId` loads and renders real saved data
- **Manual test**: paste a saved quilt's URL in a fresh tab, it loads.

## Slice 9: Firebase security rules deployed

- [ ] `database.rules.json` drafted (creator-lock writes, `quiltIndex`)
- [ ] Deployed to `poddesigner-7d754` (**with your explicit go-ahead**)
- **Manual test**: confirm the "insecure rules" email stops, confirm you
  can still save/load, confirm editing someone else's quilt id is
  rejected.

## Slice 10: Drag-and-drop upgrade

- [ ] Replace click-to-place with drag-and-drop (dnd-kit) for placing and
      moving blocks
- **Manual test**: drag a block from the sidebar onto the grid; drag a
  placed block to a new spot.

## Slice 11: Gallery

- [ ] `quiltIndex` write-on-save
- [ ] Gallery browse grid
- [ ] Clone-to-new-quilt flow
- **Manual test**: browse the gallery, clone someone else's design, confirm
  it's now your own editable copy.

## Slice 12: Polish pass

- [ ] Responsive check
- [ ] Loading/empty states
- [ ] Firebase error states handled
- **Manual test**: resize the window; try save/load with network
  throttled or offline.

## Slice 13: Cutover

- [ ] Firebase Hosting pointed at the new build
- [ ] pod2 kept read-only until confidence is high
- **Manual test**: visit the production URL, confirm it's serving pod3.
