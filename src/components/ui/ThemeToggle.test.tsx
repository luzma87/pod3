import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ThemeToggle from './ThemeToggle'

describe('ThemeToggle', () => {
  it('starts with no dark class applied, menu closed', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('button', { name: 'Theme' })).toBeInTheDocument()
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('opens the menu and lists both modes', async () => {
    render(<ThemeToggle />)
    await userEvent.click(screen.getByRole('button', { name: 'Theme' }))

    expect(
      screen.getByRole('menuitemradio', { name: /Light mode/ }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('menuitemradio', { name: /Dark mode/ }),
    ).toBeInTheDocument()
  })

  it('picking Dark mode toggles the dark class and persists it, and back again', async () => {
    render(<ThemeToggle />)

    await userEvent.click(screen.getByRole('button', { name: 'Theme' }))
    await userEvent.click(
      screen.getByRole('menuitemradio', { name: /Dark mode/ }),
    )
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('pod3-theme')).toBe('dark')

    await userEvent.click(screen.getByRole('button', { name: 'Theme' }))
    await userEvent.click(
      screen.getByRole('menuitemradio', { name: /Light mode/ }),
    )
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('pod3-theme')).toBe('light')
  })
})
