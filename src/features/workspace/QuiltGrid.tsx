import { useState, type CSSProperties, type MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Dialog from '../../components/ui/Dialog'
import { useDesignerStore } from '../../store/designerStore'
import ColorSwatchPicker from './ColorSwatchPicker'
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
  const paintedSquares = useDesignerStore((state) => state.paintedSquares)
  const placeBlockAt = useDesignerStore((state) => state.placeBlockAt)
  const paintSquare = useDesignerStore((state) => state.paintSquare)

  const [hoveredCell, setHoveredCell] = useState<{
    x: number
    y: number
  } | null>(null)
  const [paintTarget, setPaintTarget] = useState<{
    x: number
    y: number
  } | null>(null)

  const style = {
    '--square-size': `${SQUARE_SIZE}px`,
    width: columns * SQUARE_SIZE,
    height: rows * SQUARE_SIZE,
  } as CSSProperties

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const cell = getCellFromEvent(event)
    if (blockToPlace) {
      placeBlockAt(cell.x, cell.y)
    } else {
      setPaintTarget(cell)
    }
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
      {paintedSquares.map((square) => (
        <div
          key={`${square.position.x}-${square.position.y}`}
          title={square.color}
          className="pointer-events-none absolute"
          style={{
            left: square.position.x * SQUARE_SIZE,
            top: square.position.y * SQUARE_SIZE,
            width: SQUARE_SIZE,
            height: SQUARE_SIZE,
            backgroundColor: square.color,
          }}
        />
      ))}
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
      <Dialog
        open={paintTarget !== null}
        onOpenChange={(open) => {
          if (!open) setPaintTarget(null)
        }}
        title={t('workspace.paintDialogTitle')}
      >
        <ColorSwatchPicker
          onSelect={(color) => {
            if (paintTarget) paintSquare(paintTarget.x, paintTarget.y, color)
            setPaintTarget(null)
          }}
        />
      </Dialog>
    </div>
  )
}

export default QuiltGrid
