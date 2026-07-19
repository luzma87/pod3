import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import MajorGridLinesPicker from './MajorGridLinesPicker'

describe('MajorGridLinesPicker', () => {
  it('lists off and the 5"/10" interval options', () => {
    render(<MajorGridLinesPicker value={0} onChange={vi.fn()} />)
    expect(screen.getByRole('option', { name: 'Off' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Every 5"' })).toBeInTheDocument()
    expect(
      screen.getByRole('option', { name: 'Every 10"' }),
    ).toBeInTheDocument()
  })

  it('calls onChange with the selected interval as a number', async () => {
    const onChange = vi.fn()
    render(<MajorGridLinesPicker value={0} onChange={onChange} />)
    await userEvent.selectOptions(screen.getByRole('combobox'), 'Every 10"')
    expect(onChange).toHaveBeenCalledWith(10)
  })
})
