import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import QuiltGrid from './QuiltGrid'

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
})
