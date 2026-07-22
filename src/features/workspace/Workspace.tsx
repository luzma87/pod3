import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import cleanIcon from '../../assets/icons/013-clean.svg'
import Button from '../../components/ui/Button'
import { useDesignerStore } from '../../store/designerStore'
import { SQUARE_INCHES } from './constants'
import MajorGridLinesPicker, {
  type MajorGridInterval,
} from './MajorGridLinesPicker'
import QuiltGrid from './QuiltGrid'
import QuiltSizePicker from './QuiltSizePicker'
import ResetDialog from './ResetDialog'

function Workspace() {
  const { t } = useTranslation()
  const sizeKey = useDesignerStore((state) => state.sizeKey)
  const width = useDesignerStore((state) => state.width)
  const height = useDesignerStore((state) => state.height)
  const setSizeKey = useDesignerStore((state) => state.setSizeKey)
  const [majorGridInterval, setMajorGridInterval] =
    useState<MajorGridInterval>(0)
  const [resetOpen, setResetOpen] = useState(false)

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <QuiltSizePicker value={sizeKey} onChange={setSizeKey} />
        <MajorGridLinesPicker
          value={majorGridInterval}
          onChange={setMajorGridInterval}
        />
        <Button
          variant="secondary"
          className="gap-2"
          onClick={() => setResetOpen(true)}
        >
          <img src={cleanIcon} alt="" className="h-4 w-4" />
          {t('designer.resetButton')}
        </Button>
        <p className="text-sm text-ink-muted">
          {t('workspace.summary', {
            width,
            height,
            squareInches: SQUARE_INCHES,
          })}
        </p>
      </div>
      <div className="overflow-auto">
        <QuiltGrid
          width={width}
          height={height}
          majorGridInterval={majorGridInterval}
        />
      </div>
      <ResetDialog open={resetOpen} onOpenChange={setResetOpen} />
    </section>
  )
}

export default Workspace
