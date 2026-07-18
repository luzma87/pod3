import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import NotFoundPage from './NotFoundPage'

describe('NotFoundPage', () => {
  it('renders the ghost image, 404 heading, and a link back home', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole('img', { name: /ghost wearing a witch hat/i }),
    ).toBeInTheDocument()
    expect(screen.getByText('404')).toBeInTheDocument()
    const backLink = screen.getByRole('link', {
      name: 'Back to the quilt designer',
    })
    expect(backLink).toHaveAttribute('href', '/')
  })
})
