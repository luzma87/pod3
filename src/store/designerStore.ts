import { create } from 'zustand'
import type { QuiltBlock } from '../assets/blocks/allBlocks'

export interface PlacedBlock {
  instanceId: string
  block: QuiltBlock
  position: { x: number; y: number }
}

interface DesignerState {
  blockToPlace: QuiltBlock | null
  placedBlocks: PlacedBlock[]
  selectBlockToPlace: (block: QuiltBlock) => void
  placeBlockAt: (x: number, y: number) => void
}

const initialState = {
  blockToPlace: null,
  placedBlocks: [],
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
}))

export const resetDesignerStore = () => {
  nextInstanceId = 0
  useDesignerStore.setState(initialState)
}
