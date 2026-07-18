import type { CSSProperties, MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useDesignerStore } from '../../store/designerStore'
import { SQUARE_INCHES, SQUARE_SIZE } from './constants'

interface QuiltGridProps {
  width: number
  height: number
}

function QuiltGrid({ width, height }: QuiltGridProps) {
  const { t } = useTranslation()
  const columns = Math.floor(width / SQUARE_INCHES)
  const rows = Math.floor(height / SQUARE_INCHES)

  const blockToPlace = useDesignerStore((state) => state.blockToPlace)
  const placedBlocks = useDesignerStore((state) => state.placedBlocks)
  const placeBlockAt = useDesignerStore((state) => state.placeBlockAt)

  const style = {
    '--square-size': `${SQUARE_SIZE}px`,
    width: columns * SQUARE_SIZE,
    height: rows * SQUARE_SIZE,
  } as CSSProperties

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!blockToPlace) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = Math.floor((event.clientX - rect.left) / SQUARE_SIZE)
    const y = Math.floor((event.clientY - rect.top) / SQUARE_SIZE)
    placeBlockAt(x, y)
  }

  return (
    <div
      data-testid="quilt-grid"
      data-columns={columns}
      data-rows={rows}
      aria-label={t('workspace.gridAlt', { columns, rows })}
      onClick={handleClick}
      className={`quilt-grid-lines relative box-content overflow-hidden border border-border bg-parchment-dark ${
        blockToPlace ? 'cursor-crosshair' : ''
      }`}
      style={style}
    >
      {placedBlocks.map((placed) => (
        <div
          key={placed.instanceId}
          title={placed.block.name}
          className="pointer-events-none absolute"
          style={{
            left: placed.position.x * SQUARE_SIZE,
            top: placed.position.y * SQUARE_SIZE,
          }}
        >
          {placed.block.element({
            width: placed.block.size.width * SQUARE_SIZE,
            height: placed.block.size.height * SQUARE_SIZE,
          })}
        </div>
      ))}
    </div>
  )
}

export default QuiltGrid
