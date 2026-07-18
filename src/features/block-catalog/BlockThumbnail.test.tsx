import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import allBlocks from '../../assets/blocks/allBlocks'
import { useDesignerStore } from '../../store/designerStore'
import BlockThumbnail from './BlockThumbnail'

const pixie = allBlocks.find((block) => block.name === 'Cornish Pixie')!
const castleCorner = allBlocks.find((block) => block.name === 'Castle corner')!

describe('BlockThumbnail', () => {
  it('renders the block name and its SVG artwork', () => {
    const block = allBlocks[0]
    const { container } = render(<BlockThumbnail block={block} />)
    expect(screen.getByText(block.name)).toBeInTheDocument()
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('selects the block in the store on click, and shows itself as pressed', async () => {
    const block = allBlocks[0]
    render(<BlockThumbnail block={block} />)
    const button = screen.getByRole('button', { name: block.name })

    expect(button).toHaveAttribute('aria-pressed', 'false')
    await userEvent.click(button)

    expect(useDesignerStore.getState().blockToPlace?.block).toBe(block)
    expect(button).toHaveAttribute('aria-pressed', 'true')
  })

  it('deselects the block when clicked again', async () => {
    const block = allBlocks[0]
    render(<BlockThumbnail block={block} />)
    const button = screen.getByRole('button', { name: block.name })

    await userEvent.click(button)
    await userEvent.click(button)

    expect(useDesignerStore.getState().blockToPlace).toBeNull()
    expect(button).toHaveAttribute('aria-pressed', 'false')
  })

  it('shows the full name, size, and designer in a tooltip on hover', async () => {
    const user = userEvent.setup()
    render(<BlockThumbnail block={pixie} />)

    await user.hover(screen.getByRole('button', { name: pixie.name }))
    const tooltip = await screen.findByRole('tooltip')

    expect(tooltip).toHaveTextContent(pixie.name)
    expect(tooltip).toHaveTextContent(
      `${pixie.size.width}"x${pixie.size.height}"`,
    )
    expect(tooltip).toHaveTextContent(pixie.designer!)
  })

  it('omits the designer line for blocks with no recorded designer', async () => {
    const user = userEvent.setup()
    render(<BlockThumbnail block={castleCorner} />)

    await user.hover(screen.getByRole('button', { name: castleCorner.name }))
    const tooltip = await screen.findByRole('tooltip')

    expect(tooltip).toHaveTextContent(castleCorner.name)
    expect(tooltip).not.toHaveTextContent('Designer:')
  })
})
