import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { useDesignerStore } from '../../store/designerStore'
import DesignerPage from './DesignerPage'

describe('DesignerPage click-to-place integration', () => {
  it('selects a block from the catalog and places it on the grid at the clicked cell', async () => {
    render(
      <MemoryRouter>
        <DesignerPage />
      </MemoryRouter>,
    )

    const thumbnail = screen.getByRole('button', { name: 'Cornish Pixie' })
    await userEvent.click(thumbnail)
    expect(thumbnail).toHaveAttribute('aria-pressed', 'true')

    const grid = screen.getByTestId('quilt-grid')
    vi.spyOn(grid, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    })

    fireEvent.click(grid, { clientX: 11, clientY: 22 })

    expect(within(grid).getByTitle('Cornish Pixie')).toBeInTheDocument()
    // selection clears after placing, ready to pick another block
    expect(thumbnail).toHaveAttribute('aria-pressed', 'false')
  })

  it('resets the quilt from the Reset button after confirming', async () => {
    render(
      <MemoryRouter>
        <DesignerPage />
      </MemoryRouter>,
    )

    const thumbnail = screen.getByRole('button', { name: 'Cornish Pixie' })
    await userEvent.click(thumbnail)
    const grid = screen.getByTestId('quilt-grid')
    vi.spyOn(grid, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    })
    fireEvent.click(grid, { clientX: 0, clientY: 0 })
    expect(useDesignerStore.getState().placedBlocks).toHaveLength(1)

    await userEvent.click(screen.getByRole('button', { name: 'Reset' }))
    await userEvent.click(screen.getByRole('button', { name: 'Yes, reset' }))

    expect(useDesignerStore.getState().placedBlocks).toEqual([])
  })
})
