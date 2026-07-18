import { create } from 'zustand'
import type { QuiltBlock } from '../assets/blocks/allBlocks'

export interface PlacedBlock {
  instanceId: string
  block: QuiltBlock
  position: { x: number; y: number }
}

export interface PaintedSquare {
  position: { x: number; y: number }
  color: string
}

interface DesignerState {
  blockToPlace: QuiltBlock | null
  placedBlocks: PlacedBlock[]
  paintedSquares: PaintedSquare[]
  selectBlockToPlace: (block: QuiltBlock) => void
  placeBlockAt: (x: number, y: number) => void
  paintSquare: (x: number, y: number, color: string) => void
}

const initialState = {
  blockToPlace: null,
  placedBlocks: [],
  paintedSquares: [],
}

let nextInstanceId = 0

export const useDesignerStore = create<DesignerState>((set, get) => ({
  ...initialState,

  selectBlockToPlace: (block) => {
    set((state) => ({
      blockToPlace: state.blockToPlace?.id === block.id ? null : block,
    }))
  },

  placeBlockAt: (x, y) => {
    const { blockToPlace } = get()
    if (!blockToPlace) return
    nextInstanceId += 1
    set((state) => ({
      placedBlocks: [
        ...state.placedBlocks,
        {
          instanceId: `${blockToPlace.id}-${nextInstanceId}`,
          block: blockToPlace,
          position: { x, y },
        },
      ],
      blockToPlace: null,
    }))
  },

  paintSquare: (x, y, color) => {
    set((state) => ({
      paintedSquares: [
        ...state.paintedSquares.filter(
          (square) => square.position.x !== x || square.position.y !== y,
        ),
        { position: { x, y }, color },
      ],
    }))
  },
}))

export const resetDesignerStore = () => {
  nextInstanceId = 0
  useDesignerStore.setState(initialState)
}
