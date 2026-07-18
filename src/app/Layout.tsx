import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import LanguageSwitcher from '../components/ui/LanguageSwitcher'
import ThemeToggle from '../components/ui/ThemeToggle'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-screen flex-col bg-parchment text-ink">
      <header className="flex items-center justify-end gap-3 border-b border-border p-4">
        <LanguageSwitcher />
        <ThemeToggle />
      </header>
      <div className="flex-1">{children}</div>
      <footer className="border-t border-border p-4 text-center text-sm">
        <Link to="/attributions" className="text-ink-muted underline">
          {t('attributions.title')}
        </Link>
      </footer>
    </div>
  )
}

export default Layout
