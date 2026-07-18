import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Dialog from '../../components/ui/Dialog'

function DesignerPage() {
  const { t } = useTranslation()
  const { quiltId } = useParams()
  const [infoOpen, setInfoOpen] = useState(false)

  return (
    <main className="p-8">
      <h1 className="font-display text-3xl text-maroon">{t('app.title')}</h1>
      <Card className="mt-6 max-w-md">
        <p className="text-ink-muted">
          {quiltId
            ? t('designer.quiltLoaded', { quiltId })
            : t('designer.noQuiltLoaded')}
        </p>
        <div className="mt-4 flex gap-3">
          <Button onClick={() => setInfoOpen(true)}>
            {t('designer.openInfo')}
          </Button>
          <Button variant="secondary">{t('designer.secondary')}</Button>
        </div>
      </Card>
      <Dialog
        open={infoOpen}
        onOpenChange={setInfoOpen}
        title={t('designer.infoDialogTitle')}
        description={t('designer.infoDialogDescription')}
      >
        <Button onClick={() => setInfoOpen(false)}>
          {t('designer.close')}
        </Button>
      </Dialog>
    </main>
  )
}

export default DesignerPage
