import { create } from 'zustand'
import type { QuiltBlock } from '../assets/blocks/allBlocks'
import {
  QUILT_SIZES,
  type QuiltSizeKey,
} from '../features/workspace/quiltSizes'

const DEFAULT_SIZE_KEY: QuiltSizeKey = 'throw'

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
  sizeKey: QuiltSizeKey
  width: number
  height: number
  quiltId: string | null
  setSizeKey: (key: QuiltSizeKey) => void
  setQuiltId: (id: string) => void
  selectBlockToPlace: (block: QuiltBlock) => void
  placeBlockAt: (x: number, y: number) => void
  paintSquare: (x: number, y: number, color: string) => void
  paintRectangle: (
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    color: string,
  ) => void
  eraseSquares: (x0: number, y0: number, x1: number, y1: number) => void
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
  sizeKey: DEFAULT_SIZE_KEY,
  width: QUILT_SIZES[DEFAULT_SIZE_KEY].width,
  height: QUILT_SIZES[DEFAULT_SIZE_KEY].height,
  quiltId: null,
}

let nextInstanceId = 0

export const useDesignerStore = create<DesignerState>((set, get) => ({
  ...initialState,

  setSizeKey: (key) => {
    const { width, height } = QUILT_SIZES[key]
    set({ sizeKey: key, width, height })
  },

  setQuiltId: (id) => {
    set({ quiltId: id })
  },

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

  paintRectangle: (x0, y0, x1, y1, color) => {
    set((state) => {
      const inRect: PaintedSquare[] = []
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          inRect.push({ position: { x, y }, color })
        }
      }
      return {
        paintedSquares: [
          ...state.paintedSquares.filter(
            (square) =>
              square.position.x < x0 ||
              square.position.x > x1 ||
              square.position.y < y0 ||
              square.position.y > y1,
          ),
          ...inRect,
        ],
      }
    })
  },

  eraseSquares: (x0, y0, x1, y1) => {
    set((state) => ({
      paintedSquares: state.paintedSquares.filter(
        (square) =>
          square.position.x < x0 ||
          square.position.x > x1 ||
          square.position.y < y0 ||
          square.position.y > y1,
      ),
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
  // Reset (Evanesco) clears the design, but the user's chosen quilt size
  // isn't part of "the design" the way blocks/paint are — preserve it
  // across a reset instead of snapping back to the default size.
  const { sizeKey, width, height } = useDesignerStore.getState()
  useDesignerStore.setState({ ...initialState, sizeKey, width, height })
}
