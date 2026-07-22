import allBlocks from '../../assets/blocks/allBlocks'
import type { CategoryKey } from '../../assets/blocks/allBlocks'
import type {
  ColorOverride,
  PaintedSquare,
  PlacedBlock,
} from '../../store/designerStore'
import { QUILT_SIZES, type QuiltSizeKey } from './quiltSizes'

export interface SerializedPlacedBlock {
  instanceId: string
  blockId: string
  category: CategoryKey
  position: { x: number; y: number }
  rotation: number
  isFlipped: boolean
  colorOverrides: Record<string, ColorOverride>
}

export interface SerializedQuilt {
  quiltName: string
  sizeKey: QuiltSizeKey
  width: number
  height: number
  blocks: SerializedPlacedBlock[]
  paintedSquares: PaintedSquare[]
  quiltUser: { id: string; anonymous: boolean }
}

interface SerializeQuiltParams {
  quiltId: string
  placedBlocks: PlacedBlock[]
  paintedSquares: PaintedSquare[]
  sizeKey: QuiltSizeKey
  width: number
  height: number
  user: { uid: string; isAnonymous: boolean }
}

// `PlacedBlock.block` is a full `QuiltBlock`, which carries an `element`
// render function that isn't serializable. Store the id/category instead,
// so a future Load step can re-look the block up in `allBlocks`.
function serializePlacedBlock(placed: PlacedBlock): SerializedPlacedBlock {
  return {
    instanceId: placed.instanceId,
    blockId: placed.block.id,
    category: placed.block.category,
    position: placed.position,
    rotation: placed.rotation,
    isFlipped: placed.isFlipped,
    colorOverrides: placed.colorOverrides,
  }
}

export function serializeQuilt({
  quiltId,
  placedBlocks,
  paintedSquares,
  sizeKey,
  width,
  height,
  user,
}: SerializeQuiltParams): SerializedQuilt {
  return {
    quiltName: quiltId,
    sizeKey,
    width,
    height,
    blocks: placedBlocks.map(serializePlacedBlock),
    paintedSquares,
    quiltUser: { id: user.uid, anonymous: user.isAnonymous },
  }
}

export interface LoadedQuilt {
  placedBlocks: PlacedBlock[]
  paintedSquares: PaintedSquare[]
  sizeKey: QuiltSizeKey
  width: number
  height: number
}

function findBlock(id: string, category?: CategoryKey) {
  return allBlocks.find(
    (block) => block.id === id && (!category || block.category === category),
  )
}

function findSizeKeyForDimensions(width: number, height: number): QuiltSizeKey {
  const match = (
    Object.entries(QUILT_SIZES) as [
      QuiltSizeKey,
      (typeof QUILT_SIZES)[QuiltSizeKey],
    ][]
  ).find(([, size]) => size.width === width && size.height === height)
  return match ? match[0] : 'throw'
}

function isPod3Shape(raw: object): raw is SerializedQuilt {
  return 'sizeKey' in raw
}

function deserializePod3Quilt(raw: SerializedQuilt): LoadedQuilt {
  // Firebase Realtime Database silently drops empty objects/arrays on
  // write (there's no way to distinguish "empty" from "absent"), so
  // `blocks`, `paintedSquares`, and a block's `colorOverrides` can all
  // come back `undefined` even though they were `[]`/`{}` at save time.
  const placedBlocks = (raw.blocks ?? [])
    .map((entry): PlacedBlock | null => {
      const block = findBlock(entry.blockId, entry.category)
      if (!block) return null
      return {
        instanceId: entry.instanceId,
        block,
        position: entry.position,
        rotation: entry.rotation,
        isFlipped: entry.isFlipped,
        colorOverrides: entry.colorOverrides ?? {},
      }
    })
    .filter((block): block is PlacedBlock => block !== null)

  return {
    placedBlocks,
    paintedSquares: raw.paintedSquares ?? [],
    sizeKey: raw.sizeKey,
    width: raw.width,
    height: raw.height,
  }
}

// pod2's Firebase data at the same `/quilts/{id}` path predates pod3's
// rewrite and uses a different shape: `blocks` mixes placed-block entries
// (`{ block, position, rotation?, isFlipped?, newColors? }`) with painted
// rectangle entries (`{ color, position, width, height }`, one entry per
// paint action rather than per-square), and `size` is a nested
// `{ name, size: { w, h } }` object instead of a `sizeKey`. Converting
// this keeps old shared pod2 links working in pod3.
interface LegacyPlacedBlockEntry {
  block: { id: string }
  position: { x: number; y: number }
  rotation?: number
  isFlipped?: boolean
  newColors?: Record<string, ColorOverride>
}

interface LegacyPaintedRectEntry {
  color: string
  position: { x: number; y: number }
  width: number
  height: number
}

type LegacyEntry = LegacyPlacedBlockEntry | LegacyPaintedRectEntry

interface LegacyPod2Quilt {
  size?: { size?: { w: number; h: number } }
  blocks?: LegacyEntry[]
}

function isLegacyPaintedRectEntry(
  entry: LegacyEntry,
): entry is LegacyPaintedRectEntry {
  return 'color' in entry
}

function deserializeLegacyPod2Quilt(raw: LegacyPod2Quilt): LoadedQuilt | null {
  const width = raw.size?.size?.w
  const height = raw.size?.size?.h
  // Missing size info is the real "not a valid quilt" signal; an absent
  // `blocks` array just means Firebase dropped an empty one on write.
  if (!width || !height) return null

  const placedBlocks: PlacedBlock[] = []
  const paintedSquaresByPosition = new Map<string, PaintedSquare>()

  ;(raw.blocks ?? []).forEach((entry, index) => {
    if (isLegacyPaintedRectEntry(entry)) {
      for (let dx = 0; dx < entry.width; dx++) {
        for (let dy = 0; dy < entry.height; dy++) {
          const position = {
            x: entry.position.x + dx,
            y: entry.position.y + dy,
          }
          paintedSquaresByPosition.set(`${position.x},${position.y}`, {
            position,
            color: entry.color,
          })
        }
      }
      return
    }

    const block = findBlock(entry.block?.id)
    if (!block) return
    placedBlocks.push({
      instanceId: `${block.id}-legacy-${index}`,
      block,
      position: entry.position,
      rotation: entry.rotation ?? 0,
      isFlipped: entry.isFlipped ?? false,
      colorOverrides: entry.newColors ?? {},
    })
  })

  return {
    placedBlocks,
    paintedSquares: Array.from(paintedSquaresByPosition.values()),
    sizeKey: findSizeKeyForDimensions(width, height),
    width,
    height,
  }
}

export function deserializeQuilt(raw: unknown): LoadedQuilt | null {
  if (typeof raw !== 'object' || raw === null) return null
  return isPod3Shape(raw)
    ? deserializePod3Quilt(raw)
    : deserializeLegacyPod2Quilt(raw as LegacyPod2Quilt)
}
