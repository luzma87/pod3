import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import allBlocks from '../../assets/blocks/allBlocks'
import BlockThumbnail from './BlockThumbnail'

describe('BlockThumbnail', () => {
  it('renders the block name and its SVG artwork', () => {
    const block = allBlocks[0]
    const { container } = render(<BlockThumbnail block={block} />)
    expect(screen.getByText(block.name)).toBeInTheDocument()
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
