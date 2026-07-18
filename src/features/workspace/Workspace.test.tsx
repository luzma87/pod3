import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Workspace from './Workspace'

describe('Workspace', () => {
  it('defaults to the Throw size, with a matching summary and grid', () => {
    render(<Workspace />)
    expect(screen.getByRole('combobox', { name: 'Quilt size' })).toHaveValue(
      'throw',
    )
    expect(
      screen.getByText('50"x65" quilt, each square is 1"'),
    ).toBeInTheDocument()
    const grid = screen.getByTestId('quilt-grid')
    expect(grid).toHaveAttribute('data-columns', '50')
    expect(grid).toHaveAttribute('data-rows', '65')
  })

  it('resizes the grid and summary when a different size is picked', async () => {
    render(<Workspace />)
    await userEvent.selectOptions(screen.getByRole('combobox'), 'king')

    expect(
      screen.getByText('110"x108" quilt, each square is 1"'),
    ).toBeInTheDocument()
    const grid = screen.getByTestId('quilt-grid')
    expect(grid).toHaveAttribute('data-columns', '110')
    expect(grid).toHaveAttribute('data-rows', '108')
  })
})
