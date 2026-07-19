import { useState } from 'react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import Button from '../components/ui/Button'
import LanguageSwitcher from '../components/ui/LanguageSwitcher'
import ThemeToggle from '../components/ui/ThemeToggle'
import InfoDialog from './InfoDialog'

interface LayoutProps {
  children: ReactNode
}

const CONTACT_EMAIL = 'luz.unda@yahoo.com'

function Layout({ children }: LayoutProps) {
  const { t } = useTranslation()
  const [infoOpen, setInfoOpen] = useState(true)

  return (
    <div className="flex h-screen flex-col bg-parchment text-ink">
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-border p-4">
        <h1 className="font-display text-2xl text-maroon">{t('app.title')}</h1>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="icon"
            aria-label={t('designer.infoButton')}
            title={t('designer.infoButton')}
            onClick={() => setInfoOpen(true)}
          >
            ℹ️
          </Button>
          <Button variant="secondary" size="icon" asChild>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              target="_blank"
              rel="noreferrer"
              aria-label={t('designer.emailButton')}
              title={t('designer.emailButton')}
            >
              ✉️
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
    </div>
  )
}

export default Layout
