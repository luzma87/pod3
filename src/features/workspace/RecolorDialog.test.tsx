import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import allBlocks from '../../assets/blocks/allBlocks'
import type { PlacedBlock } from '../../store/designerStore'
import RecolorDialog from './RecolorDialog'

const pixie = allBlocks.find((block) => block.name === 'Cornish Pixie')!

function makePlaced(overrides: Partial<PlacedBlock> = {}): PlacedBlock {
  return {
    instanceId: 'fbb1-1',
    block: pixie,
    position: { x: 0, y: 0 },
    rotation: 0,
    isFlipped: false,
    colorOverrides: {},
    ...overrides,
  }
}

describe('RecolorDialog', () => {
  it('renders nothing when there is no block to recolor', () => {
    render(<RecolorDialog placed={null} onSave={vi.fn()} onClose={vi.fn()} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('discovers the recolorable parts of the block from its SVG class names', () => {
    render(
      <RecolorDialog
        placed={makePlaced()}
        onSave={vi.fn()}
        onClose={vi.fn()}
      />,
    )

    expect(
      screen.getByRole('button', { name: /Background/ }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Wings/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Pixie/ })).toBeInTheDocument()
  })

  it('picking a part then a swatch stages that color, applied on Save', async () => {
    const onSave = vi.fn()
    render(
      <RecolorDialog placed={makePlaced()} onSave={onSave} onClose={vi.fn()} />,
    )

    await userEvent.click(screen.getByRole('button', { name: /Wings/ }))
    await userEvent.click(screen.getByRole('button', { name: 'Red' }))
    await userEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        wings: { color: '#F44336', type: 'fill' },
      }),
    )
  })

  it('cancel closes without saving', async () => {
    const onSave = vi.fn()
    const onClose = vi.fn()
    render(
      <RecolorDialog placed={makePlaced()} onSave={onSave} onClose={onClose} />,
    )

    await userEvent.click(screen.getByRole('button', { name: /Wings/ }))
    await userEvent.click(screen.getByRole('button', { name: 'Red' }))
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(onSave).not.toHaveBeenCalled()
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('pre-seeds parts with any existing color overrides for the instance', () => {
    render(
      <RecolorDialog
        placed={makePlaced({
          colorOverrides: { wings: { color: '#2196F3', type: 'fill' } },
        })}
        onSave={vi.fn()}
        onClose={vi.fn()}
      />,
    )

    const wingsButton = screen.getByRole('button', { name: /Wings/ })
    const swatch = wingsButton.querySelector('span')
    expect(swatch).toHaveStyle({ backgroundColor: 'rgb(33, 150, 243)' })
  })
})
