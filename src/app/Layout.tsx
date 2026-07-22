import { useState } from 'react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router'
import emailIcon from '../assets/icons/001-email.svg'
import infoIcon from '../assets/icons/010-information.svg'
import saveIcon from '../assets/icons/033-save.svg'
import Button from '../components/ui/Button'
import LanguageSwitcher from '../components/ui/LanguageSwitcher'
import ThemeToggle from '../components/ui/ThemeToggle'
import { generateQuiltId } from '../features/workspace/generateQuiltId'
import { serializeQuilt } from '../features/workspace/serializeQuilt'
import { saveQuilt } from '../firebase/quilts'
import { waitForUser } from '../firebase/client'
import { useDesignerStore } from '../store/designerStore'
import InfoDialog from './InfoDialog'
import SaveResultDialog from './SaveResultDialog'

interface LayoutProps {
  children: ReactNode
}

const CONTACT_EMAIL = 'luz.unda@yahoo.com'

function Layout({ children }: LayoutProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [infoOpen, setInfoOpen] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState(false)
  const [shareUrl, setShareUrl] = useState<string | null>(null)

  const handleSave = async () => {
    setSaveError(false)
    setSaving(true)
    try {
      const user = await waitForUser()
      const state = useDesignerStore.getState()
      const quiltId = state.quiltId ?? generateQuiltId()
      const quilt = serializeQuilt({
        quiltId,
        placedBlocks: state.placedBlocks,
        paintedSquares: state.paintedSquares,
        sizeKey: state.sizeKey,
        width: state.width,
        height: state.height,
        user,
      })
      await saveQuilt(quiltId, quilt)
      state.setQuiltId(quiltId)
      navigate(`/${quiltId}`, { replace: true })
      setShareUrl(`${window.location.origin}/${quiltId}`)
    } catch {
      setSaveError(true)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex h-screen flex-col bg-parchment text-ink">
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-border p-4">
        <h1 className="font-display text-2xl text-maroon">{t('app.title')}</h1>
        <div className="flex items-center gap-3">
          {saveError && (
            <p className="text-sm text-maroon">{t('designer.saveError')}</p>
          )}
          <Button variant="secondary" className="gap-2" onClick={handleSave}>
            <img src={saveIcon} alt="" className="h-5 w-5" />
            {saving ? '…' : t('designer.saveButton')}
          </Button>
          <Button
            variant="secondary"
            size="icon"
            aria-label={t('designer.infoButton')}
            title={t('designer.infoButton')}
            onClick={() => setInfoOpen(true)}
          >
            <img src={infoIcon} alt="" className="h-5 w-5" />
          </Button>
          <Button variant="secondary" size="icon" asChild>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              target="_blank"
              rel="noreferrer"
              aria-label={t('designer.emailButton')}
              title={t('designer.emailButton')}
            >
              <img src={emailIcon} alt="" className="h-5 w-5" />
            </a>
          </Button>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </header>
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      <footer className="shrink-0 border-t border-border p-4 text-center text-sm">
        <Link to="/attributions" className="text-ink-muted underline">
          {t('attributions.title')}
        </Link>
      </footer>
      <InfoDialog open={infoOpen} onOpenChange={setInfoOpen} />
      <SaveResultDialog
        open={shareUrl !== null}
        onOpenChange={(open) => {
          if (!open) setShareUrl(null)
        }}
        shareUrl={shareUrl ?? ''}
      />
    </div>
  )
}

export default Layout
