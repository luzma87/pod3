import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DropdownMenu } from 'radix-ui'
import checkIcon from '../../assets/icons/024-check.svg'
import moonIcon from '../../assets/icons/017-moon.svg'
import sunIcon from '../../assets/icons/014-sun-1.svg'
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
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="secondary"
          size="icon"
          aria-label={t('theme.label')}
          title={t('theme.label')}
        >
          <img src={isDark ? moonIcon : sunIcon} alt="" className="h-5 w-5" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={4}
          className="z-10 min-w-40 rounded-md border border-border bg-parchment p-1 shadow-md"
        >
          <DropdownMenu.RadioGroup
            value={isDark ? 'dark' : 'light'}
            onValueChange={(value) => setIsDark(value === 'dark')}
          >
            <DropdownMenu.RadioItem
              value="light"
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ink outline-none data-[highlighted]:bg-gold-light"
            >
              <img src={sunIcon} alt="" className="h-4 w-4" />
              {t('theme.light')}
              <DropdownMenu.ItemIndicator className="ml-auto">
                <img src={checkIcon} alt="" className="h-3.5 w-3.5" />
              </DropdownMenu.ItemIndicator>
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem
              value="dark"
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ink outline-none data-[highlighted]:bg-gold-light"
            >
              <img src={moonIcon} alt="" className="h-4 w-4" />
              {t('theme.dark')}
              <DropdownMenu.ItemIndicator className="ml-auto">
                <img src={checkIcon} alt="" className="h-3.5 w-3.5" />
              </DropdownMenu.ItemIndicator>
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default ThemeToggle
