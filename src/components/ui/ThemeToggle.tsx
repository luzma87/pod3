import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from './Button'

const STORAGE_KEY = 'pod3-theme'

function getIsDark() {
  return document.documentElement.classList.contains('dark')
}

function ThemeToggle() {
  const { t } = useTranslation()
  const [isDark, setIsDark] = useState(getIsDark)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <Button variant="secondary" onClick={() => setIsDark((prev) => !prev)}>
      {isDark ? t('theme.toggleToLight') : t('theme.toggleToDark')}
    </Button>
  )
}

export default ThemeToggle
