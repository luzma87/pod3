#!/usr/bin/env node
// Resizes + compresses a raster image for use as static UI artwork (e.g.
// attribution illustrations), so a multi-MB design-tool export doesn't ship
// at full resolution for a ~240px display size. Uses sharp — reused across
// sessions whenever new illustration assets get added, not a one-off.
//
// Usage: node scripts/optimize-image.js <input> <output> [maxDimension]

import { statSync } from 'node:fs'
import sharp from 'sharp'

const [, , input, output, maxDimensionArg] = process.argv
const maxDimension = Number(maxDimensionArg) || 480

if (!input || !output) {
  console.error(
    'Usage: node scripts/optimize-image.js <input> <output> [maxDimension]',
  )
  process.exit(1)
}

const before = statSync(input).size

await sharp(input)
  .resize(maxDimension, maxDimension, { fit: 'inside' })
  .png({ compressionLevel: 9, palette: true })
  .toFile(output)

const after = statSync(output).size
console.log(
  `${input} -> ${output}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`,
)
