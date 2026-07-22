import { describe, expect, it } from 'vitest'
import allBlocks from '../../assets/blocks/allBlocks'
import type { PlacedBlock } from '../../store/designerStore'
import { deserializeQuilt, serializeQuilt } from './serializeQuilt'

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

describe('deserializeQuilt', () => {
  it('round-trips a pod3-shaped quilt back to placed blocks/painted squares', () => {
    const serialized = serializeQuilt({
      quiltId: 'brave-swift-phoenix-42',
      placedBlocks: [placed],
      paintedSquares: [{ position: { x: 0, y: 0 }, color: '#F44336' }],
      sizeKey: 'king',
      width: 110,
      height: 108,
      user: { uid: 'user-1', isAnonymous: true },
    })

    const result = deserializeQuilt(serialized)

    expect(result).toEqual({
      placedBlocks: [placed],
      paintedSquares: [{ position: { x: 0, y: 0 }, color: '#F44336' }],
      sizeKey: 'king',
      width: 110,
      height: 108,
    })
  })

  it('drops placed blocks whose id no longer exists in the catalog', () => {
    const serialized = serializeQuilt({
      quiltId: 'brave-swift-phoenix-42',
      placedBlocks: [placed],
      paintedSquares: [],
      sizeKey: 'throw',
      width: 50,
      height: 65,
      user: { uid: 'user-1', isAnonymous: true },
    })
    serialized.blocks[0].blockId = 'no-longer-exists'

    const result = deserializeQuilt(serialized)

    expect(result?.placedBlocks).toEqual([])
  })

  it('converts a legacy pod2-shaped quilt (merged blocks/paint array, nested size)', () => {
    const legacy = {
      quiltName: 'eager-red-fox',
      size: { name: 'Throw', size: { w: 50, h: 65 } },
      blocks: [
        {
          block: { id: pixie.id },
          position: { x: 2, y: 3 },
          rotation: 90,
          isFlipped: true,
          newColors: { wings: { color: '#000000', type: 'fill' } },
        },
        { color: '#F44336', position: { x: 0, y: 0 }, width: 2, height: 1 },
      ],
    }

    const result = deserializeQuilt(legacy)

    expect(result?.sizeKey).toBe('throw')
    expect(result?.width).toBe(50)
    expect(result?.height).toBe(65)
    expect(result?.placedBlocks).toEqual([
      {
        instanceId: `${pixie.id}-legacy-0`,
        block: pixie,
        position: { x: 2, y: 3 },
        rotation: 90,
        isFlipped: true,
        colorOverrides: { wings: { color: '#000000', type: 'fill' } },
      },
    ])
    expect(result?.paintedSquares).toEqual(
      expect.arrayContaining([
        { position: { x: 0, y: 0 }, color: '#F44336' },
        { position: { x: 1, y: 0 }, color: '#F44336' },
      ]),
    )
    expect(result?.paintedSquares).toHaveLength(2)
  })

  it('legacy paint rectangles later in the array override earlier overlapping squares', () => {
    const legacy = {
      size: { size: { w: 10, h: 10 } },
      blocks: [
        { color: '#F44336', position: { x: 0, y: 0 }, width: 2, height: 2 },
        { color: '#2196F3', position: { x: 1, y: 1 }, width: 1, height: 1 },
      ],
    }

    const result = deserializeQuilt(legacy)

    const overlap = result?.paintedSquares.find(
      (square) => square.position.x === 1 && square.position.y === 1,
    )
    expect(overlap?.color).toBe('#2196F3')
    expect(result?.paintedSquares).toHaveLength(4)
  })

  it('falls back to the throw sizeKey when legacy dimensions match no known preset', () => {
    const legacy = { size: { size: { w: 999, h: 999 } }, blocks: [] }

    const result = deserializeQuilt(legacy)

    expect(result?.sizeKey).toBe('throw')
    expect(result?.width).toBe(999)
    expect(result?.height).toBe(999)
  })

  it('returns null for unrecognized data', () => {
    expect(deserializeQuilt(null)).toBeNull()
    expect(deserializeQuilt('not an object')).toBeNull()
    expect(deserializeQuilt({ size: {} })).toBeNull()
  })

  // Firebase Realtime Database silently drops empty objects/arrays on
  // write, so a quilt saved with no blocks, or a block saved with no
  // color overrides, comes back with those keys missing entirely rather
  // than as `[]`/`{}`.
  it('handles a pod3-shaped quilt with no blocks and a block with no color overrides (Firebase drops empty values)', () => {
    const noBlocksResult = deserializeQuilt({
      quiltName: 'brave-swift-phoenix-42',
      sizeKey: 'throw',
      width: 50,
      height: 65,
      // `blocks` and `paintedSquares` omitted, as Firebase would for an
      // empty quilt
    })
    expect(noBlocksResult?.placedBlocks).toEqual([])
    expect(noBlocksResult?.paintedSquares).toEqual([])

    const noOverridesResult = deserializeQuilt({
      quiltName: 'brave-swift-phoenix-42',
      sizeKey: 'throw',
      width: 50,
      height: 65,
      blocks: [
        {
          instanceId: `${pixie.id}-1`,
          blockId: pixie.id,
          category: pixie.category,
          position: { x: 1, y: 1 },
          rotation: 0,
          isFlipped: false,
          // colorOverrides omitted
        },
      ],
    })
    expect(noOverridesResult?.placedBlocks[0].colorOverrides).toEqual({})
  })

  it('handles a legacy pod2-shaped quilt with no blocks (Firebase drops the empty array)', () => {
    const result = deserializeQuilt({
      size: { size: { w: 50, h: 65 } },
      // `blocks` omitted
    })

    expect(result?.placedBlocks).toEqual([])
    expect(result?.paintedSquares).toEqual([])
    expect(result?.sizeKey).toBe('throw')
  })
})
