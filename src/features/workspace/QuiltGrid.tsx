import { useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/ui/Button'
import Dialog from '../../components/ui/Dialog'
import { useDesignerStore } from '../../store/designerStore'
import ColorSwatchPicker from './ColorSwatchPicker'
import { SQUARE_INCHES, SQUARE_SIZE } from './constants'
import PlacedBlockView from './PlacedBlockView'
import RecolorDialog from './RecolorDialog'

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
  const paintRectangle = useDesignerStore((state) => state.paintRectangle)
  const eraseSquares = useDesignerStore((state) => state.eraseSquares)
  const setColorOverrides = useDesignerStore((state) => state.setColorOverrides)

  const [hoveredCell, setHoveredCell] = useState<{
    x: number
    y: number
  } | null>(null)
  const [dragAnchor, setDragAnchor] = useState<{
    x: number
    y: number
  } | null>(null)
  const draggedRef = useRef(false)
  const [paintTarget, setPaintTarget] = useState<{
    x0: number
    y0: number
    x1: number
    y1: number
  } | null>(null)
  const [recolorInstanceId, setRecolorInstanceId] = useState<string | null>(
    null,
  )

  const style = {
    '--square-size': `${SQUARE_SIZE}px`,
    width: columns * SQUARE_SIZE,
    height: rows * SQUARE_SIZE,
  } as CSSProperties

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const cell = getCellFromEvent(event)
    if (blockToPlace) {
      placeBlockAt(cell.x, cell.y)
    } else if (!draggedRef.current) {
      setPaintTarget({ x0: cell.x, y0: cell.y, x1: cell.x, y1: cell.y })
    }
    draggedRef.current = false
  }

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (blockToPlace) return
    draggedRef.current = false
    setDragAnchor(getCellFromEvent(event))
  }

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const cell = getCellFromEvent(event)
    setHoveredCell(cell)
    if (dragAnchor && (cell.x !== dragAnchor.x || cell.y !== dragAnchor.y)) {
      draggedRef.current = true
    }
  }

  const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
    if (!dragAnchor) return
    if (draggedRef.current) {
      const end = getCellFromEvent(event)
      setPaintTarget({
        x0: Math.min(dragAnchor.x, end.x),
        y0: Math.min(dragAnchor.y, end.y),
        x1: Math.max(dragAnchor.x, end.x),
        y1: Math.max(dragAnchor.y, end.y),
      })
    }
    setDragAnchor(null)
  }

  const isOutOfBounds =
    blockToPlace &&
    hoveredCell &&
    (hoveredCell.x + blockToPlace.block.size.width > columns ||
      hoveredCell.y + blockToPlace.block.size.height > rows)

  const recolorTarget =
    placedBlocks.find((placed) => placed.instanceId === recolorInstanceId) ??
    null

  return (
    <div
      data-testid="quilt-grid"
      data-columns={columns}
      data-rows={rows}
      aria-label={t('workspace.gridAlt', { columns, rows })}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        setHoveredCell(null)
        setDragAnchor(null)
      }}
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
        <PlacedBlockView
          key={placed.instanceId}
          placed={placed}
          onRecolor={() => setRecolorInstanceId(placed.instanceId)}
        />
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
            width: blockToPlace.block.size.width * SQUARE_SIZE,
            height: blockToPlace.block.size.height * SQUARE_SIZE,
          }}
        />
      )}
      {!blockToPlace &&
        !paintTarget &&
        hoveredCell &&
        (() => {
          const anchor = dragAnchor ?? hoveredCell
          const previewColumns = Math.abs(hoveredCell.x - anchor.x) + 1
          const previewRows = Math.abs(hoveredCell.y - anchor.y) + 1
          return (
            <div
              data-testid="paint-hover-preview"
              className="pointer-events-none absolute flex items-center justify-center bg-gold/50"
              style={{
                left: Math.min(hoveredCell.x, anchor.x) * SQUARE_SIZE,
                top: Math.min(hoveredCell.y, anchor.y) * SQUARE_SIZE,
                width: previewColumns * SQUARE_SIZE,
                height: previewRows * SQUARE_SIZE,
              }}
            >
              {dragAnchor && (
                <span className="rounded bg-ink/70 px-1 text-xs text-parchment">
                  {t('workspace.paintPreviewSize', {
                    columns: previewColumns,
                    rows: previewRows,
                  })}
                </span>
              )}
            </div>
          )
        })()}
      <Dialog
        open={paintTarget !== null}
        onOpenChange={(open) => {
          if (!open) setPaintTarget(null)
        }}
        title={t('workspace.paintDialogTitle')}
      >
        <ColorSwatchPicker
          onSelect={(color) => {
            if (paintTarget) {
              paintRectangle(
                paintTarget.x0,
                paintTarget.y0,
                paintTarget.x1,
                paintTarget.y1,
                color,
              )
            }
            setPaintTarget(null)
          }}
        />
        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              if (paintTarget) {
                eraseSquares(
                  paintTarget.x0,
                  paintTarget.y0,
                  paintTarget.x1,
                  paintTarget.y1,
                )
              }
              setPaintTarget(null)
            }}
          >
            {t('workspace.paintErase')}
          </Button>
          <Button variant="secondary" onClick={() => setPaintTarget(null)}>
            {t('workspace.paintCancel')}
          </Button>
        </div>
      </Dialog>
      <RecolorDialog
        placed={recolorTarget}
        onSave={(overrides) => {
          if (recolorInstanceId) setColorOverrides(recolorInstanceId, overrides)
          setRecolorInstanceId(null)
        }}
        onClose={() => setRecolorInstanceId(null)}
      />
    </div>
  )
}

export default QuiltGrid
