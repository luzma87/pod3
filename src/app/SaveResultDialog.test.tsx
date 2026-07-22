import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import SaveResultDialog from './SaveResultDialog'

const SHARE_URL = 'http://localhost/brave-swift-phoenix-42'

beforeEach(() => {
  Object.assign(navigator, {
    clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
  })
})

describe('SaveResultDialog', () => {
  it('shows the shareable url', () => {
    render(
      <SaveResultDialog open onOpenChange={vi.fn()} shareUrl={SHARE_URL} />,
    )
    expect(screen.getByDisplayValue(SHARE_URL)).toBeInTheDocument()
  })

  it('copies the link to the clipboard and shows transient feedback', async () => {
    render(
      <SaveResultDialog open onOpenChange={vi.fn()} shareUrl={SHARE_URL} />,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Copy link' }))

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(SHARE_URL)
    expect(
      await screen.findByRole('button', { name: 'Copied!' }),
    ).toBeInTheDocument()
  })

  it('calls onOpenChange(false) when Close is clicked', async () => {
    const onOpenChange = vi.fn()
    render(
      <SaveResultDialog
        open
        onOpenChange={onOpenChange}
        shareUrl={SHARE_URL}
      />,
    )

    // the Dialog primitive's own icon-only close button also has an
    // (untranslated, hardcoded) "Close" aria-label, so target this one by
    // its visible text instead of role+name.
    await userEvent.click(screen.getByText('Close'))

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
