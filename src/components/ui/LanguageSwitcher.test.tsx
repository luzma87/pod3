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
      <p>{t('designer.openInfo')}</p>
    </>
  )
}

describe('LanguageSwitcher', () => {
  it('defaults to English', () => {
    render(<Harness />)
    expect(screen.getByText('Open info')).toBeInTheDocument()
  })

  it('switches the whole app to Spanish when selected', async () => {
    render(<Harness />)
    await userEvent.selectOptions(screen.getByRole('combobox'), 'es')
    expect(await screen.findByText('Abrir información')).toBeInTheDocument()
  })
})
