import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ColorSwatchPicker from './ColorSwatchPicker'

describe('ColorSwatchPicker', () => {
  it('calls onSelect with a swatch color when a preset is clicked', () => {
    const onSelect = vi.fn()
    render(<ColorSwatchPicker currentColor="#000000" onSelect={onSelect} />)

    fireEvent.click(screen.getByRole('button', { name: 'Red' }))

    expect(onSelect).toHaveBeenCalledWith('#F44336')
  })

  it('calls onSelect with an arbitrary color chosen from the custom color input', () => {
    const onSelect = vi.fn()
    render(<ColorSwatchPicker currentColor="#000000" onSelect={onSelect} />)

    fireEvent.change(screen.getByLabelText('Custom color'), {
      target: { value: '#123abc' },
    })

    expect(onSelect).toHaveBeenCalledWith('#123abc')
  })

  it('reflects currentColor as the custom color input value', () => {
    const { rerender } = render(
      <ColorSwatchPicker currentColor="#123abc" onSelect={vi.fn()} />,
    )

    expect(screen.getByLabelText('Custom color')).toHaveValue('#123abc')

    rerender(<ColorSwatchPicker currentColor="#ff0000" onSelect={vi.fn()} />)

    expect(screen.getByLabelText('Custom color')).toHaveValue('#ff0000')
  })
})
