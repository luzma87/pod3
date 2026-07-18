import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import allBlocks from '../../assets/blocks/allBlocks'
import type { PlacedBlock } from '../../store/designerStore'
import { useDesignerStore } from '../../store/designerStore'
import PlacedBlockView from './PlacedBlockView'

const pixie = allBlocks.find((block) => block.name === 'Cornish Pixie')!

function makePlaced(overrides: Partial<PlacedBlock> = {}): PlacedBlock {
  return {
    instanceId: 'fbb1-1',
    block: pixie,
    position: { x: 2, y: 3 },
    rotation: 0,
    isFlipped: false,
    colorOverrides: {},
    ...overrides,
  }
}

describe('PlacedBlockView', () => {
  it('renders the block at its position, with no action toolbar until hovered', () => {
    const placed = makePlaced()
    render(<PlacedBlockView placed={placed} onRecolor={vi.fn()} />)

    const wrapper = screen.getByTestId(`placed-block-${placed.instanceId}`)
    expect(wrapper).toHaveStyle({ left: '22px', top: '33px' })
    expect(
      screen.queryByRole('button', { name: /flipendo/i }),
    ).not.toBeInTheDocument()
  })

  it('shows the action toolbar on hover, and hides it again on mouse leave', async () => {
    const placed = makePlaced()
    render(<PlacedBlockView placed={placed} onRecolor={vi.fn()} />)
    const wrapper = screen.getByTestId(`placed-block-${placed.instanceId}`)

    await userEvent.hover(wrapper)
    expect(
      await screen.findByRole('button', { name: /flipendo/i }),
    ).toBeInTheDocument()

    await userEvent.unhover(wrapper)
    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: /flipendo/i }),
      ).not.toBeInTheDocument()
    })
  })

  it('flip/rotate/delete buttons call the matching store actions', async () => {
    useDesignerStore.getState().selectBlockToPlace(pixie)
    useDesignerStore.getState().placeBlockAt(2, 3)
    const [placed] = useDesignerStore.getState().placedBlocks
    render(<PlacedBlockView placed={placed} onRecolor={vi.fn()} />)

    await userEvent.hover(
      screen.getByTestId(`placed-block-${placed.instanceId}`),
    )
    await userEvent.click(
      await screen.findByRole('button', { name: /flipendo/i }),
    )
    expect(useDesignerStore.getState().placedBlocks[0].isFlipped).toBe(true)

    await userEvent.click(screen.getByRole('button', { name: /circumrota/i }))
    expect(useDesignerStore.getState().placedBlocks[0].rotation).toBe(90)

    await userEvent.click(screen.getByRole('button', { name: /evanesco/i }))
    expect(useDesignerStore.getState().placedBlocks).toEqual([])
  })

  it('the move button grabs the block into blockToPlace and removes it from the grid', async () => {
    useDesignerStore.getState().selectBlockToPlace(pixie)
    useDesignerStore.getState().placeBlockAt(2, 3)
    const [placed] = useDesignerStore.getState().placedBlocks
    render(<PlacedBlockView placed={placed} onRecolor={vi.fn()} />)

    await userEvent.hover(
      screen.getByTestId(`placed-block-${placed.instanceId}`),
    )
    await userEvent.click(
      await screen.findByRole('button', { name: /wingardium leviosa/i }),
    )

    expect(useDesignerStore.getState().placedBlocks).toEqual([])
    expect(useDesignerStore.getState().blockToPlace?.block).toBe(pixie)
  })

  it('the recolor button calls onRecolor instead of a store action', async () => {
    const onRecolor = vi.fn()
    const placed = makePlaced()
    render(<PlacedBlockView placed={placed} onRecolor={onRecolor} />)

    await userEvent.hover(
      screen.getByTestId(`placed-block-${placed.instanceId}`),
    )
    await userEvent.click(
      await screen.findByRole('button', { name: /colovaria/i }),
    )

    expect(onRecolor).toHaveBeenCalledOnce()
  })

  it('applies colorOverrides to the matching SVG parts by class name', () => {
    const placed = makePlaced({
      colorOverrides: { wings: { color: '#123456', type: 'fill' } },
    })
    const { container } = render(
      <PlacedBlockView placed={placed} onRecolor={vi.fn()} />,
    )

    const wings = container.getElementsByClassName('wings')
    expect(wings.length).toBeGreaterThan(0)
    Array.from(wings).forEach((el) => {
      expect(el).toHaveAttribute('fill', '#123456')
    })
  })
})
