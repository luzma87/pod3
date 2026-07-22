import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import allBlocks from '../../assets/blocks/allBlocks'
import { useDesignerStore } from '../../store/designerStore'
import DesignerPage from './DesignerPage'

const loadQuiltMock = vi.fn()

vi.mock('../../firebase/quilts', () => ({
  loadQuilt: (...args: unknown[]) => loadQuiltMock(...args),
}))

beforeEach(() => {
  loadQuiltMock.mockReset()
})

function renderAtQuiltId(quiltId: string) {
  return render(
    <MemoryRouter initialEntries={[`/${quiltId}`]}>
      <Routes>
        <Route path="/:quiltId" element={<DesignerPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

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

describe('DesignerPage loading a saved quilt by url', () => {
  it('loads and renders a saved design at /:quiltId', async () => {
    const pixie = allBlocks.find((block) => block.name === 'Cornish Pixie')!
    loadQuiltMock.mockResolvedValue({
      quiltName: 'brave-swift-phoenix-42',
      sizeKey: 'king',
      width: 110,
      height: 108,
      blocks: [
        {
          instanceId: `${pixie.id}-1`,
          blockId: pixie.id,
          category: pixie.category,
          position: { x: 1, y: 1 },
          rotation: 0,
          isFlipped: false,
          colorOverrides: {},
        },
      ],
      paintedSquares: [],
      quiltUser: { id: 'user-1', anonymous: true },
    })

    renderAtQuiltId('brave-swift-phoenix-42')

    expect(await screen.findByTitle('Cornish Pixie')).toBeInTheDocument()
    expect(loadQuiltMock).toHaveBeenCalledWith('brave-swift-phoenix-42')
    expect(useDesignerStore.getState().quiltId).toBe('brave-swift-phoenix-42')
    expect(useDesignerStore.getState().sizeKey).toBe('king')
  })

  it("shows a not-found message when the quilt id doesn't exist", async () => {
    loadQuiltMock.mockResolvedValue(null)

    renderAtQuiltId('nothing-here-00')

    expect(
      await screen.findByText(
        "This quilt link doesn't match any saved design.",
      ),
    ).toBeInTheDocument()
  })

  it('shows an error message when the load fails', async () => {
    loadQuiltMock.mockRejectedValue(new Error('network error'))

    renderAtQuiltId('brave-swift-phoenix-42')

    expect(
      await screen.findByText(
        'Something went wrong loading this quilt. Please try again.',
      ),
    ).toBeInTheDocument()
  })
})
