import type { CategoryKey } from '../../assets/blocks/allBlocks'
import type {
  ColorOverride,
  PaintedSquare,
  PlacedBlock,
} from '../../store/designerStore'
import type { QuiltSizeKey } from './quiltSizes'

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
