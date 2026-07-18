import { useTranslation } from 'react-i18next'

function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <main className="p-8">
      <h1 className="font-display text-3xl text-maroon">
        {t('notFound.title')}
      </h1>
      <p className="text-ink-muted">{t('notFound.body')}</p>
    </main>
  )
}

export default NotFoundPage
