import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the placeholder heading', async () => {
    render(<App />)
    // the info dialog opens automatically on load and hides the rest of
    // the page from the accessibility tree until it's dismissed
    await userEvent.click(screen.getByRole('button', { name: 'Got it' }))
    expect(
      screen.getByRole('heading', { name: 'Pod3 Quilt Designer' }),
    ).toBeInTheDocument()
  })
})
