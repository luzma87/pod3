import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import allBlocks from '../../assets/blocks/allBlocks'
import { useDesignerStore } from '../../store/designerStore'
import QuiltGrid from './QuiltGrid'

const pixie = allBlocks.find((block) => block.name === 'Cornish Pixie')!

function stubGridOrigin(grid: HTMLElement) {
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
}

describe('QuiltGrid', () => {
  it('renders a single-element grid sized from width/height in inches', () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')

    expect(grid).toHaveAttribute('data-columns', '50')
    expect(grid).toHaveAttribute('data-rows', '65')
    expect(grid).toHaveAttribute(
      'aria-label',
      'Empty quilt grid, 50 by 65 squares',
    )
    // no per-cell DOM nodes — the grid lines are a CSS background pattern
    expect(grid.children.length).toBe(0)
    // content-box so the 1px border sits outside the sized area instead of
    // eating into it, which would otherwise squeeze the last row/column
    expect(grid.className).toContain('box-content')
    // +1px on each dimension so the last background grid line isn't
    // clipped exactly at the edge by overflow-hidden
    expect(grid).toHaveStyle({ width: '551px', height: '716px' })
  })

  it('uses the plain grid-lines class and no major-line CSS var when major grid lines are off', () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')

    expect(grid.className).toContain('quilt-grid-lines')
    expect(grid.className).not.toContain('quilt-grid-major-lines')
    expect(grid.style.getPropertyValue('--major-square-size')).toBe('')
  })

  it('switches to the major-line class and sets the interval as a CSS var when enabled', () => {
    render(<QuiltGrid width={50} height={65} majorGridInterval={5} />)
    const grid = screen.getByTestId('quilt-grid')

    expect(grid.className).toContain('quilt-grid-major-lines')
    expect(grid.style.getPropertyValue('--major-square-size')).toBe('55px')
  })

  it('adds an extra pixel of edge padding for the thicker major lines', () => {
    render(<QuiltGrid width={50} height={65} majorGridInterval={5} />)
    const grid = screen.getByTestId('quilt-grid')

    // 1px (always) + 1px more for the 2px-wide major lines
    expect(grid).toHaveStyle({ width: '552px', height: '717px' })
  })

  it('floors partial-inch dimensions down to whole squares', () => {
    render(<QuiltGrid width={30.5} height={40.9} />)
    const grid = screen.getByTestId('quilt-grid')
    expect(grid).toHaveAttribute('data-columns', '30')
    expect(grid).toHaveAttribute('data-rows', '40')
  })

  it('opens the paint dialog, not block placement, when clicked with no block selected', () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    fireEvent.click(grid, { clientX: 22, clientY: 33 })

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(useDesignerStore.getState().placedBlocks).toEqual([])
  })

  it('places the selected block at the clicked cell, and clears the selection', () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    act(() => {
      useDesignerStore.getState().selectBlockToPlace(pixie)
    })
    // 11px squares: (22, 33) => cell (2, 3)
    fireEvent.click(grid, { clientX: 22, clientY: 33 })

    expect(useDesignerStore.getState().blockToPlace).toBeNull()
    const placed = screen.getByTitle('Cornish Pixie')
    expect(placed).toBeInTheDocument()
    expect(placed).toHaveStyle({ left: '22px', top: '33px' })
  })

  it('shows no block-footprint preview when no block is selected to place', () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    fireEvent.mouseMove(grid, { clientX: 22, clientY: 33 })

    expect(screen.queryByTestId('hover-preview')).not.toBeInTheDocument()
  })

  it("previews the selected block's full footprint at the hovered cell", () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    act(() => {
      useDesignerStore.getState().selectBlockToPlace(pixie)
    })
    // 11px squares: (22, 33) => cell (2, 3)
    fireEvent.mouseMove(grid, { clientX: 22, clientY: 33 })

    const preview = screen.getByTestId('hover-preview')
    // Cornish Pixie is 7x8.5 squares
    expect(preview).toHaveStyle({
      left: '22px',
      top: '33px',
      width: '77px',
      height: '93.5px',
    })
    expect(preview).toHaveAttribute('data-out-of-bounds', 'false')
  })

  it('flags the preview as out of bounds near the grid edge', () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    act(() => {
      useDesignerStore.getState().selectBlockToPlace(pixie)
    })
    // cell (45, 3): 45 + 7 (block width) = 52 > 50 columns
    fireEvent.mouseMove(grid, { clientX: 45 * 11, clientY: 33 })

    expect(screen.getByTestId('hover-preview')).toHaveAttribute(
      'data-out-of-bounds',
      'true',
    )
  })

  it('clears the hover preview on mouse leave', () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    act(() => {
      useDesignerStore.getState().selectBlockToPlace(pixie)
    })
    fireEvent.mouseMove(grid, { clientX: 22, clientY: 33 })
    expect(screen.getByTestId('hover-preview')).toBeInTheDocument()

    fireEvent.mouseLeave(grid)
    expect(screen.queryByTestId('hover-preview')).not.toBeInTheDocument()
  })

  it('paints the clicked square with the chosen color and closes the dialog', () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    // 11px squares: (22, 33) => cell (2, 3)
    fireEvent.click(grid, { clientX: 22, clientY: 33 })
    fireEvent.click(screen.getByRole('button', { name: 'Red' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(useDesignerStore.getState().paintedSquares).toEqual([
      { position: { x: 2, y: 3 }, color: '#F44336' },
    ])
    const painted = screen.getByTitle('#F44336')
    expect(painted).toHaveStyle({
      left: '22px',
      top: '33px',
      width: '11px',
      height: '11px',
      backgroundColor: '#F44336',
    })
  })

  it('closes the paint dialog without painting when Cancel is clicked', () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    fireEvent.click(grid, { clientX: 22, clientY: 33 })
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(useDesignerStore.getState().paintedSquares).toEqual([])
  })

  it('erases a painted square when Erase is clicked', () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    fireEvent.click(grid, { clientX: 22, clientY: 33 })
    fireEvent.click(screen.getByRole('button', { name: 'Red' }))
    expect(useDesignerStore.getState().paintedSquares).toHaveLength(1)

    fireEvent.click(grid, { clientX: 22, clientY: 33 })
    fireEvent.click(screen.getByRole('button', { name: 'Erase' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(useDesignerStore.getState().paintedSquares).toEqual([])
  })

  it('erases every square in a dragged rectangle when Erase is clicked', () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    fireEvent.mouseDown(grid, { clientX: 22, clientY: 33 })
    fireEvent.mouseMove(grid, { clientX: 44, clientY: 55 })
    fireEvent.mouseUp(grid, { clientX: 44, clientY: 55 })
    fireEvent.click(screen.getByRole('button', { name: 'Red' }))
    expect(useDesignerStore.getState().paintedSquares).toHaveLength(9)

    fireEvent.mouseDown(grid, { clientX: 22, clientY: 33 })
    fireEvent.mouseMove(grid, { clientX: 44, clientY: 55 })
    fireEvent.mouseUp(grid, { clientX: 44, clientY: 55 })
    fireEvent.click(screen.getByRole('button', { name: 'Erase' }))

    expect(useDesignerStore.getState().paintedSquares).toEqual([])
  })

  it('clicking a block instead of placing does not open the paint dialog', () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    act(() => {
      useDesignerStore.getState().selectBlockToPlace(pixie)
    })
    fireEvent.click(grid, { clientX: 22, clientY: 33 })

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(useDesignerStore.getState().paintedSquares).toEqual([])
  })

  it('repainting the same square replaces the color instead of stacking', () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    fireEvent.click(grid, { clientX: 22, clientY: 33 })
    fireEvent.click(screen.getByRole('button', { name: 'Red' }))
    fireEvent.click(grid, { clientX: 22, clientY: 33 })
    fireEvent.click(screen.getByRole('button', { name: 'Blue' }))

    const state = useDesignerStore.getState()
    expect(state.paintedSquares).toHaveLength(1)
    expect(state.paintedSquares[0].color).toBe('#2196F3')
  })

  it('previews a single square to paint when hovering with no block selected', () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    // 11px squares: (22, 33) => cell (2, 3)
    fireEvent.mouseMove(grid, { clientX: 22, clientY: 33 })

    const preview = screen.getByTestId('paint-hover-preview')
    expect(preview).toHaveStyle({
      left: '22px',
      top: '33px',
      width: '11px',
      height: '11px',
    })
    expect(preview).toHaveTextContent('')
  })

  it('shows the rectangle size while dragging out a paint selection', () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    // drag from cell (2, 3) to cell (4, 5): 3 columns x 3 rows
    fireEvent.mouseDown(grid, { clientX: 22, clientY: 33 })
    fireEvent.mouseMove(grid, { clientX: 44, clientY: 55 })

    expect(screen.getByTestId('paint-hover-preview')).toHaveTextContent('3x3')
  })

  it('hides the paint preview while a block is selected instead', () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    act(() => {
      useDesignerStore.getState().selectBlockToPlace(pixie)
    })
    fireEvent.mouseMove(grid, { clientX: 22, clientY: 33 })

    expect(screen.queryByTestId('paint-hover-preview')).not.toBeInTheDocument()
    expect(screen.getByTestId('hover-preview')).toBeInTheDocument()
  })

  it('hides the paint preview while the paint dialog is open', () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    fireEvent.mouseMove(grid, { clientX: 22, clientY: 33 })
    expect(screen.getByTestId('paint-hover-preview')).toBeInTheDocument()

    fireEvent.click(grid, { clientX: 22, clientY: 33 })
    expect(screen.queryByTestId('paint-hover-preview')).not.toBeInTheDocument()
  })

  it('paints a rectangle when dragging from one cell to another', () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    // drag from cell (2, 3) to cell (4, 5)
    fireEvent.mouseDown(grid, { clientX: 22, clientY: 33 })
    fireEvent.mouseMove(grid, { clientX: 44, clientY: 55 })
    fireEvent.mouseUp(grid, { clientX: 44, clientY: 55 })
    fireEvent.click(screen.getByRole('button', { name: 'Red' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    const { paintedSquares } = useDesignerStore.getState()
    expect(paintedSquares).toHaveLength(9)
    expect(paintedSquares).toEqual(
      expect.arrayContaining([
        { position: { x: 2, y: 3 }, color: '#F44336' },
        { position: { x: 4, y: 5 }, color: '#F44336' },
      ]),
    )
  })

  it('forms the rectangle regardless of drag direction (dragging up/left from the anchor)', () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    // drag from cell (4, 5) up/left to cell (2, 3)
    fireEvent.mouseDown(grid, { clientX: 44, clientY: 55 })
    fireEvent.mouseMove(grid, { clientX: 22, clientY: 33 })
    fireEvent.mouseUp(grid, { clientX: 22, clientY: 33 })
    fireEvent.click(screen.getByRole('button', { name: 'Red' }))

    expect(useDesignerStore.getState().paintedSquares).toHaveLength(9)
  })

  it('does not open the paint dialog for a drag while a block is selected to place', () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    act(() => {
      useDesignerStore.getState().selectBlockToPlace(pixie)
    })
    fireEvent.mouseDown(grid, { clientX: 22, clientY: 33 })
    fireEvent.mouseMove(grid, { clientX: 44, clientY: 55 })
    fireEvent.mouseUp(grid, { clientX: 44, clientY: 55 })

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(useDesignerStore.getState().paintedSquares).toEqual([])
  })

  it('cancels an in-progress drag on mouse leave', () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    fireEvent.mouseDown(grid, { clientX: 22, clientY: 33 })
    fireEvent.mouseMove(grid, { clientX: 44, clientY: 55 })
    fireEvent.mouseLeave(grid)
    fireEvent.mouseUp(grid, { clientX: 44, clientY: 55 })

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('previews the drag rectangle while dragging', () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    fireEvent.mouseDown(grid, { clientX: 22, clientY: 33 })
    fireEvent.mouseMove(grid, { clientX: 44, clientY: 55 })

    const preview = screen.getByTestId('paint-hover-preview')
    expect(preview).toHaveStyle({
      left: '22px',
      top: '33px',
      width: '33px',
      height: '33px',
    })
  })

  it('clears the paint preview on mouse leave', () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    fireEvent.mouseMove(grid, { clientX: 22, clientY: 33 })
    expect(screen.getByTestId('paint-hover-preview')).toBeInTheDocument()

    fireEvent.mouseLeave(grid)
    expect(screen.queryByTestId('paint-hover-preview')).not.toBeInTheDocument()
  })

  it('move: grabbing a placed block via its toolbar re-places it elsewhere via the normal placement flow', async () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    act(() => {
      useDesignerStore.getState().selectBlockToPlace(pixie)
    })
    fireEvent.click(grid, { clientX: 22, clientY: 33 })

    const placedWrapper = screen.getByTitle('Cornish Pixie')
    await userEvent.hover(placedWrapper)
    fireEvent.click(
      await screen.findByRole('button', { name: /wingardium leviosa/i }),
    )

    // grabbed: removed from the grid, now pending in the sidebar-style flow
    expect(screen.queryByTitle('Cornish Pixie')).not.toBeInTheDocument()
    expect(useDesignerStore.getState().blockToPlace?.block).toBe(pixie)

    // re-place it at a new cell (5, 6) => (55, 66)
    fireEvent.click(grid, { clientX: 55, clientY: 66 })

    const movedWrapper = screen.getByTitle('Cornish Pixie')
    expect(movedWrapper).toHaveStyle({ left: '55px', top: '66px' })
  })

  it('recolor: opens from the toolbar and applies the chosen part color on save', async () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    act(() => {
      useDesignerStore.getState().selectBlockToPlace(pixie)
    })
    fireEvent.click(grid, { clientX: 22, clientY: 33 })

    await userEvent.hover(screen.getByTitle('Cornish Pixie'))
    fireEvent.click(await screen.findByRole('button', { name: /colovaria/i }))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /Wings/ }))
    fireEvent.click(screen.getByRole('button', { name: 'Red' }))
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    const [placed] = useDesignerStore.getState().placedBlocks
    expect(placed.colorOverrides).toEqual({
      wings: { color: '#F44336', type: 'fill' },
    })
  })
})
