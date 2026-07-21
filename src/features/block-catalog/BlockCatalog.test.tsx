import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import allBlocks from '../../assets/blocks/allBlocks'
import BlockCatalog from './BlockCatalog'

describe('BlockCatalog', () => {
  it('shows every block by default, grouped under all six category headers', () => {
    render(<BlockCatalog />)
    expect(screen.getByText(`${allBlocks.length} blocks`)).toBeInTheDocument()
    expect(
      screen.getAllByRole('button', { name: 'Cornish Pixie' }).length,
    ).toBeGreaterThan(0)
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
    expect(
      screen.getByRole('button', { name: 'Mimbulus Mimbletonia' }),
    ).toBeInTheDocument()

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

  it('still finds a block when the search has a typo', async () => {
    render(<BlockCatalog />)
    await userEvent.type(screen.getByRole('searchbox'), 'mimbulis')
    expect(screen.getByText('1 block')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Mimbulus Mimbletonia' }),
    ).toBeInTheDocument()
  })

  it('shows a suggestions dropdown and fills the search box when a suggestion is clicked', async () => {
    render(<BlockCatalog />)
    const searchbox = screen.getByRole('searchbox')
    await userEvent.type(searchbox, 'mimbul')

    const listbox = screen.getByRole('listbox')
    const option = screen.getByRole('option', { name: 'mimbulus' })
    expect(listbox).toBeInTheDocument()

    await userEvent.click(option)
    expect(searchbox).toHaveValue('mimbulus')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(screen.getByText('1 block')).toBeInTheDocument()
  })

  it('closes the suggestions dropdown on Enter without a suggestion highlighted', async () => {
    render(<BlockCatalog />)
    const searchbox = screen.getByRole('searchbox')
    await userEvent.type(searchbox, 'mimbul')
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    await userEvent.keyboard('{Enter}')

    expect(searchbox).toHaveValue('mimbul')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('selects the highlighted suggestion with the keyboard', async () => {
    render(<BlockCatalog />)
    const searchbox = screen.getByRole('searchbox')
    await userEvent.type(searchbox, 'mimbul')

    await userEvent.keyboard('{ArrowDown}{Enter}')

    expect(searchbox).toHaveValue('mimbulus')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
})
