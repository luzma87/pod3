import type { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { SQUARE_INCHES, SQUARE_SIZE } from './constants'

interface QuiltGridProps {
  width: number
  height: number
}

function QuiltGrid({ width, height }: QuiltGridProps) {
  const { t } = useTranslation()
  const columns = Math.floor(width / SQUARE_INCHES)
  const rows = Math.floor(height / SQUARE_INCHES)

  const style = {
    '--square-size': `${SQUARE_SIZE}px`,
    width: columns * SQUARE_SIZE,
    height: rows * SQUARE_SIZE,
  } as CSSProperties

  return (
    <div
      data-testid="quilt-grid"
      data-columns={columns}
      data-rows={rows}
      role="img"
      aria-label={t('workspace.gridAlt', { columns, rows })}
      className="quilt-grid-lines box-content border border-border bg-parchment-dark"
      style={style}
    />
  )
}

export default QuiltGrid
