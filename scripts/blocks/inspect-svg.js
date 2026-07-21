#!/usr/bin/env node
// Reports the shapes in a raw block-source SVG export, converted to the
// project's target conventions (see docs/adding-blocks.md), so they can be
// transcribed into a block component without doing the arithmetic by hand.
//
// Usage: node scripts/blocks/inspect-svg.js "docs/fis-todo/<category>/<file>.svg"

import fs from 'node:fs'

const file = process.argv[2]
if (!file) {
  console.error('Usage: node scripts/blocks/inspect-svg.js <path-to-svg>')
  process.exit(1)
}
const src = fs.readFileSync(file, 'utf8')

function toHex(rgb) {
  const m = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
  if (!m) return null
  return (
    '#' +
    [1, 2, 3]
      .map((i) => parseInt(m[i], 10).toString(16).padStart(2, '0'))
      .join('')
  )
}

function kebab(title) {
  return title.trim().replace(/_/g, '-')
}

function isIdentityTransform(t) {
  if (!t) return true
  const m = t.match(/matrix\(([^)]+)\)/)
  if (!m) return true // non-matrix transforms (rare) pass through unflagged
  const [a, b, c, d, e, f] = m[1].split(',').map(parseFloat)
  return (
    Math.abs(a - 1) < 1e-6 &&
    Math.abs(b) < 1e-6 &&
    Math.abs(c) < 1e-6 &&
    Math.abs(d - 1) < 1e-6 &&
    Math.abs(e) < 1e-3 &&
    Math.abs(f) < 1e-3
  )
}

function attr(attrs, name) {
  const m = attrs.match(new RegExp(name + '="([^"]*)"'))
  return m ? m[1] : null
}

function fillFromStyle(style) {
  const m = (style || '').match(/fill:\s*(rgb\([^)]+\)|none)/)
  if (!m) return { fill: null, warning: 'no style/fill attribute at all' }
  if (m[1] === 'none') return { fill: 'none', warning: null }
  return { fill: toHex(m[1]), warning: null }
}

const warnings = []
const shapes = []

// Filename convention check (see docs/adding-blocks.md)
const base = file.replace(/^.*\//, '').replace(/\.svg$/, '')
const parts = base.split('_')
console.log(`# ${base}\n`)
console.log('## Filename parse')
console.log(JSON.stringify(parts, null, 0))
if (parts.length < 5) {
  warnings.push(
    `filename has ${parts.length} underscore-separated parts, expected at least 5 (number, name, designer, size, difficulty) — check manually`,
  )
}
console.log()

// background rect drives the viewBox for every existing block
const bgMatch = src.match(
  /<rect\s+([^>]*?)\/?>\s*<title>background<\/title>\s*<\/rect>/,
)
if (bgMatch) {
  const attrs = bgMatch[1]
  const x = parseFloat(attr(attrs, 'x') || '0')
  const y = parseFloat(attr(attrs, 'y') || '0')
  const w = parseFloat(attr(attrs, 'width'))
  const h = parseFloat(attr(attrs, 'height'))
  console.log('## Derived viewBox (from background rect)')
  console.log(`viewBox="${x} ${y} ${w} ${h}"`)
  console.log(`background path d="M${x} ${y}H${x + w}V${y + h}H${x}Z"`)
  console.log()
} else {
  warnings.push(
    'no <rect><title>background</title></rect> found — derive viewBox manually',
  )
}

function reportRects() {
  const re = /<rect\s+([^>]*?)\/?>(?:\s*<title>([^<]*)<\/title>\s*<\/rect>)?/g
  let m
  while ((m = re.exec(src))) {
    const attrs = m[1]
    const title = m[2]
    const x = parseFloat(attr(attrs, 'x') || '0')
    const y = parseFloat(attr(attrs, 'y') || '0')
    const w = parseFloat(attr(attrs, 'width'))
    const h = parseFloat(attr(attrs, 'height'))
    const { fill, warning } = fillFromStyle(attr(attrs, 'style'))
    const transform = attr(attrs, 'transform')
    const identity = isIdentityTransform(transform)
    if (!title) warnings.push(`untitled <rect> at x=${x} y=${y}`)
    if (warning) warnings.push(`<rect> "${title}": ${warning}`)
    if (!identity)
      warnings.push(
        `<rect> "${title}" has a non-identity transform: ${transform} — preserve it, don't drop`,
      )
    shapes.push({
      tag: 'rect',
      title,
      className: title ? kebab(title) : null,
      d: `M${x} ${y}H${x + w}V${y + h}H${x}Z`,
      fill,
      transform: identity ? null : transform,
    })
  }
}

function reportSimple(tag) {
  const re = new RegExp(
    `<${tag}\\s+([^>]*?)\\/?>(?:\\s*<title>([^<]*)<\\/title>\\s*<\\/${tag}>)?`,
    'g',
  )
  let m
  while ((m = re.exec(src))) {
    const attrs = m[1]
    const title = m[2]
    const { fill, warning } = fillFromStyle(attr(attrs, 'style'))
    const transform = attr(attrs, 'transform')
    const identity = isIdentityTransform(transform)
    if (!title)
      warnings.push(`untitled <${tag}> found (fill ${fill ?? 'unknown'})`)
    if (tag === 'path' && warning)
      warnings.push(`<path> "${title}": ${warning}`)
    if (!identity)
      warnings.push(
        `<${tag}> "${title}" has a non-identity transform: ${transform} — preserve it, don't drop`,
      )
    shapes.push({
      tag,
      title,
      className: title ? kebab(title) : null,
      fill: tag === 'path' ? fill : undefined,
      transform: identity ? null : transform,
    })
  }
}

reportRects()
reportSimple('path')
reportSimple('line')
reportSimple('polyline')
reportSimple('ellipse')

// <g> groups (e.g. embroidery motifs made of several line/polyline children)
const groupRe = /<g([^>]*)>\s*<title>([^<]*)<\/title>/g
let gm
while ((gm = groupRe.exec(src))) {
  const transform = attr(gm[1], 'transform')
  const identity = isIdentityTransform(transform)
  shapes.push({
    tag: 'g',
    title: gm[2],
    className: kebab(gm[2]),
    transform: identity ? null : transform,
  })
  if (!identity)
    warnings.push(
      `<g> "${gm[2]}" has a non-identity transform: ${transform} — preserve it, don't drop`,
    )
}

console.log('## Shapes (document order)')
for (const s of shapes) {
  console.log(JSON.stringify(s))
}

console.log('\n## Warnings — resolve or ask the user before finalizing')
if (warnings.length === 0) {
  console.log('(none)')
} else {
  for (const w of warnings) console.log(`- ${w}`)
}
