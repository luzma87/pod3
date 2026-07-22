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
- [x] Hover preview: while a block is selected, hovering the grid shows a
      tinted overlay at the block's full footprint (not just one square),
      so you can see exactly where it'll land before clicking; tints
      differently if the footprint would go out of bounds
- **Manual test**: click a block in the sidebar (it highlights), hover
  over the grid — a gold-tinted footprint should follow your cursor,
  sized to that block's actual dimensions. Move it near the right/bottom
  edge and the tint should switch to indicate it won't fit there. Click a
  square, the block appears there and the sidebar selection clears. Place
  a couple of different blocks in different spots. Clicking the grid with
  nothing selected opens the paint dialog (Slice 4) instead of placing
  anything.

Known follow-up, not blocking (added to `docs/todo.md`): grid placement is
mouse-only right now (click position is computed from pointer coordinates,
per the earlier decision to avoid one DOM node per cell) — there's no
keyboard-accessible way to place a block yet. Worth revisiting during the
Slice 12 polish pass.

## Slice 4: Bucket paint tool

- [x] Click an empty square (with no block selected), a themed dialog of
      the pod2 preset color swatches opens
- [x] Picking a swatch paints that single square and closes the dialog
- [x] Repainting an already-painted square replaces its color instead of
      stacking
- [x] Hover preview: with nothing selected, hovering the grid shows a
      single-square gold-tinted preview at the cell under the cursor, so
      it's clear which square will be painted before you click (mutually
      exclusive with the block-footprint preview from Slice 3 — only one
      shows depending on whether a block is selected)
- **Manual test**: click an empty grid square with nothing selected in the
  sidebar — a "Choose a color" dialog with a grid of color swatches
  appears. Before clicking, hover around the grid and confirm a
  single-square highlight follows your cursor. Pick a color, the square
  gets painted and the dialog closes. Paint a few different squares with
  different colors. Click an already-painted square and pick a different
  color — it should replace, not stack. Switch to Spanish and confirm the
  dialog title and swatch tooltips translate.

Scope note: this slice only paints a single square per click (per your
choice) — pod2's bucket tool could paint a rectangle (extend right/down
from the clicked square) and offered free-form color choice beyond the
preset palette. Both are noted as possible follow-ups in `docs/todo.md`
rather than built now.

## Slice 5: Manipulate placed blocks

- [x] Hovering a placed block reveals a small action toolbar (Flipendo /
      Wingardium Leviosa / Circumrota / Colovaria / Evanesco — keeping the
      pod2 spell flavor as tooltips/labels, per the plan)
- [x] Delete a placed block (Evanesco)
- [x] Flip a placed block (Flipendo)
- [x] Rotate a placed block 90° at a time (Circumrota)
- [x] Move/grab a placed block (Wingardium Leviosa) — reuses the exact
      click-to-place flow from Slice 3 (grabbing removes the instance and
      selects it as pending; clicking a new square re-places it).
      **Improvement over pod2**: pod2's grab discarded any
      flip/rotate/recolor customization on re-placement (it re-selected
      the plain catalog block); pod3 carries those over to the new
      instance instead.
- [x] Recolor a placed block (Colovaria) — full per-part recolor like
      pod2: opens a dialog that scans the block's SVG for named parts
      (e.g. "wings", "background") by their class names, lets you pick a
      part then a color, previews live, and only commits on Save (Cancel
      discards). Uses the same preset swatch palette as the bucket tool
      rather than a full arbitrary-color picker (see `docs/todo.md`).
- **Manual test**: place a block, hover it — a small toolbar should
  appear above it. Try each button: flip mirrors it, rotate turns it 90°
  each click, delete removes it. Click move (feather icon) — the block
  disappears and you're back in placement mode; click a new square and
  it reappears there. Click recolor (palette icon) — a dialog opens
  showing the block's distinct colorable parts; click "Wings" (or
  whichever part), pick a color swatch, click Save — that part of the
  placed block should now be recolored. Try Cancel instead and confirm
  no change happened. Flip/rotate/recolor a block, then move it, and
  confirm those customizations survive the move (this is the pod2
  improvement — worth specifically checking).

## Slice 6: Reset & info dialog

- [x] Reset-with-confirmation clears the quilt (`ResetDialog`, placed blocks
      and painted squares only — quilt size is untouched)
- [x] Info/help dialog content matches the new interactions (click-to-place,
      hover toolbar for flip/rotate/move/recolor/delete, paint-by-click,
      reset), plus the pod2 attribution/licensing text and links
- **Manual test**: place a couple of blocks and paint a square, click Reset
  in the designer header, confirm in the dialog — the quilt should go back
  to empty. Click Info — a dialog with attribution links, the license
  disclaimer, and a rundown of how to place/manipulate/paint should open;
  "Got it" closes it. Switch to Spanish and confirm both dialogs translate.

## Slice 7: Save to Firebase

- [x] Save button writes the quilt to `/quilts/{id}`
- [x] Shareable id/URL generated
- **Manual test**: save a design, confirm the URL changes and the save
  succeeds. ✅ confirmed — quilt data visible in Firebase under the
  generated id.

## Slice 8: Load from Firebase via URL

- [x] `/:quiltId` loads and renders real saved data
- [x] Backwards-compatible with legacy pod2-shaped quilts (merged
      blocks/paint array, nested `{name, size: {w, h}}` size object)
- **Manual test**: paste a saved quilt's URL in a fresh tab, it loads.
  Also worth trying an old pod2-era quilt link and a bogus/nonexistent id.

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
