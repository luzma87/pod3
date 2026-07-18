import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import ghostImage from '../../assets/images/not-found-ghost.png'
import Button from '../../components/ui/Button'

function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <main className="flex flex-col items-center gap-4 p-8 text-center">
      <img
        src={ghostImage}
        alt={t('notFound.ghostAlt')}
        width={240}
        height={240}
      />
      <h1 className="font-display text-3xl text-maroon">
        {t('notFound.title')}
      </h1>
      <p className="text-ink-muted">{t('notFound.body')}</p>
      <Button asChild>
        <Link to="/">{t('notFound.backHome')}</Link>
      </Button>
    </main>
  )
}

export default NotFoundPage
