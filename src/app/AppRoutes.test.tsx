import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import AppRoutes from './AppRoutes'

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )

describe('AppRoutes', () => {
  it('renders the designer with no quilt loaded at /', () => {
    renderAt('/')
    expect(screen.getByText(/no quilt loaded yet/i)).toBeInTheDocument()
  })

  it('renders the designer with the quilt id at /:quiltId', () => {
    renderAt('/my-quilt-123')
    expect(
      screen.getByText(/would load quilt "my-quilt-123"/i),
    ).toBeInTheDocument()
  })

  it('renders the not found page for unmatched nested paths', () => {
    renderAt('/some/nested/path')
    expect(screen.getByText('404')).toBeInTheDocument()
  })
})
