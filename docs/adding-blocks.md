# Adding new blocks from source SVGs

How to turn a raw SVG export into a block component and catalog entry. Written
for Claude Code to follow when the user drops new SVGs under
`docs/fis-todo/<category>/` and asks for them to be added — read this before
starting that task.

## Input

The user provides one SVG file per block (plus a matching reference PNG),
under `docs/fis-todo/<category>/` — e.g. `docs/fis-todo/supplemental/`. The
filename encodes the block metadata, `_`-separated:

```
<number>_<Name>_<Designer>_<WidthxHeight>_<difficulty>.svg
```

e.g. `049_Lilys Goldfish Bowl_Jennifer Larimore_10x10_3.svg` →
number 049, name "Lily's Goldfish Bowl" (restore the apostrophe — filenames
can't contain one), designer Jennifer Larimore, size 10×10 grid cells,
difficulty 3.

Difficulty in this catalog ranges 1–5. Extra `_`-separated tokens can show up
beyond this base pattern — see "Extra filename tokens" below for the two seen
so far (a second `WidthxHeight`, and `with embroidery`).

The export tool the user's design software produces is **not** the same shape
as pod2's original hand-authored SVGs, and needs converting — see below.

Once a block's component + catalog entry are done and validated, move its
`.svg` and `.png` into a `done/` subfolder next to them (e.g.
`docs/fis-todo/supplemental/done/`) so a future pass over the todo folder
doesn't reprocess it.

## Target format

Every block component (`src/assets/blocks/svg/<category>/NNNName.tsx`) looks
like this — match it exactly:

```tsx
import type { SVGProps } from 'react'

const SvgNNNName = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="x y width height" {...props}>
    <path d="..." className="background" fill="#9b7647" />
    <path d="..." className="kebab-case-part-name" fill="#rrggbb" />
    {/* one <path> per visual part */}
  </svg>
)

export default SvgNNNName
```

Rules that hold across every existing block, checked by grepping the existing
`src/assets/blocks/svg/**` tree before writing new ones:

- Mostly `<path>` elements — no `<rect>`, `<image>`, `<style>`, or `<defs>`.
  `<line>`/`<polyline>`/`<ellipse>` are fine to keep as literal elements
  (rather than force-converting to `<path>`) when a shape genuinely needs
  them — see "Non-rect shapes and transforms" below.
- Colors are `fill="#rrggbb"` hex, never `rgb()`. Plain presentation
  attributes (`fill`, `stroke`, `strokeWidth`) rather than a `style=` object,
  _except_ where a CSS `transform`/`transformOrigin` is genuinely needed (see
  below) — the rest of that element's own styling can still go through plain
  attributes alongside it.
- `className` is a kebab-case part name (`bowl-rim`, not `bowl_rim` or
  `BowlRim`).
- `viewBox` matches the bounds of the `background` shape exactly — not
  whatever viewBox (if any) the source file declares.
- The `background` shape is listed first.

## Conversion steps

Use `node scripts/blocks/inspect-svg.js "docs/fis-todo/<category>/<file>.svg"`
first — it strips the preview image, derives the viewBox, converts every
`rect`/`path`/`line`/`polyline`/`ellipse`/`g` to hex colors + kebab
classNames, and prints a warnings list (untitled parts, missing fills,
non-identity transforms) so you're not doing the arithmetic or the "did I
miss something" check by hand. Then hand-transcribe its output into the
component, since the script reports shapes rather than writing the `.tsx`
itself — skim `docs/fis-todo/supplemental/05*.tsx` (or any recent block) for
worked examples of what the output should turn into. What it's doing under
the hood, if you need to reason about something it didn't handle:

1. **Strip the embedded raster preview.** The file usually opens with a giant
   base64 PNG in an `<image>` tag — this is a thumbnail from the design tool,
   never used, always dropped.
2. **Derive the real `viewBox` from the `background` shape's own `x y width
height`**, not the file's own top-level `viewBox` attribute (it's
   frequently a stale/default value like `0 0 500 500` that doesn't match the
   actual artwork bounds).
3. **Convert `<rect x y width height>` → `<path>`**: `d="M{x} {y}H{x+width}V{y+height}H{x}Z"`.
4. **Convert colors**: `style="fill: rgb(r, g, b)"` → `fill="#rrggbb"`.
5. **Convert part names**: `<title>some_name</title>` child → `className="some-name"`
   (underscores → hyphens).
6. Leave path `d` geometry untouched otherwise — don't re-minify or
   re-round coordinates, just carry them over.

### Non-rect shapes and transforms

Some exports use `<line>`/`<polyline>`/`<ellipse>` with real CSS
`transform`/`transform-origin` (e.g. a decorative motif built from one shape
rotated several times) — seen so far in embroidery details. Two different
transform situations show up, and they need different handling:

- **Near-identity matrices** (e.g. `matrix(0.9999999999999999, 0, 0,
0.9999999999999999, -1.1e-13, 0)`) are floating-point noise from the export
  tool — drop the `transform` entirely. `inspect-svg.js` only flags
  transforms that _aren't_ effectively identity, so anything it doesn't
  warn about here is safe to drop.
- **Real transforms** (actual rotation/translation) must be preserved or the
  shape ends up in the wrong place. A plain SVG `transform="matrix(...)"` or
  `transform="translate(x y)"` attribute is fine for pure translation. But if
  the source used CSS `transform-origin` (a non-zero pivot point, often
  paired with `transform-box: fill-box` for percentage origins), keep it as
  a `style={{ transform, transformOrigin, transformBox }}` object instead of
  a plain attribute — plain SVG `transform` always pivots around (0,0) and
  will rotate the shape to the wrong place if the source depended on a
  different pivot.

If the same motif (e.g. several identical embroidered snowflakes at
different offsets) repeats verbatim, it's fine to factor the shared JSX into
a local constant reused across the `<g>` wrappers, rather than tripling the
literal markup — this is the one place block components deviate from the
otherwise fully static, single-function-body style every other block file
uses. Only do this for genuinely identical repeats, not similar-but-different
shapes.

## Things to flag to the user rather than guess

These have come up in practice and are easy to get wrong silently — ask
before deciding:

- **A part with no fill at all** (empty `style=""`). SVG defaults to black,
  but confirm that's actually intended before hardcoding `fill="#000000"`.
- **Stray untitled/unstyled paths** (e.g. a lone two-point line with no fill
  or title) — usually leftover guide artifacts from the design tool, safe to
  drop, but confirm rather than deleting silently.
- **Duplicate or inconsistent part titles** (e.g. two shapes both titled the
  same thing when their position/fill suggests they're different parts) —
  point out the specific mismatch and let the user say what it should be.
- **Restoring punctuation stripped from the filename** (apostrophes,
  ampersands) for the display `name`.
- **Tags** — this repo has no strict tagging rule (`git grep "tags:"` in
  `src/assets/blocks/*.tsx` shows it's inconsistent), so derive sensible ones
  from the block/part names unless the user wants specific ones.
- **Extra `_`-separated filename tokens beyond the base pattern** — see
  "Extra filename tokens" below for the two seen so far; if a new kind shows
  up, ask rather than guessing what it means.

## Extra filename tokens

- **A second `WidthxHeight` token** (e.g. `051_Spiderweb Corner_Holly
Urbain_5x5_10x10_3.svg`) where the SVG itself only contains one size's
  worth of artwork: confirm whether the user wants two catalog entries (one
  per size, reusing the same component) or just one. Precedent so far: two
  entries reusing the same component, `file` suffixed with the size (e.g.
  `051-spiderweb-corner-5x5` / `-10x10`) to keep `file` unique per entry.
- **`with embroidery`** (e.g. `054_Mistletoe with Books_Holly
Urbain_10x10_with embroidery_4.svg`): append `" [embroidered]"` to the
  catalog entry's `name`, and add `hasEmbroidery: true` to the entry. This is
  a per-block field, not part of a shared type — other entries simply omit
  it (same pattern as `designer` being absent on a handful of blocks).

## Catalog entry

Each category file (e.g. `src/assets/blocks/supplementalBlocks.tsx`) is a flat
array. Add the new component's import alongside the others (alphabetical by
number, at the end), then append an entry:

```tsx
{
  id: 'sbNN',              // next unused id in this category's sequence
  name: 'Display Name',
  size: { width: 10, height: 10 }, // grid cells, from the filename
  tags: ['derived', 'tags'],
  type: 'supplemental',    // matches the category
  difficulty: 3,           // from the filename, 1-5
  designer: 'Designer Name',
  file: 'NNN-kebab-case-name', // matches the svg source filename's slug
  element: (props: SVGProps<SVGSVGElement>) => <SvgNNNName {...props} />,
},
```

Find the next `id` by checking the last entry in the array (ids increment
across the whole array, not per source number — some source numbers have
multiple ids, e.g. house-colored variants).

## Verifying the conversion

`npm run build`/`vitest` won't catch a wrong color or a misplaced path — the
type checker only cares that it's valid JSX. Actually look at the rendered
artwork before calling it done:

```bash
node scripts/blocks/preview-svg.js src/assets/blocks/svg/supplemental/NNNName.tsx /tmp
```

This renders the component through Vite's own SSR module loader (the same
transform pipeline as `npm run dev`), so it handles anything the component
does — JSX fragments, shared sub-trees, hooks-free composition — not just
static markup, then shells out to macOS's `qlmanage` for a PNG thumbnail at
`/tmp/NNNName.preview.svg.png`. Read that PNG back and sanity-check it
against the source export before adding the catalog entry.

Both scripts live in `scripts/blocks/` — `inspect-svg.js` (see "Conversion
steps" above) and `preview-svg.js` (this one) — and are meant to be reused
across sessions, not one-off scratch files.
