import { useTranslation } from 'react-i18next'
import { DropdownMenu } from 'radix-ui'
import Button from './Button'

const LANGUAGES = [
  { code: 'en', label: 'English', icon: '🇬🇧' },
  { code: 'es', label: 'Español', icon: '🇪🇸' },
]

function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const current =
    LANGUAGES.find((lang) => lang.code === i18n.resolvedLanguage) ??
    LANGUAGES[0]

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="secondary"
          size="icon"
          aria-label={t('language.label')}
          title={t('language.label')}
        >
          {current.icon}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={4}
          className="z-10 min-w-40 rounded-md border border-border bg-parchment p-1 shadow-md"
        >
          <DropdownMenu.RadioGroup
            value={i18n.resolvedLanguage}
            onValueChange={(value) => i18n.changeLanguage(value)}
          >
            {LANGUAGES.map((lang) => (
              <DropdownMenu.RadioItem
                key={lang.code}
                value={lang.code}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ink outline-none data-[highlighted]:bg-gold-light"
              >
                <span aria-hidden>{lang.icon}</span>
                {lang.label}
                <DropdownMenu.ItemIndicator className="ml-auto">
                  ✓
                </DropdownMenu.ItemIndicator>
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default LanguageSwitcher
