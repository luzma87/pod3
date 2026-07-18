import { useTranslation } from 'react-i18next'
import type { QuiltBlock } from '../../assets/blocks/allBlocks'
import Tooltip from '../../components/ui/Tooltip'
import { useDesignerStore } from '../../store/designerStore'

const THUMBNAIL_WIDTH = 72

interface BlockThumbnailProps {
  block: QuiltBlock
}

function BlockThumbnail({ block }: BlockThumbnailProps) {
  const { t } = useTranslation()
  const isSelected = useDesignerStore(
    (state) => state.blockToPlace?.block.id === block.id,
  )
  const selectBlockToPlace = useDesignerStore(
    (state) => state.selectBlockToPlace,
  )

  const { width, height } = block.size
  const thumbnailHeight = THUMBNAIL_WIDTH * (height / width)

  return (
    <Tooltip
      content={
        <div className="flex flex-col gap-0.5">
          <p className="font-medium">{block.name}</p>
          <p>{t('catalog.tooltipSize', { width, height })}</p>
          {block.designer && (
            <p>{t('catalog.tooltipDesigner', { designer: block.designer })}</p>
          )}
        </div>
      }
    >
      <button
        type="button"
        onClick={() => selectBlockToPlace(block)}
        aria-pressed={isSelected}
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
    </Tooltip>
  )
}

export default BlockThumbnail
