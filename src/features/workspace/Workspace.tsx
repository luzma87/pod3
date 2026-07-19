import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/ui/Button'
import { SQUARE_INCHES } from './constants'
import MajorGridLinesPicker, {
  type MajorGridInterval,
} from './MajorGridLinesPicker'
import QuiltGrid from './QuiltGrid'
import QuiltSizePicker from './QuiltSizePicker'
import { QUILT_SIZES, type QuiltSizeKey } from './quiltSizes'
import ResetDialog from './ResetDialog'

const DEFAULT_SIZE_KEY: QuiltSizeKey = 'throw'

function Workspace() {
  const { t } = useTranslation()
  const [sizeKey, setSizeKey] = useState<QuiltSizeKey>(DEFAULT_SIZE_KEY)
  const [majorGridInterval, setMajorGridInterval] =
    useState<MajorGridInterval>(0)
  const [resetOpen, setResetOpen] = useState(false)
  const size = QUILT_SIZES[sizeKey]

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <QuiltSizePicker value={sizeKey} onChange={setSizeKey} />
        <MajorGridLinesPicker
          value={majorGridInterval}
          onChange={setMajorGridInterval}
        />
        <Button variant="secondary" onClick={() => setResetOpen(true)}>
          {t('designer.resetButton')}
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <p className="text-sm text-ink-muted">
          {t('workspace.summary', {
            width: size.width,
            height: size.height,
            squareInches: SQUARE_INCHES,
          })}
        </p>
      </div>
      <div className="overflow-auto">
        <QuiltGrid
          width={size.width}
          height={size.height}
          majorGridInterval={majorGridInterval}
        />
      </div>
      <ResetDialog open={resetOpen} onOpenChange={setResetOpen} />
    </section>
  )
}

export default Workspace
