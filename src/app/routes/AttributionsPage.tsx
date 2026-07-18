import { useTranslation } from 'react-i18next'
import attributions from '../../attributions'
import Card from '../../components/ui/Card'

function AttributionsPage() {
  const { t } = useTranslation()

  return (
    <main className="h-full overflow-y-auto p-8">
      <h1 className="font-display text-3xl text-maroon">
        {t('attributions.title')}
      </h1>
      <p className="mt-2 max-w-md text-ink-muted">{t('attributions.intro')}</p>
      <ul className="mt-6 flex max-w-md flex-col gap-3">
        {attributions.map((item) => {
          const author = item.author
            ? ` ${t('attributions.author', { author: item.author })}`
            : ''
          return (
            <li key={item.id}>
              <Card>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={item.src}
                    alt={item.name}
                    className="mx-auto h-32 w-32 object-contain"
                  />
                  <p className="font-medium">
                    {item.name}
                    {author}
                  </p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-maroon underline"
                  >
                    {item.source}
                  </a>
                  {item.directLink && (
                    <a
                      href={item.directLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-maroon underline"
                    >
                      {t('attributions.directLink')}
                    </a>
                  )}
                </div>
              </Card>
            </li>
          )
        })}
      </ul>
    </main>
  )
}

export default AttributionsPage
