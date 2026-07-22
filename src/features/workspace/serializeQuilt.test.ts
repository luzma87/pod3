import { describe, expect, it } from 'vitest'
import allBlocks from '../../assets/blocks/allBlocks'
import type { PlacedBlock } from '../../store/designerStore'
import { serializeQuilt } from './serializeQuilt'

const pixie = allBlocks.find((block) => block.name === 'Cornish Pixie')!

const placed: PlacedBlock = {
  instanceId: `${pixie.id}-1`,
  block: pixie,
  position: { x: 2, y: 3 },
  rotation: 90,
  isFlipped: true,
  colorOverrides: { wings: { color: '#000000', type: 'fill' } },
}

describe('serializeQuilt', () => {
  it('maps placed blocks to their id/category instead of the full block object', () => {
    const result = serializeQuilt({
      quiltId: 'brave-swift-phoenix-42',
      placedBlocks: [placed],
      paintedSquares: [],
      sizeKey: 'throw',
      width: 50,
      height: 65,
      user: { uid: 'user-1', isAnonymous: true },
    })

    expect(result.blocks).toEqual([
      {
        instanceId: placed.instanceId,
        blockId: pixie.id,
        category: pixie.category,
        position: { x: 2, y: 3 },
        rotation: 90,
        isFlipped: true,
        colorOverrides: { wings: { color: '#000000', type: 'fill' } },
      },
    ])
    expect(result.blocks[0]).not.toHaveProperty('block')
  })

  it('carries the quilt id, size, dimensions, painted squares, and user through as-is', () => {
    const result = serializeQuilt({
      quiltId: 'brave-swift-phoenix-42',
      placedBlocks: [],
      paintedSquares: [{ position: { x: 0, y: 0 }, color: '#F44336' }],
      sizeKey: 'king',
      width: 110,
      height: 108,
      user: { uid: 'user-1', isAnonymous: true },
    })

    expect(result).toMatchObject({
      quiltName: 'brave-swift-phoenix-42',
      sizeKey: 'king',
      width: 110,
      height: 108,
      paintedSquares: [{ position: { x: 0, y: 0 }, color: '#F44336' }],
      quiltUser: { id: 'user-1', anonymous: true },
    })
  })
})
