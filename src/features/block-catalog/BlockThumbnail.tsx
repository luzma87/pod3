import type { QuiltBlock } from '../../assets/blocks/allBlocks'

const THUMBNAIL_WIDTH = 72

interface BlockThumbnailProps {
  block: QuiltBlock
}

function BlockThumbnail({ block }: BlockThumbnailProps) {
  const { width, height } = block.size
  const thumbnailHeight = THUMBNAIL_WIDTH * (height / width)

  return (
    <div
      className="flex w-24 flex-col items-center gap-1 rounded-md border border-border bg-parchment-dark p-2"
      title={block.name}
    >
      {block.element({ width: THUMBNAIL_WIDTH, height: thumbnailHeight })}
      <span className="w-full truncate text-center text-xs text-ink-muted">
        {block.name}
      </span>
    </div>
  )
}

export default BlockThumbnail
