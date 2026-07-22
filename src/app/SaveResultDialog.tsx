import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'
import Dialog from '../components/ui/Dialog'

const COPIED_RESET_MS = 1500

interface SaveResultDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  shareUrl: string
}

function SaveResultDialog({
  open,
  onOpenChange,
  shareUrl,
}: SaveResultDialogProps) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    if (!open) setCopied(false)
  }, [open])

  useEffect(() => () => clearTimeout(resetTimeoutRef.current), [])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    clearTimeout(resetTimeoutRef.current)
    resetTimeoutRef.current = setTimeout(
      () => setCopied(false),
      COPIED_RESET_MS,
    )
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={t('designer.save.title')}
    >
      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm">
          {t('designer.save.linkLabel')}
          <input
            type="text"
            readOnly
            value={shareUrl}
            onFocus={(event) => event.currentTarget.select()}
            className="rounded-md border border-border bg-parchment-dark px-2 py-1 text-sm"
          />
        </label>
        <Button variant="secondary" className="self-start" onClick={handleCopy}>
          {copied ? t('designer.save.copied') : t('designer.save.copy')}
        </Button>
      </div>
      <div className="mt-4 flex justify-end">
        <Button onClick={() => onOpenChange(false)}>
          {t('designer.save.close')}
        </Button>
      </div>
    </Dialog>
  )
}

export default SaveResultDialog
