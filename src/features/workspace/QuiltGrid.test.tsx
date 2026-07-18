import { act, fireEvent, render, screen } from '@testing-library/react'
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
    expect(grid).toHaveStyle({ width: '550px', height: '715px' })
  })

  it('floors partial-inch dimensions down to whole squares', () => {
    render(<QuiltGrid width={30.5} height={40.9} />)
    const grid = screen.getByTestId('quilt-grid')
    expect(grid).toHaveAttribute('data-columns', '30')
    expect(grid).toHaveAttribute('data-rows', '40')
  })

  it('does nothing when clicked with no block selected to place', () => {
    render(<QuiltGrid width={50} height={65} />)
    const grid = screen.getByTestId('quilt-grid')
    stubGridOrigin(grid)

    fireEvent.click(grid, { clientX: 22, clientY: 33 })

    expect(grid.children.length).toBe(0)
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

  it('shows no hover preview when no block is selected to place', () => {
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
})
