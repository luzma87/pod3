# Adding new blocks from source SVGs

How to turn a raw SVG export into a block component and catalog entry. Written
for Claude Code to follow when the user drops new SVGs in `docs/` and asks for
them to be added — read this before starting that task.

## Input

The user provides one SVG file per block, generally saved directly in `docs/`
(cleaned up afterwards once the block is added). The filename encodes the
block metadata, `_`-separated:

```
<number>_<Name>_<Designer>_<WidthxHeight>_<difficulty>.svg
```

e.g. `049_Lilys Goldfish Bowl_Jennifer Larimore_10x10_3.svg` →
number 049, name "Lily's Goldfish Bowl" (restore the apostrophe — filenames
can't contain one), designer Jennifer Larimore, size 10×10 grid cells,
difficulty 3.

Difficulty in this catalog ranges 1–5.

The export tool the user's design software produces is **not** the same shape
as pod2's original hand-authored SVGs, and needs converting — see below.

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

- Only `<path>` elements — no `<rect>`, `<image>`, `<style>`, `<defs>`, or
  `style=` attributes anywhere.
- Colors are `fill="#rrggbb"` hex, never `rgb()`/`style`.
- `className` is a kebab-case part name (`bowl-rim`, not `bowl_rim` or
  `BowlRim`).
- `viewBox` matches the bounds of the `background` shape exactly — not
  whatever viewBox (if any) the source file declares.
- The `background` shape is listed first.

## Conversion steps

Raw exports from the user's tool tend to look like this instead, and need
translating:

1. **Strip the embedded raster preview.** The file usually opens with a giant
   base64 PNG in an `<image>` tag — this is a thumbnail from the design tool,
   never used, always dropped. (Tip: `grep -v base64 file.svg` to view the
   rest of the file without choking on the huge line.)
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
# extract just the <svg>...</svg> from the tsx and render it
node -e "
  const fs = require('fs')
  let s = fs.readFileSync('path/to/NNNName.tsx', 'utf8')
  let svg = s.match(/<svg[\s\S]*<\/svg>/)[0].replace('{...props}', 'xmlns=\"http://www.w3.org/2000/svg\"')
  fs.writeFileSync('/tmp/preview.svg', svg)
"
qlmanage -t -s 600 -o /tmp /tmp/preview.svg   # macOS: writes /tmp/preview.svg.png
```

Read the resulting PNG back and sanity-check it against the source export
before adding the catalog entry.
