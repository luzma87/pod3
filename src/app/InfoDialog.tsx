import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'
import Dialog from '../components/ui/Dialog'

interface InfoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function InfoDialog({ open, onOpenChange }: InfoDialogProps) {
  const { t } = useTranslation()

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={t('designer.info.title')}
    >
      <div className="flex flex-col gap-3 text-sm">
        <p>{t('designer.info.credit')}</p>
        <p className="flex flex-wrap gap-3">
          <a
            href="https://sewhooked.com/"
            target="_blank"
            rel="noreferrer"
            className="text-maroon underline"
          >
            sewhooked.com
          </a>
          <a
            href="http://www.fandominstitches.com/"
            target="_blank"
            rel="noreferrer"
            className="text-maroon underline"
          >
            fandominstitches.com
          </a>
        </p>
        <p className="font-medium text-maroon">{t('designer.info.license')}</p>
        <a
          href="http://www.fandominstitches.com/2015/07/harry-potter-bookcase-quilt-along.html"
          target="_blank"
          rel="noreferrer"
          className="text-maroon underline"
        >
          {t('designer.info.patternsLink')}
        </a>
        <hr className="border-border" />
        <p>{t('designer.info.squareSize')}</p>
        <p>{t('designer.info.placeBlock')}</p>
        <p>{t('designer.info.manipulateBlock')}</p>
        <p>{t('designer.info.paintSquare')}</p>
        <p>{t('designer.info.resetHint')}</p>
      </div>
      <div className="mt-4 flex justify-end">
        <Button onClick={() => onOpenChange(false)}>
          {t('designer.info.close')}
        </Button>
      </div>
    </Dialog>
  )
}

export default InfoDialog
