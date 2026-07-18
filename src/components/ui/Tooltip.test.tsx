import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Button from './Button'
import Tooltip from './Tooltip'

describe('Tooltip', () => {
  it('is hidden until the trigger is hovered', () => {
    render(
      <Tooltip content="Extra info">
        <Button>Hover me</Button>
      </Tooltip>,
    )
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('shows the content on hover', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="Extra info">
        <Button>Hover me</Button>
      </Tooltip>,
    )

    await user.hover(screen.getByRole('button', { name: 'Hover me' }))

    expect(await screen.findByRole('tooltip')).toHaveTextContent('Extra info')
  })
})
