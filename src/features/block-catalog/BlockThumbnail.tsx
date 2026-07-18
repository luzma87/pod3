import type { QuiltBlock } from '../../assets/blocks/allBlocks'
import { useDesignerStore } from '../../store/designerStore'

const THUMBNAIL_WIDTH = 72

interface BlockThumbnailProps {
  block: QuiltBlock
}

function BlockThumbnail({ block }: BlockThumbnailProps) {
  const isSelected = useDesignerStore(
    (state) => state.blockToPlace?.id === block.id,
  )
  const selectBlockToPlace = useDesignerStore(
    (state) => state.selectBlockToPlace,
  )

  const { width, height } = block.size
  const thumbnailHeight = THUMBNAIL_WIDTH * (height / width)

  return (
    <button
      type="button"
      onClick={() => selectBlockToPlace(block)}
      aria-pressed={isSelected}
      title={block.name}
      className={`flex w-24 cursor-pointer flex-col items-center gap-1 rounded-md border p-2 ${
        isSelected
          ? 'border-maroon bg-gold-light'
          : 'border-border bg-parchment-dark'
      }`}
    >
      {block.element({ width: THUMBNAIL_WIDTH, height: thumbnailHeight })}
      <span className="w-full truncate text-center text-xs text-ink-muted">
        {block.name}
      </span>
    </button>
  )
}

export default BlockThumbnail
