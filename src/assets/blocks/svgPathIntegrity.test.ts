import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

// Regression test for a real corruption found in a ported block SVG: a
// className string ("wings-dark") had been spliced into the middle of a
// `d` path attribute's numeric data (01918CrestDurmstrang.tsx), which
// crashed the browser's SVG parser with no error boundary to catch it —
// jsdom doesn't validate path syntax, so a render-based test wouldn't
// catch this; checking the raw source text does.
const SVG_DIR = join(dirname(fileURLToPath(import.meta.url)), 'svg')
const VALID_PATH_DATA = /^[0-9MmLlHhVvCcSsQqTtAaZz\s.,eE-]+$/

function listTsxFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) return listTsxFiles(fullPath)
    return entry.name.endsWith('.tsx') ? [fullPath] : []
  })
}

describe('block SVG path data integrity', () => {
  it('every `d="..."` attribute in the ported block SVGs contains only valid path-data characters', () => {
    const offenders: string[] = []

    listTsxFiles(SVG_DIR).forEach((filePath) => {
      const content = readFileSync(filePath, 'utf-8')
      for (const match of content.matchAll(/\bd="([^"]*)"/g)) {
        const pathData = match[1]
        if (!VALID_PATH_DATA.test(pathData)) {
          offenders.push(`${filePath}: d="${pathData}"`)
        }
      }
    })

    expect(offenders).toEqual([])
  })
})
