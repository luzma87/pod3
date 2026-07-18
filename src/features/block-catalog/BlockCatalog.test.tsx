import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import allBlocks from '../../assets/blocks/allBlocks'
import BlockCatalog from './BlockCatalog'

describe('BlockCatalog', () => {
  it('shows every block by default, grouped under all six category headers', () => {
    render(<BlockCatalog />)
    expect(screen.getByText(`${allBlocks.length} blocks`)).toBeInTheDocument()
    expect(screen.getAllByTitle('Cornish Pixie').length).toBeGreaterThan(0)
    ;[
      'Weekly',
      'Supplemental',
      'Top & Sides',
      'Other',
      'Beasts',
      'Disney',
    ].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('narrows the list and its category headers when searching', async () => {
    render(<BlockCatalog />)
    await userEvent.type(screen.getByRole('searchbox'), 'mimbulus')
    expect(screen.getByText('1 block')).toBeInTheDocument()
    expect(screen.getByTitle('Mimbulus Mimbletonia')).toBeInTheDocument()

    // Mimbulus Mimbletonia is the only match, and it's in the "Other" category
    expect(screen.getByText('Other')).toBeInTheDocument()
    expect(screen.queryByText('Beasts')).not.toBeInTheDocument()
    expect(screen.queryByText('Weekly')).not.toBeInTheDocument()
  })

  it('shows a zero count and no category headers for an unmatched search', async () => {
    render(<BlockCatalog />)
    await userEvent.type(screen.getByRole('searchbox'), 'zzz-nonexistent-zzz')
    expect(screen.getByText('0 blocks')).toBeInTheDocument()
    expect(screen.queryByText('Other')).not.toBeInTheDocument()
  })
})
