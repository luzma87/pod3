import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

function Harness() {
  const { t } = useTranslation()
  return (
    <>
      <LanguageSwitcher />
      <p>{t('designer.infoButton')}</p>
    </>
  )
}

describe('LanguageSwitcher', () => {
  it('defaults to English, with the menu closed', () => {
    render(<Harness />)
    expect(screen.getByText('Info')).toBeInTheDocument()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('opens the menu and lists both languages', async () => {
    render(<Harness />)
    await userEvent.click(screen.getByRole('button', { name: 'Language' }))

    expect(
      screen.getByRole('menuitemradio', { name: /English/ }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('menuitemradio', { name: /Español/ }),
    ).toBeInTheDocument()
  })

  it('switches the whole app to Spanish when selected', async () => {
    render(<Harness />)
    await userEvent.click(screen.getByRole('button', { name: 'Language' }))
    await userEvent.click(
      screen.getByRole('menuitemradio', { name: /Español/ }),
    )

    expect(await screen.findByText('Información')).toBeInTheDocument()
  })
})
