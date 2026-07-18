import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import beastsBlocks from './beastsBlocks'
import customBlocks from './customBlocks'
import disneyBlocks from './disneyBlocks'
import otherBlocks from './otherBlocks'
import supplementalBlocks from './supplementalBlocks'
import topSidesBlocks from './topSidesBlocks'
import weeklyBlocks from './weeklyBlocks'

const categories = {
  beastsBlocks,
  customBlocks,
  disneyBlocks,
  otherBlocks,
  supplementalBlocks,
  topSidesBlocks,
  weeklyBlocks,
}

describe('ported block catalog', () => {
  Object.entries(categories).forEach(([name, blocks]) => {
    it(`${name} has at least one block with a name, size, and element`, () => {
      expect(blocks.length).toBeGreaterThan(0)
      blocks.forEach((block) => {
        expect(block.id).toBeTruthy()
        expect(block.name).toBeTruthy()
        expect(block.size.width).toBeGreaterThan(0)
        expect(block.size.height).toBeGreaterThan(0)
      })
    })

    it(`${name} renders its first block's SVG without error`, () => {
      const { container } = render(blocks[0].element({}))
      expect(container.querySelector('svg')).toBeInTheDocument()
    })
  })
})
