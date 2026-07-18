import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import Layout from './Layout'

describe('Layout', () => {
  it('shows the app name in the header', () => {
    render(
      <MemoryRouter>
        <Layout>
          <p>page content</p>
        </Layout>
      </MemoryRouter>,
    )
    expect(screen.getByText('Pod3 Quilt Designer')).toBeInTheDocument()
  })

  it('opens the info dialog from the Info button', async () => {
    render(
      <MemoryRouter>
        <Layout>
          <p>page content</p>
        </Layout>
      </MemoryRouter>,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Info' }))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('About this quilt designer')).toBeInTheDocument()
  })
})
