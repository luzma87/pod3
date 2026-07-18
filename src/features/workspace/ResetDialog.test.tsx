import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import allBlocks from '../../assets/blocks/allBlocks'
import { useDesignerStore } from '../../store/designerStore'
import ResetDialog from './ResetDialog'

const pixie = allBlocks.find((block) => block.name === 'Cornish Pixie')!

describe('ResetDialog', () => {
  it('is closed until opened', () => {
    render(<ResetDialog open={false} onOpenChange={vi.fn()} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('cancel closes without clearing the quilt', async () => {
    useDesignerStore.getState().selectBlockToPlace(pixie)
    useDesignerStore.getState().placeBlockAt(0, 0)
    const onOpenChange = vi.fn()

    render(<ResetDialog open onOpenChange={onOpenChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(useDesignerStore.getState().placedBlocks).toHaveLength(1)
  })

  it('confirming clears placed blocks and painted squares', async () => {
    useDesignerStore.getState().selectBlockToPlace(pixie)
    useDesignerStore.getState().placeBlockAt(1, 1)
    useDesignerStore.getState().paintSquare(2, 2, '#F44336')
    const onOpenChange = vi.fn()

    render(<ResetDialog open onOpenChange={onOpenChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Yes, reset' }))

    expect(useDesignerStore.getState().placedBlocks).toEqual([])
    expect(useDesignerStore.getState().paintedSquares).toEqual([])
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
