import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Layout from './Layout'

const waitForUserMock = vi.fn()
const saveQuiltMock = vi.fn()

vi.mock('../firebase/client', () => ({
  waitForUser: () => waitForUserMock(),
}))

vi.mock('../firebase/quilts', () => ({
  saveQuilt: (...args: unknown[]) => saveQuiltMock(...args),
}))

beforeEach(() => {
  waitForUserMock.mockReset().mockResolvedValue({
    uid: 'user-1',
    isAnonymous: true,
  })
  saveQuiltMock.mockReset().mockResolvedValue(undefined)
})

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

  it('links the Email me button to a mailto address in a new tab', async () => {
    render(
      <MemoryRouter>
        <Layout>
          <p>page content</p>
        </Layout>
      </MemoryRouter>,
    )
    // the info dialog opens automatically on load and hides the rest of
    // the page from the accessibility tree until it's dismissed
    await userEvent.click(screen.getByRole('button', { name: 'Got it' }))

    const emailLink = screen.getByRole('link', { name: 'Email me' })
    expect(emailLink).toHaveAttribute('href', 'mailto:luz.unda@yahoo.com')
    expect(emailLink).toHaveAttribute('target', '_blank')
  })

  it('opens the info dialog automatically on load', () => {
    render(
      <MemoryRouter>
        <Layout>
          <p>page content</p>
        </Layout>
      </MemoryRouter>,
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('About this quilt designer')).toBeInTheDocument()
  })

  it('reopens the info dialog from the Info button after closing it', async () => {
    render(
      <MemoryRouter>
        <Layout>
          <p>page content</p>
        </Layout>
      </MemoryRouter>,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Got it' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Info' }))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('About this quilt designer')).toBeInTheDocument()
  })

  it('saves the quilt and shows a shareable link dialog', async () => {
    render(
      <MemoryRouter>
        <Layout>
          <p>page content</p>
        </Layout>
      </MemoryRouter>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Got it' }))

    await userEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(await screen.findByText('Saved!')).toBeInTheDocument()
    expect(saveQuiltMock).toHaveBeenCalledTimes(1)
    const [quiltId] = saveQuiltMock.mock.calls[0] as [string]
    expect(
      screen.getByDisplayValue(new RegExp(`${quiltId}$`)),
    ).toBeInTheDocument()
  })

  it('shows an error message if saving fails', async () => {
    saveQuiltMock.mockRejectedValueOnce(new Error('network error'))
    render(
      <MemoryRouter>
        <Layout>
          <p>page content</p>
        </Layout>
      </MemoryRouter>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Got it' }))

    await userEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(
      await screen.findByText(
        'Something went wrong saving your quilt. Please try again.',
      ),
    ).toBeInTheDocument()
    expect(screen.queryByText('Saved!')).not.toBeInTheDocument()
  })
})
