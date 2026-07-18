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

## Slice 0b: Internationalization & light/dark theme switcher

- [x] `react-i18next` + `i18next-browser-languagedetector` wired up
- [x] English + Spanish translation files (`src/i18n/locales/en.json`,
      `es.json`)
- [x] Visible `LanguageSwitcher` in the persistent header
- [x] Manual light/dark `ThemeToggle` in the persistent header, persisted
      to `localStorage`, no flash of the wrong theme on load
- **Manual test**: open the app, use the language dropdown in the header
  to switch to Español and confirm the designer page text changes; use
  the theme toggle to confirm colors swap between light/dark and persist
  across a page refresh.

## Slice 0c: Themed 404 page & attributions page

- [x] 404 page shows the ghost-with-hat artwork, translated copy, and a
      link back to the designer
- [x] `/attributions` route lists third-party assets with source links
      (currently just the ghost artwork), linked from the footer on every
      page
- [x] Ghost artwork optimized (2000×2000, 1.8MB → 480px wide, ~47KB) before
      being committed
- **Manual test**: visit a nonexistent URL, confirm the ghost/404 page
  looks right and "Back to the quilt designer" works; click "Attributions"
  in the footer, confirm the ghost credit links out to Vecteezy.

## Slice 1: Block catalog sidebar

- [x] Themed list of ported blocks (527 blocks across 6 categories)
- [x] Search/filter by name or tag
- [x] Grouped under translated category headers (Weekly, Supplemental,
      Top & Sides, Other, Beasts, Disney)
- **Manual test**: browse the block list in the sidebar (grouped by
  category with headers), type in the search box to narrow it down —
  e.g. searching "mimbulus" should leave just one result under "Other".
  Known follow-up (not blocking): the production JS bundle is now ~855KB
  since all 527 SVGs are bundled eagerly — worth revisiting with
  code-splitting/virtualization during the Slice 12 polish pass if it
  becomes a real problem.

## Slice 2: Quilt grid + size picker

- [x] Empty themed grid for the selected quilt size — rendered as a
      single element with a CSS background-pattern grid, not one DOM
      node per square (pod2's approach doesn't scale: a King quilt would
      be ~11,880 divs)
- [x] Size picker resizes the grid, all 14 pod2 sizes ported and
      translated
- **Manual test**: change the size dropdown (defaults to "Throw"), the
  grid and the summary text below it should resize to match. Try "King"
  for the largest grid and "Baby" for the smallest.

## Slice 3: Click-to-place blocks

- [x] Select a block from the sidebar, click a grid square, block appears
      there — added `designerStore` (Zustand) as the first cross-component
      shared state, since the sidebar and grid are siblings that both need
      to know about `blockToPlace`
- [x] Selected sidebar block shows a pressed/highlighted state
- [x] Selection clears automatically after placing
- **Manual test**: click a block in the sidebar (it highlights), click a
  square on the grid, the block appears there and the sidebar selection
  clears. Place a couple of different blocks in different spots. Clicking
  the grid with nothing selected does nothing.

Known follow-up, not blocking (added to `docs/todo.md`): grid placement is
mouse-only right now (click position is computed from pointer coordinates,
per the earlier decision to avoid one DOM node per cell) — there's no
keyboard-accessible way to place a block yet. Worth revisiting during the
Slice 12 polish pass.

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
