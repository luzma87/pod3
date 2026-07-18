import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SQUARE_INCHES } from './constants'
import QuiltGrid from './QuiltGrid'
import QuiltSizePicker from './QuiltSizePicker'
import { QUILT_SIZES, type QuiltSizeKey } from './quiltSizes'

const DEFAULT_SIZE_KEY: QuiltSizeKey = 'throw'

function Workspace() {
  const { t } = useTranslation()
  const [sizeKey, setSizeKey] = useState<QuiltSizeKey>(DEFAULT_SIZE_KEY)
  const size = QUILT_SIZES[sizeKey]

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <QuiltSizePicker value={sizeKey} onChange={setSizeKey} />
        <p className="text-sm text-ink-muted">
          {t('workspace.summary', {
            width: size.width,
            height: size.height,
            squareInches: SQUARE_INCHES,
          })}
        </p>
      </div>
      <div className="overflow-auto">
        <QuiltGrid width={size.width} height={size.height} />
      </div>
    </section>
  )
}

export default Workspace
