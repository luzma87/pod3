import { create } from 'zustand'
import type { QuiltBlock } from '../assets/blocks/allBlocks'

export interface ColorOverride {
  color: string
  type: 'fill' | 'stroke'
}

export interface PlacedBlock {
  instanceId: string
  block: QuiltBlock
  position: { x: number; y: number }
  rotation: number
  isFlipped: boolean
  colorOverrides: Record<string, ColorOverride>
}

export interface PendingBlock {
  block: QuiltBlock
  rotation: number
  isFlipped: boolean
  colorOverrides: Record<string, ColorOverride>
}

export interface PaintedSquare {
  position: { x: number; y: number }
  color: string
}

interface DesignerState {
  blockToPlace: PendingBlock | null
  placedBlocks: PlacedBlock[]
  paintedSquares: PaintedSquare[]
  selectBlockToPlace: (block: QuiltBlock) => void
  placeBlockAt: (x: number, y: number) => void
  paintSquare: (x: number, y: number, color: string) => void
  deleteBlock: (instanceId: string) => void
  flipBlock: (instanceId: string) => void
  rotateBlock: (instanceId: string) => void
  grabBlock: (instanceId: string) => void
  setColorOverrides: (
    instanceId: string,
    colorOverrides: Record<string, ColorOverride>,
  ) => void
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
      blockToPlace:
        state.blockToPlace?.block.id === block.id
          ? null
          : { block, rotation: 0, isFlipped: false, colorOverrides: {} },
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
          instanceId: `${blockToPlace.block.id}-${nextInstanceId}`,
          block: blockToPlace.block,
          position: { x, y },
          rotation: blockToPlace.rotation,
          isFlipped: blockToPlace.isFlipped,
          colorOverrides: blockToPlace.colorOverrides,
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

  deleteBlock: (instanceId) => {
    set((state) => ({
      placedBlocks: state.placedBlocks.filter(
        (placed) => placed.instanceId !== instanceId,
      ),
    }))
  },

  flipBlock: (instanceId) => {
    set((state) => ({
      placedBlocks: state.placedBlocks.map((placed) =>
        placed.instanceId === instanceId
          ? { ...placed, isFlipped: !placed.isFlipped }
          : placed,
      ),
    }))
  },

  rotateBlock: (instanceId) => {
    set((state) => ({
      placedBlocks: state.placedBlocks.map((placed) =>
        placed.instanceId === instanceId
          ? { ...placed, rotation: (placed.rotation + 90) % 360 }
          : placed,
      ),
    }))
  },

  grabBlock: (instanceId) => {
    const { placedBlocks } = get()
    const grabbed = placedBlocks.find(
      (placed) => placed.instanceId === instanceId,
    )
    if (!grabbed) return
    set((state) => ({
      placedBlocks: state.placedBlocks.filter(
        (placed) => placed.instanceId !== instanceId,
      ),
      blockToPlace: {
        block: grabbed.block,
        rotation: grabbed.rotation,
        isFlipped: grabbed.isFlipped,
        colorOverrides: grabbed.colorOverrides,
      },
    }))
  },

  setColorOverrides: (instanceId, colorOverrides) => {
    set((state) => ({
      placedBlocks: state.placedBlocks.map((placed) =>
        placed.instanceId === instanceId
          ? { ...placed, colorOverrides }
          : placed,
      ),
    }))
  },
}))

export const resetDesignerStore = () => {
  nextInstanceId = 0
  useDesignerStore.setState(initialState)
}
