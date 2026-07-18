import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import Button from '../../components/ui/Button'
import BlockCatalog from '../../features/block-catalog/BlockCatalog'
import ResetDialog from '../../features/workspace/ResetDialog'
import Workspace from '../../features/workspace/Workspace'
import InfoDialog from '../InfoDialog'

function DesignerPage() {
  const { t } = useTranslation()
  const { quiltId } = useParams()
  const [infoOpen, setInfoOpen] = useState(false)
  const [resetOpen, setResetOpen] = useState(false)

  return (
    <div className="flex">
      <BlockCatalog />
      <main className="flex-1 p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-3xl text-maroon">
            {t('app.title')}
          </h1>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setInfoOpen(true)}>
              {t('designer.infoButton')}
            </Button>
            <Button variant="secondary" onClick={() => setResetOpen(true)}>
              {t('designer.resetButton')}
            </Button>
          </div>
        </div>
        <p className="mt-2 text-ink-muted">
          {quiltId
            ? t('designer.quiltLoaded', { quiltId })
            : t('designer.noQuiltLoaded')}
        </p>
        <div className="mt-6">
          <Workspace />
        </div>
      </main>
      <InfoDialog open={infoOpen} onOpenChange={setInfoOpen} />
      <ResetDialog open={resetOpen} onOpenChange={setResetOpen} />
    </div>
  )
}

export default DesignerPage
