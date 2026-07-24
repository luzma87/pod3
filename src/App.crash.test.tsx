import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

vi.mock('./app/AppRoutes', () => ({
  default: () => {
    throw new Error('simulated route crash')
  },
}))

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

describe('App crash recovery', () => {
  it('shows the crash fallback (not a blank/broken page) if a routed page throws, while the header stays usable', async () => {
    render(<App />)
    await userEvent.click(screen.getByRole('button', { name: 'Got it' }))

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    // the header chrome (Save, Info, etc.) is a sibling of the crashed
    // route content, so it keeps working even though the page beneath it
    // didn't
    expect(
      screen.getByRole('heading', { name: 'Pod3 Quilt Designer' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })
})
