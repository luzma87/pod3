import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import BlockCatalog from '../../features/block-catalog/BlockCatalog'
import Workspace from '../../features/workspace/Workspace'

function DesignerPage() {
  const { t } = useTranslation()
  const { quiltId } = useParams()

  return (
    <div className="flex">
      <BlockCatalog />
      <main className="flex-1 p-8">
        <h1 className="font-display text-3xl text-maroon">{t('app.title')}</h1>
        <p className="mt-2 text-ink-muted">
          {quiltId
            ? t('designer.quiltLoaded', { quiltId })
            : t('designer.noQuiltLoaded')}
        </p>
        <div className="mt-6">
          <Workspace />
        </div>
      </main>
    </div>
  )
}

export default DesignerPage
