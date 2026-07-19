# Icon shopping list

Inventory of every button/action in the app that currently uses an emoji or
plain text where a proper icon would help, with a suggested icon concept for
each (worded so it's searchable on any icon marketplace). Compiled while
looking for icon packs to buy — see `docs/todo.md`'s "better icons" item.

## Navbar

| Action                                                    | Current          | Suggested icon                                                                                                                                                       |
| --------------------------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Info button (opens credits/instructions)                  | ℹ️ emoji         | "info" / circled-i outline                                                                                                                                           |
| Email/contact link                                        | ✉️ emoji         | "envelope" / "mail"                                                                                                                                                  |
| Language switcher trigger                                 | 🇬🇧/🇪🇸 flag emoji | Either keep flags for the dropdown _options_, or use a "globe"/"translate" icon for the _trigger_ button (common convention: globe on the button, flags in the menu) |
| Theme toggle trigger                                      | 🌙 / ☀️ emoji    | "sun" and "moon" — a matched pair from the same set                                                                                                                  |
| Dropdown selected-item checkmark (language + theme menus) | ✓ text glyph     | "check" / checkmark, small                                                                                                                                           |
| Dialog close button (used by every dialog)                | ✕ text glyph     | "x" / close, small, used consistently everywhere                                                                                                                     |

## Workspace controls

| Action                  | Current                  | Suggested icon                                                                   |
| ----------------------- | ------------------------ | -------------------------------------------------------------------------------- |
| Reset quilt button      | Text only ("Reset")      | "refresh-ccw" / "restore" / "undo" — pod2 used a "trash-restore" style icon here |
| Quilt size picker       | Text label only, no icon | Optional: "ruler" or "maximize" prefix icon                                      |
| Major grid-lines picker | Text label only, no icon | Optional: "grid" icon prefix                                                     |

## Block "spell" toolbar (hover toolbar on a placed block) — biggest opportunity

| Action    | Spell name         | Current          | Suggested icon                                                                                  |
| --------- | ------------------ | ---------------- | ----------------------------------------------------------------------------------------------- |
| Flip      | Flipendo           | ↔ arrow glyph    | "flip-horizontal" / mirror                                                                      |
| Rotate    | Circumrota         | ↻ arrow glyph    | "rotate-cw"                                                                                     |
| Move/grab | Wingardium Leviosa | 🪶 feather emoji | "move" (4-way arrows), or keep a feather/wand-themed icon for the HP flavor if the pack has one |
| Recolor   | Colovaria          | 🎨 palette emoji | "palette" or "paint-bucket"                                                                     |
| Delete    | Evanesco           | 🗑 trash emoji    | "trash"                                                                                         |

`docs/PLAN.md` notes pod2 used generic FontAwesome icons here and explicitly
suggested going custom/spell-themed instead — this toolbar is the one place a
matched, on-brand icon set would show the most.

## Paint (bucket) tool dialog

| Action        | Current              | Suggested icon                                               |
| ------------- | -------------------- | ------------------------------------------------------------ |
| Erase button  | Text only ("Erase")  | "eraser"                                                     |
| Cancel button | Text only ("Cancel") | "x" (reuse the same close icon as elsewhere for consistency) |

## Not worth icon-buying

- Recolor dialog's per-part swatches — already self-explanatory colored squares.
- Reset/Recolor dialog Confirm/Save/Cancel buttons — text is clearer than an icon here (destructive/confirm actions).
- Catalog search input, block thumbnails — block art is licensed content, out of scope.

## Shopping tip

The info/email/theme/language/close icons all sit in the same navbar row, and
the flip/rotate/move/recolor/delete icons sit together in one toolbar — buy
those as two matched sets (same stroke width/style) rather than mixing packs.
That's the biggest visual-consistency win over the current mixed-emoji look.

## Format: SVG, individually (not PNG / icon font / sprite)

- **Individual SVG** is the right format for this codebase. `src/assets/blocks/svg/` already renders all block art as hand-written `.tsx` files, each wrapping a plain `<svg>...</svg>` — no SVGR plugin, no sprite system. Downloading icons as individual SVGs and dropping each into its own small component matches that existing pattern exactly.
- SVG (vs PNG) scales cleanly at any size and, with `fill="currentColor"`, automatically recolors for hover states and the app's dark/light theme (`--color-ink`, `--color-maroon`, etc. in `index.css`) — a single file handles every state instead of needing multiple PNG exports.
- **Icon fonts** are a legacy pattern (accessibility downsides, an extra build/loading step) — skip them.
- **SVG sprites** bundle many icons into one file as `<symbol>` elements, referenced via `<svg><use href="#icon-id"/></svg>`. The upside is fewer HTTP requests from one shared/cached file; the cost is an extra build step to maintain the sprite and some cross-browser fragility with `<use>` + `currentColor` theming. Not worth it at this icon count (~15-20 icons), and it doesn't match how block art is already handled here.

### Flaticon Pro specifics

- When downloading a collection, choose the **SVG** export (individual files, zip) — not Flaticon's "Sprite" or "Icon Font" export options.
- Flaticon SVGs usually ship with a hardcoded `fill="#xxxxxx"`. Strip that and replace it with `fill="currentColor"` so each icon inherits the button's color/theme instead of being stuck at one fixed color.
