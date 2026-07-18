import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import AttributionsPage from './AttributionsPage'

describe('AttributionsPage', () => {
  it('lists the ghost artwork attribution with its author and links', () => {
    render(<AttributionsPage />)
    expect(screen.getByText('Attributions')).toBeInTheDocument()
    expect(
      screen.getByText('Ghost with hat by Piyaporn Teannawa'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Ghost with hat' }),
    ).toBeInTheDocument()

    const sourceLink = screen.getByRole('link', {
      name: 'Halloween PNGs by Vecteezy',
    })
    expect(sourceLink).toHaveAttribute(
      'href',
      'https://www.vecteezy.com/free-png/halloween',
    )
    expect(sourceLink).toHaveAttribute('target', '_blank')

    const directLink = screen.getByRole('link', {
      name: 'Direct link to the asset',
    })
    expect(directLink).toHaveAttribute(
      'href',
      'https://www.vecteezy.com/png/70173473-ghost-with-hat',
    )
    expect(directLink).toHaveAttribute('target', '_blank')
  })
})
