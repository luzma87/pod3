import { describe, expect, it } from 'vitest'
import allBlocks from './allBlocks'
import beastsBlocks from './beastsBlocks'
import customBlocks from './customBlocks'
import disneyBlocks from './disneyBlocks'
import otherBlocks from './otherBlocks'
import supplementalBlocks from './supplementalBlocks'
import topSidesBlocks from './topSidesBlocks'
import weeklyBlocks from './weeklyBlocks'

describe('allBlocks', () => {
  it('combines every shipped category except customBlocks (unused, matches pod2)', () => {
    const expectedLength =
      weeklyBlocks.length +
      supplementalBlocks.length +
      topSidesBlocks.length +
      otherBlocks.length +
      beastsBlocks.length +
      disneyBlocks.length

    expect(allBlocks.length).toBe(expectedLength)
    expect(allBlocks.length).toBeGreaterThan(customBlocks.length)
  })

  it('has unique ids across all combined blocks', () => {
    const ids = allBlocks.map((block) => block.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('tags each block with its source category', () => {
    const categories = new Set(allBlocks.map((block) => block.category))
    expect(categories).toEqual(
      new Set([
        'weekly',
        'supplemental',
        'topSides',
        'other',
        'beasts',
        'disney',
      ]),
    )

    const pixie = allBlocks.find((block) => block.name === 'Cornish Pixie')
    expect(pixie?.category).toBe('beasts')

    const mimbulus = allBlocks.find(
      (block) => block.name === 'Mimbulus Mimbletonia',
    )
    expect(mimbulus?.category).toBe('other')
  })
})
