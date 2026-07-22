import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import AppRoutes from './AppRoutes'

const loadQuiltMock = vi.fn()

vi.mock('../firebase/quilts', () => ({
  loadQuilt: (...args: unknown[]) => loadQuiltMock(...args),
}))

beforeEach(() => {
  loadQuiltMock.mockReset().mockResolvedValue(null)
})

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )

describe('AppRoutes', () => {
  it('renders the designer with no quilt loaded at /', () => {
    renderAt('/')
    expect(screen.getByText(/design a new quilt/i)).toBeInTheDocument()
  })

  it('renders the designer and attempts to load the quilt id at /:quiltId', async () => {
    renderAt('/my-quilt-123')
    expect(
      await screen.findByText(/doesn't match any saved design/i),
    ).toBeInTheDocument()
    expect(loadQuiltMock).toHaveBeenCalledWith('my-quilt-123')
  })

  it('renders the not found page for unmatched nested paths', () => {
    renderAt('/some/nested/path')
    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('renders the attributions page at /attributions, not the designer', () => {
    renderAt('/attributions')
    expect(screen.getByText('Attributions')).toBeInTheDocument()
  })
})
