# Pod3 Modernization Plan

## What pod2 currently is

A single-page "quilt builder" for the Harry Potter fandom-quilt community
(Fandom in Stitches / Project of Doom). Users pick pre-made SVG quilt blocks
(beasts, Hogwarts houses, weekly pattern blocks, etc.), place them on a grid
representing a quilt of a chosen size, paint plain color squares with a
bucket tool, and can flip/rotate/recolor/delete/move blocks via a "spell"
menu (Flipendo, Wingardium Leviosa, Circumrota, Colovaria, Evanesco). Designs
save to Firebase Realtime Database under a human-readable id and produce a
shareable URL (`/{quiltName}`).

Current stack: React 16 class components, a hand-rolled Context API store
(`GlobalProvider`, one class with ~20 methods and a flat state bag),
Material-UI v4, webpack 4 + babel 6/7 mixed, Firebase 7 (namespaced SDK),
react-router 5, FontAwesome 5, `big-human-readable-ids`, `lodash`. Several
hundred SVG blocks are pre-compiled to React components via `@svgr/cli` and
organized into category modules (`weeklyBlocks`, `beastsBlocks`, `disneyBlocks`,
`otherBlocks`, `supplementalBlocks`, `topSidesBlocks`).

## Decisions made so far

- **Build tool**: Vite + React 18/19.
- **Language**: TypeScript.
- **State management**: Zustand, replacing the class-based Context provider.
- **Backend**: keep the existing Firebase project (`poddesigner-7d754`),
  migrate to the v9+ modular SDK.
- **Package manager**: npm.
- **UX scope**: not just a reskin — also modernize the core building
  interactions (real drag-and-drop, smoother in-place controls).
- **Visual direction**: **option 2 — Enchanted stationery, componentized**
  (see below).
- **New feature**: a Gallery page for browsing everyone's saved designs and
  cloning one to your own user if wanted (see Gallery section below). No
  private/public toggle for now — all saved quilts are browsable, same as
  today's "anyone with the link can view" behavior, just discoverable
  without the link. A visibility toggle is a possible future addition, not
  in scope yet.
- **Security model**: quilts are edit-locked to their original (anonymous)
  creator, with explicit "save as your own copy" to fork someone else's
  design (see Firebase Security Rules section below).
- **Internationalization**: pod2 was English-only; pod3 supports English +
  Spanish from the start, with all UI strings routed through translation
  keys from the first slice rather than retrofitted later (see
  Internationalization section below).
- **Light/dark theme**: a manual toggle (not just OS-level
  `prefers-color-scheme`), persisted per browser (see Internationalization
  section below, where it was added alongside i18n).

## Visual direction: Enchanted stationery, componentized

Cream/parchment backgrounds, deep maroon and brass/gold accents, a serif
display font for headings (e.g. a Cinzel/IM Fell-style webfont) paired with
a clean body sans, soft hand-drawn-style borders on cards and dialogs,
subtle paper texture — built on top of a headless/accessible component
primitive layer (Radix UI or Ark UI) for dialogs, menus, popovers, and
tooltips, fully re-skinned with Tailwind CSS. This gives real behavior/a11y
(focus trapping, keyboard nav, positioning) for free while still landing a
distinctive, bespoke look, rather than hand-building every dialog and menu
from scratch or reskinning an opinionated kit like Chakra/Mantine.

Shared regardless of direction:

- A small illustrated/custom cursor set already exists (`assets/cursors/*.cur`
  — wand, bucket, spray) and should carry over and get sharper, higher-res
  replacements.
- Spell icons currently borrow generic FontAwesome icons (exchange, feather,
  undo, palette, trash) for Flipendo/Wingardium Leviosa/Circumrota/
  Colovaria/Evanesco — consider small custom spell-icon glyphs instead so
  each spell reads as itself rather than a generic action icon.
- Keep the block artwork (the actual quilt block SVGs) untouched — they're
  the licensed/attributed community content; only the chrome around them
  changes.

## Internationalization & theme switching

Added in the theme-foundation slice, alongside the base visual system,
rather than retrofitted later — every user-visible string goes through a
translation key from the first slice on.

- **Library**: `react-i18next` + `i18next`, with
  `i18next-browser-languagedetector` for automatic browser-language
  detection.
- **Languages**: English (`en`, fallback) and Spanish (`es`) shipped from
  the start. Adding a third language later is just adding another
  `src/i18n/locales/<lang>.json` file — no code changes needed.
- **Detection/persistence**: checks `localStorage` first, then the
  browser's `navigator.language`, falling back to English. A visible
  `LanguageSwitcher` (a `<select>` in the persistent header) lets the user
  override this manually; the choice is cached in `localStorage`.
- **Theme**: light/dark is a manual toggle (`ThemeToggle`, also in the
  header), not just OS-level `prefers-color-scheme` — though OS
  preference is used as the _default_ the first time, via the same
  detection-then-override pattern as the language. The chosen theme
  persists in `localStorage` under `pod3-theme`.
- **How dark mode works**: rather than sprinkling `dark:` utility variants
  through every component, the theme's semantic color tokens (parchment,
  ink, maroon, gold, etc.) are plain CSS custom properties, and a `.dark`
  class on `<html>` overrides their values. Components just use
  `bg-parchment`/`text-ink`/etc. and get the right colors automatically
  under either theme. An inline script in `index.html` applies the `.dark`
  class before first paint (reading `localStorage`/`prefers-color-scheme`)
  to avoid a flash of the wrong theme on load.

## Proposed architecture

```
pod3/
  src/
    app/                 # routing, top-level layout
    features/
      quilt-designer/     # the designer page: workspace + sidebar shell
      block-catalog/       # sidebar search/list/category filtering
      workspace/            # the grid, drag-drop placement, painting
      spells/                 # flip/rotate/recolor/delete/grab actions
      save-load/                # firebase-backed save/load/share
    components/ui/        # theme-aware base components (Button, Card,
                           # Dialog, ThemeToggle, LanguageSwitcher, ...)
    i18n/                 # i18next setup + locales/<lang>.json
    store/                # zustand store(s), split by concern
    firebase/             # modular SDK wrapper (auth, database)
    assets/
      blocks/             # generated SVG block components (ported as-is)
      cursors/
    theme/                # design tokens, fonts, global styles
    utils/
  vite.config.ts
```

### State management (Zustand)

Split the current single `GlobalProvider` state bag into a few focused
slices/stores instead of one god-object:

- `designerStore`: selected quilt size, placed blocks, selected block/square,
  block-to-place, bucket toggle — the core "what's on the quilt" state.
- `uiStore`: which dialog/snackbar is open, loading state.
- `catalogStore` (or just derived/local state): search/filter over the
  block catalog — this is presentational and may not need global state at
  all once it's a proper component tree instead of prop-drilled context.

Each store gets typed actions instead of the current `context.toggle('Foo')`
stringly-typed dialog toggling.

This isn't ported as one big upfront step — each store (and each slice of
each store) gets built in whichever vertical slice first needs it. E.g.
`catalogStore`'s search state arrives with Slice 1, `designerStore`'s
placed-blocks state arrives with Slice 3, its Firebase-backed fields with
Slices 7–8.

### Interactions to modernize

- Replace click-to-select-a-block-then-click-a-square-to-place with real
  drag-and-drop from the sidebar onto the grid, using `@dnd-kit/core`
  (accessible, no HTML5 DnD quirks, works well with a grid drop target).
  Keep click-to-place as a fallback/keyboard-accessible path.
  - Moving/"grabbing" an already-placed block (currently: click it, it
    detaches and follows your cursor, click again to drop) becomes
    drag-to-move within the same dnd-kit context.
- Rotate/flip/recolor/delete: replace the current "wand cursor + spell
  select + click a block" flow with a lightweight contextual toolbar that
  appears on/near a hovered or selected block (still keep the spell
  names/flavor — Flipendo, Circumrota, etc. — as a nice bit of theme, just
  make the affordance discoverable without reading the info dialog first).
- Bucket/paint tool: keep the concept, smooth out the color picker
  interaction (currently a full dialog per click).
- Preserve: shareable URL per saved quilt, quilt-size picker with
  out-of-bounds warnings when shrinking a quilt with blocks already placed.

### Firebase modernization

- Migrate `firebaseHelper.js` from the namespaced v7 API
  (`firebase.database()`, `firebase.auth()`) to modular v9+
  (`getDatabase`, `ref`, `get`, `set`, `getAuth`, `onAuthStateChanged`,
  anonymous sign-in).
- Keep the same data shape (`/quilts/{quiltName}` → `{ quiltName, blocks,
size, quiltUser }`) so existing saved quilts keep working — no data
  migration needed, beyond adding the new `gallery` node (see below).
- Move `firebaseConfig` / `analyticsConfig` template pattern over as-is
  (already gitignored appropriately), just update to the modular
  initialization calls.
- Use the existing project (`poddesigner-7d754`) for pod3 — no new project
  to provision.
- **Staying on the Spark (free) plan.** The Firebase console shows a
  "upgrade to Blaze" warning about the default Cloud Storage bucket losing
  access — this app doesn't use Cloud Storage anywhere (no `firebase/storage`
  import, no storage rules), so the warning is being ignored on purpose.
  Realtime Database, Auth, and Hosting all keep working on Spark regardless.
  Revisit only if a future feature (e.g. user-uploaded images) actually
  needs Cloud Storage.

### Firebase Security Rules (fixes the "insecure rules" emails)

Today the database has no `database.rules.json` checked into the repo,
which almost always means the console is still on the default test-mode
rules (`.read: true, .write: true` with an expiry) — that's what's
triggering Firebase's daily insecure-rules warning, and it also means
literally anyone can currently overwrite any saved quilt.

Target model, matching what you asked for — original creator can edit,
others can only clone:

```jsonc
// database.rules.json
{
  "rules": {
    "quilts": {
      "$quiltId": {
        // anyone can read a quilt by id — this is how sharing/loading works
        ".read": true,
        // create: any signed-in user (including anonymous) may create a new quilt id
        // edit: only the uid recorded as the quilt's owner may overwrite it
        ".write": "auth != null && (!data.exists() || data.child('quiltUser').child('id').val() === auth.uid)",
        ".validate": "newData.hasChildren(['quiltName', 'blocks', 'size', 'quiltUser'])",
      },
    },
    "quiltIndex": {
      // lightweight public index of all saved quilts, for the Gallery to
      // browse without downloading every quilt's full block data.
      // written automatically alongside every save, not opt-in.
      ".read": true,
      "$quiltId": {
        ".write": "auth != null && (!data.exists() || data.child('ownerId').val() === auth.uid)",
      },
    },
    "$other": {
      ".read": false,
      ".write": false,
    },
  },
}
```

Notes:

- Anonymous auth (already used by `firebaseHelper.login()`) is enough to
  satisfy `auth != null` — no change needed to the sign-in flow, just to
  the rules and to how `quiltUser.id` is trusted.
- "Save as your own copy" (forking someone else's quilt) naturally works
  under these rules: it writes to a **new** `$quiltId` (fresh
  `hri.random()` id), which is a create, not an edit, so it's always
  allowed for any signed-in user, then the copy's `quiltUser.id` becomes
  the current uid.
- Caveat inherent to anonymous auth: if you clear cookies or switch
  browsers/devices, you become a new anonymous uid and lose edit rights to
  quilts you made before — you'd fork them instead. Worth a plain-language
  note in the UI (e.g. "designs are tied to this browser").
- Deploying rules changes to the live project is a real, user-visible
  change to shared infrastructure — I'll prepare the `database.rules.json`
  and `firebase.json` `"database"` block during the Firebase phase, but
  will check with you before actually running `firebase deploy` against
  `poddesigner-7d754`.
- Worth doing in the same pass: set a Realtime Database quota/budget alert
  in the console, since public write access (even locked to auth'd users)
  on a hobby project benefits from a spending guardrail.

### Gallery feature (new)

A new page where users can browse other people's saved quilts and clone
one into their own, editable copy. Simpler than a full sharing system —
every saved quilt is browsable (no per-quilt visibility toggle for now):

- Browse/search all saved designs (grid of thumbnails — reuse the quilt
  render logic to produce a small static preview rather than storing
  separate thumbnail images).
- Open any design and **clone** it into a new quilt (new id, new
  ownership, editable), rather than editing the original in place — this
  is the same "fork" mechanic that lets you save your own copy of a quilt
  you don't own.

Data model addition — a lightweight index kept separate from the full
quilt data so the Gallery can list/scan without pulling every quilt's
full block array:

```jsonc
// /quiltIndex/{quiltId}
{
  "quiltId": "...", // same id as /quilts/{quiltId}
  "ownerId": "...", // must match quilts/{quiltId}/quiltUser/id
  "title": "...", // display name, defaults to quiltName
  "size": "...", // quilt size name, for the gallery card
  "savedAt": 1234567890,
}
```

This entry is written automatically as part of the normal save flow (not
a separate opt-in step) — every save upserts both `/quilts/{quiltId}` and
`/quiltIndex/{quiltId}`. Reading the actual blocks for a gallery entry is
just a normal `/quilts/{quiltId}` read (already public). "Clone" = read
the source quilt's blocks/size, then run the normal save flow against a
new generated id, which creates fresh entries in both nodes owned by the
current uid.

If a private/public toggle gets added later, it's a single new field on
this same index entry (e.g. `visibility: "public" | "private"`) filtered
client-side/in a query — no restructuring needed.

Sidebar/nav gets a new "Gallery" entry alongside the existing
save/load/reset/info actions; `Gallery.js` in pod2 is just an unused
rendering experiment (renders one hardcoded block) and isn't a starting
point — the gallery view is new work.

### Porting the block assets

The ~250 SVG block files under `src/assets/images/js/**` and the category
index files (`weeklyBlocks.js`, `beastsBlocks.js`, etc.) are generated,
static React components — port them over largely mechanically (regenerate
via `@svgr/cli` from the original SVG sources if those are still available,
otherwise carry over the generated `.js` files and just convert their
wrapper syntax/typing as needed). This is expected to be copy-and-adapt, not
a redesign.

### Testing

pod2 has no tests. For pod3, add:

- Vitest + React Testing Library for store logic (block placement bounds
  checking, crop-on-resize, spell actions) and key interactive components.
- Skip E2E/Playwright initially unless you want it — flag as an optional
  follow-up.

### Tooling/quality-of-life

- **Linting**: keep Vite's default `oxlint` (already scaffolded, already
  passing) rather than swapping to ESLint — no reason to replace a working
  linter just for familiarity.
- **Formatting**: Prettier, `npm run format` / `npm run format:check`.
- Replace the ad-hoc `npm-check-updates` devDependency usage with a
  documented `npm run deps:check` script (or just rely on `ncu` via npx).
- npm only, with a single `package-lock.json` — drop the current
  yarn.lock/package-lock.json duplication from pod2.

## Build order: vertical slices, not layers

Earlier drafts of this plan organized work by layer (do all the state
management, then all the visuals, then all the interactions). That means
nothing is manually testable until an entire layer is finished. Instead,
work proceeds as **vertical slices** — each one adds one complete,
themed, manually-testable piece of behavior, touching whatever
store/UI/Firebase code it needs. `docs/CHECKLIST.md` tracks these slices
one by one; this section explains the reasoning and ordering.

Two standing decisions that shape every slice:

- **Themed from the start.** Each slice uses the real visual system
  (theme tokens, base components), not placeholder/default styling — so a
  slice-0 "theme foundation" step comes before the first feature slice,
  and nothing after it should look like unstyled scaffolding.
- **Click-to-place before drag-and-drop.** Block placement starts as
  click-to-select-then-click-to-place (matches pod2, fastest to a
  testable slice); drag-and-drop is a later slice that upgrades the
  interaction once the underlying placement logic is already built and
  tested.

Slice order:

0. **Theme foundation** — Tailwind + the chosen headless primitives
   (Radix/Ark) wired up, design tokens (colors, fonts, spacing), and the
   base building blocks (button, card, dialog shell) that every later
   slice will reuse. Testable: the app shell (even mostly empty) visibly
   uses the parchment/maroon theme instead of default browser styling.
1. **Block catalog sidebar** — themed, searchable/filterable list of
   ported blocks, no placement yet. Testable: browse and search blocks.
2. **Quilt grid + size picker** — empty themed grid for the selected
   quilt size, size picker resizes it. Testable: change size, grid
   updates, no blocks placed yet.
3. **Click-to-place blocks** — select a block from the sidebar, click a
   grid square, it appears there. First slice where the two earlier
   pieces connect into one flow.
4. **Bucket paint tool** — click an empty square, pick a color, square
   gets painted.
5. **Manipulate placed blocks** — move/grab, delete, flip, rotate,
   recolor (the "spell" actions), via a discoverable per-block toolbar.
6. **Reset & info dialog** — reset-with-confirmation, and the rewritten
   info/help content matching the new interactions.
7. **Save to Firebase** — save button writes the quilt, generates the
   shareable id/URL.
8. **Load from Firebase via URL** — `/:quiltId` loads and renders real
   saved data (closes the loop opened by slice 7).
9. **Firebase security rules deployed** — creator-lock write rules,
   `quiltIndex` write-on-save (with your explicit go-ahead before
   deploying to the live project).
10. **Drag-and-drop upgrade** — replace slice 3's click-to-place with
    real drag-and-drop (dnd-kit) for placing and moving blocks.
11. **Gallery** — browse grid over `quiltIndex`, clone-to-new-quilt flow.
12. **Polish pass** — responsive check, loading/empty states, Firebase
    error states.
13. **Cutover** — deploy to `poddesigner-7d754` Hosting, keep pod2 around
    read-only until confidence is high.

Slices can be reordered if testing one reveals a dependency was missed,
but the intent is: after every slice, there's something new to click
through in the browser, not just new files that compile.

## Resolved

- Visual direction: option 2 (Enchanted stationery, componentized).
- Package manager: npm.
- Firebase project: reuse `poddesigner-7d754`, no new project.
- Edit permissions: creator-only edit, fork-to-copy for everyone else.
- Gallery: no visibility toggle for now — all quilts browsable.
- i18n: English + Spanish from the start, `react-i18next`, visible
  language switcher shipped in the theme-foundation slice (not deferred).
- Theme: manual light/dark toggle shipped alongside i18n, in the same
  slice.
