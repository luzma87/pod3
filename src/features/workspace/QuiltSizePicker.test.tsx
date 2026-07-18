import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import QuiltSizePicker from './QuiltSizePicker'

describe('QuiltSizePicker', () => {
  it('lists all quilt sizes with name and dimensions', () => {
    render(<QuiltSizePicker value="throw" onChange={vi.fn()} />)
    expect(
      screen.getByRole('option', { name: 'Throw [50"x65"]' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('option', { name: 'King Horizontal [108"x110"]' }),
    ).toBeInTheDocument()
  })

  it('calls onChange with the selected size key', async () => {
    const onChange = vi.fn()
    render(<QuiltSizePicker value="throw" onChange={onChange} />)
    await userEvent.selectOptions(screen.getByRole('combobox'), 'king')
    expect(onChange).toHaveBeenCalledWith('king')
  })
})
