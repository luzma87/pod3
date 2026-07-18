import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import BlockCatalog from '../../features/block-catalog/BlockCatalog'
import Workspace from '../../features/workspace/Workspace'

function DesignerPage() {
  const { t } = useTranslation()
  const { quiltId } = useParams()

  return (
    <div className="flex h-full">
      <BlockCatalog />
      <main className="flex-1 overflow-y-auto p-8">
        <p className="text-ink-muted">
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
