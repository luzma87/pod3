import { useState, type CSSProperties, type MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useDesignerStore } from '../../store/designerStore'
import { SQUARE_INCHES, SQUARE_SIZE } from './constants'

interface QuiltGridProps {
  width: number
  height: number
}

function getCellFromEvent(event: MouseEvent<HTMLDivElement>) {
  const rect = event.currentTarget.getBoundingClientRect()
  const x = Math.floor((event.clientX - rect.left) / SQUARE_SIZE)
  const y = Math.floor((event.clientY - rect.top) / SQUARE_SIZE)
  return { x, y }
}

function QuiltGrid({ width, height }: QuiltGridProps) {
  const { t } = useTranslation()
  const columns = Math.floor(width / SQUARE_INCHES)
  const rows = Math.floor(height / SQUARE_INCHES)

  const blockToPlace = useDesignerStore((state) => state.blockToPlace)
  const placedBlocks = useDesignerStore((state) => state.placedBlocks)
  const placeBlockAt = useDesignerStore((state) => state.placeBlockAt)

  const [hoveredCell, setHoveredCell] = useState<{
    x: number
    y: number
  } | null>(null)

  const style = {
    '--square-size': `${SQUARE_SIZE}px`,
    width: columns * SQUARE_SIZE,
    height: rows * SQUARE_SIZE,
  } as CSSProperties

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!blockToPlace) return
    const { x, y } = getCellFromEvent(event)
    placeBlockAt(x, y)
  }

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!blockToPlace) return
    setHoveredCell(getCellFromEvent(event))
  }

  const isOutOfBounds =
    blockToPlace &&
    hoveredCell &&
    (hoveredCell.x + blockToPlace.size.width > columns ||
      hoveredCell.y + blockToPlace.size.height > rows)

  return (
    <div
      data-testid="quilt-grid"
      data-columns={columns}
      data-rows={rows}
      aria-label={t('workspace.gridAlt', { columns, rows })}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredCell(null)}
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
      {blockToPlace && hoveredCell && (
        <div
          data-testid="hover-preview"
          data-out-of-bounds={Boolean(isOutOfBounds)}
          className={`pointer-events-none absolute ${
            isOutOfBounds ? 'bg-maroon/40' : 'bg-gold/50'
          }`}
          style={{
            left: hoveredCell.x * SQUARE_SIZE,
            top: hoveredCell.y * SQUARE_SIZE,
            width: blockToPlace.size.width * SQUARE_SIZE,
            height: blockToPlace.size.height * SQUARE_SIZE,
          }}
        />
      )}
    </div>
  )
}

export default QuiltGrid
