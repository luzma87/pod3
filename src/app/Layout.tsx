import type { ReactNode } from 'react'
import LanguageSwitcher from '../components/ui/LanguageSwitcher'
import ThemeToggle from '../components/ui/ThemeToggle'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-parchment text-ink">
      <header className="flex items-center justify-end gap-3 border-b border-border p-4">
        <LanguageSwitcher />
        <ThemeToggle />
      </header>
      {children}
    </div>
  )
}

export default Layout
