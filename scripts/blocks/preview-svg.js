#!/usr/bin/env node
// Renders a block component (.tsx) to a PNG so the artwork can actually be
// looked at before wiring up the catalog entry. Uses Vite's SSR module
// loader (same transform pipeline as `npm run dev`) so it handles anything
// the component does — JSX fragments, shared sub-trees, etc — not just
// simple static markup. macOS only (shells out to qlmanage for the
// thumbnail). See docs/adding-blocks.md.
//
// Usage: node scripts/blocks/preview-svg.js <path-to-component.tsx> [outDir]

import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import os from 'node:os'
import { createServer } from 'vite'
import { renderToStaticMarkup } from 'react-dom/server'

const input = process.argv[2]
const outDir = process.argv[3] || os.tmpdir()
if (!input) {
  console.error(
    'Usage: node scripts/blocks/preview-svg.js <path-to-component.tsx> [outDir]',
  )
  process.exit(1)
}

const absInput = path.resolve(input)
const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

try {
  const mod = await server.ssrLoadModule(absInput)
  const Component = mod.default
  const element = Component({ xmlns: 'http://www.w3.org/2000/svg' })
  const svg = renderToStaticMarkup(element)

  const base = path.basename(input).replace(/\.tsx$/, '')
  const svgPath = path.join(outDir, `${base}.preview.svg`)
  fs.writeFileSync(svgPath, svg)

  execFileSync('qlmanage', ['-t', '-s', '600', '-o', outDir, svgPath], {
    stdio: 'inherit',
  })
  console.log(
    `Preview PNG: ${path.join(outDir, path.basename(svgPath) + '.png')}`,
  )
} finally {
  await server.close()
}
