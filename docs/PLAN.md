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

## Suggested phases

1. **Scaffold**: Vite + React + TS project in `pod3`, base routing (`/` and
   `/:quiltId` matching current `react-router` behavior), theme tokens
   placeholder, port cursors and block assets untouched so nothing else is
   blocked on them.
2. **Store + Firebase core**: Zustand stores with the current behavior
   ported 1:1 (no UX changes yet), modular Firebase wrapper, load/save
   round-trip working against existing saved quilts.
3. **Visual system**: implement the chosen direction's theme (colors,
   fonts, base components: buttons, dialogs, cards, the info/save/load/
   reset/recolor dialogs).
4. **Interaction upgrade**: drag-and-drop placement/movement, contextual
   block toolbar for spells, smoothed color painting.
5. **Gallery**: `quiltIndex` write-on-save, browse grid, clone-to-new-quilt
   flow.
6. **Polish**: responsive check, loading/empty states, the info dialog
   content rewritten to match the new interactions, error states for
   Firebase failures (currently mostly unhandled).
7. **Cutover**: deploy the new security rules to `poddesigner-7d754`
   (with your explicit go-ahead), point Firebase Hosting at the new build,
   keep pod2 around read-only until confidence is high.

## Resolved

- Visual direction: option 2 (Enchanted stationery, componentized).
- Package manager: npm.
- Firebase project: reuse `poddesigner-7d754`, no new project.
- Edit permissions: creator-only edit, fork-to-copy for everyone else.
- Gallery: no visibility toggle for now — all quilts browsable.
