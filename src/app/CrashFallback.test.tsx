import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import CrashFallback from './CrashFallback'

describe('CrashFallback', () => {
  it('shows the crash message and cat artwork', () => {
    render(<CrashFallback />)
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(
      screen.getByRole('img', {
        name: 'A black cat that knocked something over with a broom',
      }),
    ).toBeInTheDocument()
  })

  it('reloads the page when the reload button is clicked', async () => {
    const reload = vi.fn()
    vi.stubGlobal('location', { ...window.location, reload })

    render(<CrashFallback />)
    await userEvent.click(
      screen.getByRole('button', { name: 'Reload the page' }),
    )

    expect(reload).toHaveBeenCalled()
    vi.unstubAllGlobals()
  })
})
