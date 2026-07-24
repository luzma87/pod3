import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import AttributionsPage from './AttributionsPage'

describe('AttributionsPage', () => {
  it('lists the ghost artwork attribution with its author and links', () => {
    render(<AttributionsPage />)
    expect(screen.getByText('Attributions')).toBeInTheDocument()
    expect(
      screen.getByText('Ghost with hat by Piyaporn Teannawa'),
    ).toBeInTheDocument()
    const ghostImage = screen.getByRole('img', { name: 'Ghost with hat' })
    expect(ghostImage).toBeInTheDocument()

    // scope to this attribution's own card — other entries share the same
    // "Halloween PNGs by Vecteezy" source link text
    const card = within(ghostImage.closest('li')!)

    const sourceLink = card.getByRole('link', {
      name: 'Halloween PNGs by Vecteezy',
    })
    expect(sourceLink).toHaveAttribute(
      'href',
      'https://www.vecteezy.com/free-png/halloween',
    )
    expect(sourceLink).toHaveAttribute('target', '_blank')

    const directLink = card.getByRole('link', {
      name: 'Direct link to the asset',
    })
    expect(directLink).toHaveAttribute(
      'href',
      'https://www.vecteezy.com/png/70173473-ghost-with-hat',
    )
    expect(directLink).toHaveAttribute('target', '_blank')
  })
})
