import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import InfoDialog from './InfoDialog'

describe('InfoDialog', () => {
  it('is closed until opened', () => {
    render(<InfoDialog open={false} onOpenChange={vi.fn()} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('shows the interaction help text and external pattern links when open', () => {
    render(<InfoDialog open onOpenChange={vi.fn()} />)

    expect(screen.getByText(/Click a block in the sidebar/)).toBeInTheDocument()
    expect(
      screen.getByText(/Hover a placed block to flip, rotate, move/),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'sewhooked.com' })).toHaveAttribute(
      'href',
      'https://sewhooked.com/',
    )
  })

  it('closes via the Got it button', async () => {
    const onOpenChange = vi.fn()
    render(<InfoDialog open onOpenChange={onOpenChange} />)

    await userEvent.click(screen.getByRole('button', { name: 'Got it' }))

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
