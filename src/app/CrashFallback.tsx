import { useTranslation } from 'react-i18next'
import catImage from '../assets/images/cat-with-broom.png'
import Button from '../components/ui/Button'

function CrashFallback() {
  const { t } = useTranslation()

  return (
    <main className="flex h-full flex-col items-center gap-4 overflow-y-auto p-8 text-center">
      <img
        src={catImage}
        alt={t('crashPage.catAlt')}
        width={240}
        height={240}
      />
      <h1 className="font-display text-3xl text-maroon">
        {t('crashPage.title')}
      </h1>
      <p className="text-ink-muted">{t('crashPage.body')}</p>
      <Button onClick={() => window.location.reload()}>
        {t('crashPage.reload')}
      </Button>
    </main>
  )
}

export default CrashFallback
