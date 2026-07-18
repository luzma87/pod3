import { useTranslation } from 'react-i18next'
import Button from '../../components/ui/Button'
import Dialog from '../../components/ui/Dialog'
import { resetDesignerStore } from '../../store/designerStore'

interface ResetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function ResetDialog({ open, onOpenChange }: ResetDialogProps) {
  const { t } = useTranslation()

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={t('designer.reset.title')}
      description={t('designer.reset.body')}
    >
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={() => onOpenChange(false)}>
          {t('designer.reset.cancel')}
        </Button>
        <Button
          onClick={() => {
            resetDesignerStore()
            onOpenChange(false)
          }}
        >
          {t('designer.reset.confirm')}
        </Button>
      </div>
    </Dialog>
  )
}

export default ResetDialog
