import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Dialog from './Dialog'
import Button from './Button'

function TestHarness() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      title="Test dialog"
      description="A description"
      trigger={<Button>Open</Button>}
    >
      <p>Dialog body content</p>
    </Dialog>
  )
}

describe('Dialog', () => {
  it('is closed until the trigger is clicked', () => {
    render(<TestHarness />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens on trigger click and shows title/description/content', async () => {
    render(<TestHarness />)
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Test dialog')).toBeInTheDocument()
    expect(screen.getByText('A description')).toBeInTheDocument()
    expect(screen.getByText('Dialog body content')).toBeInTheDocument()
  })

  it('closes when the close button is clicked', async () => {
    render(<TestHarness />)
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders a footer outside the scrollable content area, when given one', async () => {
    render(
      <Dialog
        open
        onOpenChange={() => {}}
        title="Test dialog"
        footer={<p>Footer content</p>}
      >
        <p>Dialog body content</p>
      </Dialog>,
    )
    expect(screen.getByText('Dialog body content')).toBeInTheDocument()
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })
})
