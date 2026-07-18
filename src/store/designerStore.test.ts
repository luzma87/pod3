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

  it('selects a block to place, and deselects it if selected again', () => {
    useDesignerStore.getState().selectBlockToPlace(pixie)
    expect(useDesignerStore.getState().blockToPlace).toBe(pixie)

    useDesignerStore.getState().selectBlockToPlace(pixie)
    expect(useDesignerStore.getState().blockToPlace).toBeNull()
  })

  it('selecting a different block replaces the current selection', () => {
    useDesignerStore.getState().selectBlockToPlace(pixie)
    useDesignerStore.getState().selectBlockToPlace(mimbulus)
    expect(useDesignerStore.getState().blockToPlace).toBe(mimbulus)
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
})
