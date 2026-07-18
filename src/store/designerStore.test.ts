import { describe, expect, it } from 'vitest'
import allBlocks from '../assets/blocks/allBlocks'
import { useDesignerStore } from './designerStore'

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
})
