import { describe, expect, it } from 'vitest'
import allBlocks from '../assets/blocks/allBlocks'
import { resetDesignerStore, useDesignerStore } from './designerStore'

const pixie = allBlocks.find((block) => block.name === 'Cornish Pixie')!
const mimbulus = allBlocks.find(
  (block) => block.name === 'Mimbulus Mimbletonia',
)!

describe('designerStore', () => {
  it('starts with no block selected and nothing placed', () => {
    const state = useDesignerStore.getState()
    expect(state.blockToPlace).toBeNull()
    expect(state.placedBlocks).toEqual([])
  })

  it('selects a block to place (with default rotation/flip/color state), and deselects it if selected again', () => {
    useDesignerStore.getState().selectBlockToPlace(pixie)
    expect(useDesignerStore.getState().blockToPlace).toMatchObject({
      block: pixie,
      rotation: 0,
      isFlipped: false,
      colorOverrides: {},
    })

    useDesignerStore.getState().selectBlockToPlace(pixie)
    expect(useDesignerStore.getState().blockToPlace).toBeNull()
  })

  it('selecting a different block replaces the current selection', () => {
    useDesignerStore.getState().selectBlockToPlace(pixie)
    useDesignerStore.getState().selectBlockToPlace(mimbulus)
    expect(useDesignerStore.getState().blockToPlace?.block).toBe(mimbulus)
  })

  it('does nothing when placing with no block selected', () => {
    useDesignerStore.getState().placeBlockAt(2, 3)
    expect(useDesignerStore.getState().placedBlocks).toEqual([])
  })

  it('places the selected block at the given position and clears the selection', () => {
    useDesignerStore.getState().selectBlockToPlace(pixie)
    useDesignerStore.getState().placeBlockAt(2, 3)

    const state = useDesignerStore.getState()
    expect(state.blockToPlace).toBeNull()
    expect(state.placedBlocks).toHaveLength(1)
    expect(state.placedBlocks[0]).toMatchObject({
      block: pixie,
      position: { x: 2, y: 3 },
      rotation: 0,
      isFlipped: false,
      colorOverrides: {},
    })
  })

  it('gives each placement a unique instanceId, even for the same block', () => {
    useDesignerStore.getState().selectBlockToPlace(pixie)
    useDesignerStore.getState().placeBlockAt(0, 0)
    useDesignerStore.getState().selectBlockToPlace(pixie)
    useDesignerStore.getState().placeBlockAt(1, 1)

    const [first, second] = useDesignerStore.getState().placedBlocks
    expect(first.instanceId).not.toBe(second.instanceId)
  })

  it('starts with nothing painted', () => {
    expect(useDesignerStore.getState().paintedSquares).toEqual([])
  })

  it('paints a square at the given position', () => {
    useDesignerStore.getState().paintSquare(2, 3, '#F44336')
    expect(useDesignerStore.getState().paintedSquares).toEqual([
      { position: { x: 2, y: 3 }, color: '#F44336' },
    ])
  })

  it('repainting the same square replaces its color instead of stacking', () => {
    useDesignerStore.getState().paintSquare(2, 3, '#F44336')
    useDesignerStore.getState().paintSquare(2, 3, '#2196F3')

    const { paintedSquares } = useDesignerStore.getState()
    expect(paintedSquares).toHaveLength(1)
    expect(paintedSquares[0].color).toBe('#2196F3')
  })

  it('painting different squares keeps them independent', () => {
    useDesignerStore.getState().paintSquare(0, 0, '#F44336')
    useDesignerStore.getState().paintSquare(1, 0, '#2196F3')

    expect(useDesignerStore.getState().paintedSquares).toHaveLength(2)
  })

  it('paints every square within a rectangle', () => {
    useDesignerStore.getState().paintRectangle(1, 2, 2, 3, '#F44336')

    const { paintedSquares } = useDesignerStore.getState()
    expect(paintedSquares).toHaveLength(4)
    expect(paintedSquares).toEqual(
      expect.arrayContaining([
        { position: { x: 1, y: 2 }, color: '#F44336' },
        { position: { x: 2, y: 2 }, color: '#F44336' },
        { position: { x: 1, y: 3 }, color: '#F44336' },
        { position: { x: 2, y: 3 }, color: '#F44336' },
      ]),
    )
  })

  it('paints a single square when the rectangle is 1x1', () => {
    useDesignerStore.getState().paintRectangle(2, 3, 2, 3, '#F44336')

    expect(useDesignerStore.getState().paintedSquares).toEqual([
      { position: { x: 2, y: 3 }, color: '#F44336' },
    ])
  })

  it('erases every painted square within a rectangle', () => {
    useDesignerStore.getState().paintRectangle(0, 0, 2, 2, '#F44336')

    // erases the bottom-right 2x2 overlap of the painted 3x3 block
    useDesignerStore.getState().eraseSquares(1, 1, 3, 3)

    const { paintedSquares } = useDesignerStore.getState()
    expect(paintedSquares).toHaveLength(5)
    expect(paintedSquares).toEqual(
      expect.arrayContaining([
        { position: { x: 0, y: 0 }, color: '#F44336' },
        { position: { x: 1, y: 0 }, color: '#F44336' },
        { position: { x: 2, y: 0 }, color: '#F44336' },
        { position: { x: 0, y: 1 }, color: '#F44336' },
        { position: { x: 0, y: 2 }, color: '#F44336' },
      ]),
    )
  })

  it('erasing a rectangle that overlaps a placed block only clears paint, leaving the block alone', () => {
    useDesignerStore.getState().paintRectangle(0, 0, 3, 3, '#F44336')
    useDesignerStore.getState().selectBlockToPlace(pixie)
    useDesignerStore.getState().placeBlockAt(1, 1)

    useDesignerStore.getState().eraseSquares(0, 0, 3, 3)

    const state = useDesignerStore.getState()
    expect(state.paintedSquares).toEqual([])
    expect(state.placedBlocks).toHaveLength(1)
    expect(state.placedBlocks[0]).toMatchObject({
      block: pixie,
      position: { x: 1, y: 1 },
    })
  })

  it('erasing squares that were never painted does nothing', () => {
    useDesignerStore.getState().paintSquare(0, 0, '#F44336')

    useDesignerStore.getState().eraseSquares(5, 5, 6, 6)

    expect(useDesignerStore.getState().paintedSquares).toEqual([
      { position: { x: 0, y: 0 }, color: '#F44336' },
    ])
  })

  it('repainting an overlapping rectangle replaces overlapping squares instead of stacking', () => {
    useDesignerStore.getState().paintRectangle(0, 0, 1, 1, '#F44336')
    useDesignerStore.getState().paintRectangle(1, 1, 2, 2, '#2196F3')

    const { paintedSquares } = useDesignerStore.getState()
    expect(paintedSquares).toHaveLength(7)
    const overlap = paintedSquares.find(
      (square) => square.position.x === 1 && square.position.y === 1,
    )
    expect(overlap?.color).toBe('#2196F3')
  })

  it('deletes a placed block by instanceId', () => {
    useDesignerStore.getState().selectBlockToPlace(pixie)
    useDesignerStore.getState().placeBlockAt(2, 3)
    const [placed] = useDesignerStore.getState().placedBlocks

    useDesignerStore.getState().deleteBlock(placed.instanceId)

    expect(useDesignerStore.getState().placedBlocks).toEqual([])
  })

  it('flips a placed block, toggling back and forth', () => {
    useDesignerStore.getState().selectBlockToPlace(pixie)
    useDesignerStore.getState().placeBlockAt(2, 3)
    const [placed] = useDesignerStore.getState().placedBlocks

    useDesignerStore.getState().flipBlock(placed.instanceId)
    expect(useDesignerStore.getState().placedBlocks[0].isFlipped).toBe(true)

    useDesignerStore.getState().flipBlock(placed.instanceId)
    expect(useDesignerStore.getState().placedBlocks[0].isFlipped).toBe(false)
  })

  it('rotates a placed block by 90 degrees, wrapping past 270', () => {
    useDesignerStore.getState().selectBlockToPlace(pixie)
    useDesignerStore.getState().placeBlockAt(2, 3)
    const [placed] = useDesignerStore.getState().placedBlocks

    useDesignerStore.getState().rotateBlock(placed.instanceId)
    useDesignerStore.getState().rotateBlock(placed.instanceId)
    useDesignerStore.getState().rotateBlock(placed.instanceId)
    expect(useDesignerStore.getState().placedBlocks[0].rotation).toBe(270)

    useDesignerStore.getState().rotateBlock(placed.instanceId)
    expect(useDesignerStore.getState().placedBlocks[0].rotation).toBe(0)
  })

  it('grabbing a placed block removes it and selects it as pending, preserving its customizations', () => {
    useDesignerStore.getState().selectBlockToPlace(pixie)
    useDesignerStore.getState().placeBlockAt(2, 3)
    const [placed] = useDesignerStore.getState().placedBlocks
    useDesignerStore.getState().flipBlock(placed.instanceId)
    useDesignerStore.getState().rotateBlock(placed.instanceId)
    useDesignerStore.getState().setColorOverrides(placed.instanceId, {
      wings: { color: '#000000', type: 'fill' },
    })

    useDesignerStore.getState().grabBlock(placed.instanceId)

    const state = useDesignerStore.getState()
    expect(state.placedBlocks).toEqual([])
    expect(state.blockToPlace).toMatchObject({
      block: pixie,
      isFlipped: true,
      rotation: 90,
      colorOverrides: { wings: { color: '#000000', type: 'fill' } },
    })
  })

  it('re-placing a grabbed block keeps its customizations on the new instance', () => {
    useDesignerStore.getState().selectBlockToPlace(pixie)
    useDesignerStore.getState().placeBlockAt(2, 3)
    const [placed] = useDesignerStore.getState().placedBlocks
    useDesignerStore.getState().flipBlock(placed.instanceId)
    useDesignerStore.getState().grabBlock(placed.instanceId)

    useDesignerStore.getState().placeBlockAt(5, 6)

    const [movedBlock] = useDesignerStore.getState().placedBlocks
    expect(movedBlock).toMatchObject({
      block: pixie,
      position: { x: 5, y: 6 },
      isFlipped: true,
    })
  })

  it('sets color overrides on a placed block', () => {
    useDesignerStore.getState().selectBlockToPlace(pixie)
    useDesignerStore.getState().placeBlockAt(2, 3)
    const [placed] = useDesignerStore.getState().placedBlocks

    useDesignerStore.getState().setColorOverrides(placed.instanceId, {
      background: { color: '#F44336', type: 'fill' },
    })

    expect(useDesignerStore.getState().placedBlocks[0].colorOverrides).toEqual({
      background: { color: '#F44336', type: 'fill' },
    })
  })

  it('starts with the default quilt size and no quilt id', () => {
    const state = useDesignerStore.getState()
    expect(state.sizeKey).toBe('throw')
    expect(state.width).toBe(50)
    expect(state.height).toBe(65)
    expect(state.quiltId).toBeNull()
  })

  it('setSizeKey updates the key and its actual dimensions together', () => {
    useDesignerStore.getState().setSizeKey('babyHorizontal')

    const state = useDesignerStore.getState()
    expect(state.sizeKey).toBe('babyHorizontal')
    expect(state.width).toBe(40)
    expect(state.height).toBe(30)
  })

  it('setQuiltId sets the current quilt id', () => {
    useDesignerStore.getState().setQuiltId('brave-swift-phoenix-42')
    expect(useDesignerStore.getState().quiltId).toBe('brave-swift-phoenix-42')
  })

  it('loadDesign replaces the whole design and clears any pending block', () => {
    useDesignerStore.getState().selectBlockToPlace(pixie)

    const loadedPlaced = {
      instanceId: `${pixie.id}-7`,
      block: pixie,
      position: { x: 1, y: 1 },
      rotation: 90,
      isFlipped: true,
      colorOverrides: {},
    }
    useDesignerStore.getState().loadDesign('brave-swift-phoenix-42', {
      placedBlocks: [loadedPlaced],
      paintedSquares: [{ position: { x: 0, y: 0 }, color: '#F44336' }],
      sizeKey: 'king',
      width: 110,
      height: 108,
    })

    const state = useDesignerStore.getState()
    expect(state.quiltId).toBe('brave-swift-phoenix-42')
    expect(state.blockToPlace).toBeNull()
    expect(state.placedBlocks).toEqual([loadedPlaced])
    expect(state.paintedSquares).toEqual([
      { position: { x: 0, y: 0 }, color: '#F44336' },
    ])
    expect(state.sizeKey).toBe('king')
    expect(state.width).toBe(110)
    expect(state.height).toBe(108)
  })

  it('loadDesign advances the instance-id counter past the highest loaded suffix', () => {
    useDesignerStore.getState().loadDesign('brave-swift-phoenix-42', {
      placedBlocks: [
        {
          instanceId: `${pixie.id}-7`,
          block: pixie,
          position: { x: 1, y: 1 },
          rotation: 0,
          isFlipped: false,
          colorOverrides: {},
        },
      ],
      paintedSquares: [],
      sizeKey: 'throw',
      width: 50,
      height: 65,
    })

    useDesignerStore.getState().selectBlockToPlace(pixie)
    useDesignerStore.getState().placeBlockAt(2, 2)

    const newlyPlaced = useDesignerStore
      .getState()
      .placedBlocks.find((placed) => placed.position.x === 2)!
    expect(newlyPlaced.instanceId).toBe(`${pixie.id}-8`)
  })

  it('reset clears the design but preserves the chosen quilt size', () => {
    useDesignerStore.getState().setSizeKey('king')
    useDesignerStore.getState().setQuiltId('brave-swift-phoenix-42')
    useDesignerStore.getState().selectBlockToPlace(pixie)
    useDesignerStore.getState().placeBlockAt(2, 3)
    useDesignerStore.getState().paintSquare(0, 0, '#F44336')

    resetDesignerStore()

    const state = useDesignerStore.getState()
    expect(state.placedBlocks).toEqual([])
    expect(state.paintedSquares).toEqual([])
    expect(state.blockToPlace).toBeNull()
    expect(state.quiltId).toBeNull()
    expect(state.sizeKey).toBe('king')
    expect(state.width).toBe(110)
    expect(state.height).toBe(108)
  })
})
