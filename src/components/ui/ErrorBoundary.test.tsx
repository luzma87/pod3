import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ErrorBoundary from './ErrorBoundary'

function Bomb({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error('boom')
  return <p>safe content</p>
}

// React logs caught errors to the console in dev mode; keep test output
// clean without hiding real assertion failures.
beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
})
afterEach(() => {
  vi.restoreAllMocks()
})

describe('ErrorBoundary', () => {
  it('renders children normally when nothing throws', () => {
    render(
      <ErrorBoundary fallback={() => <p>fallback</p>}>
        <Bomb shouldThrow={false} />
      </ErrorBoundary>,
    )
    expect(screen.getByText('safe content')).toBeInTheDocument()
  })

  it('renders the fallback instead of crashing when a child throws', () => {
    render(
      <ErrorBoundary fallback={() => <p>fallback</p>}>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    )
    expect(screen.getByText('fallback')).toBeInTheDocument()
    expect(screen.queryByText('safe content')).not.toBeInTheDocument()
  })

  it('reports the error via onError', () => {
    const onError = vi.fn()
    render(
      <ErrorBoundary fallback={() => <p>fallback</p>} onError={onError}>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    )
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'boom' }),
      expect.anything(),
    )
  })

  it('clicking the fallback-provided retry button re-attempts rendering the children', async () => {
    const { rerender } = render(
      <ErrorBoundary
        fallback={(retry) => <button onClick={retry}>Try again</button>}
      >
        <Bomb shouldThrow />
      </ErrorBoundary>,
    )
    expect(
      screen.getByRole('button', { name: 'Try again' }),
    ).toBeInTheDocument()

    // fix the underlying condition, then retry — mirrors a real recovery
    // where the crashing data has since changed
    rerender(
      <ErrorBoundary
        fallback={(retry) => <button onClick={retry}>Try again</button>}
      >
        <Bomb shouldThrow={false} />
      </ErrorBoundary>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Try again' }))

    expect(screen.getByText('safe content')).toBeInTheDocument()
  })

  it('auto-recovers when a resetKey changes after an error', () => {
    const { rerender } = render(
      <ErrorBoundary fallback={() => <p>fallback</p>} resetKeys={['a']}>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    )
    expect(screen.getByText('fallback')).toBeInTheDocument()

    rerender(
      <ErrorBoundary fallback={() => <p>fallback</p>} resetKeys={['b']}>
        <Bomb shouldThrow={false} />
      </ErrorBoundary>,
    )

    expect(screen.getByText('safe content')).toBeInTheDocument()
  })

  it('does not reset when resetKeys stay the same', () => {
    const { rerender } = render(
      <ErrorBoundary fallback={() => <p>fallback</p>} resetKeys={['a']}>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    )
    expect(screen.getByText('fallback')).toBeInTheDocument()

    rerender(
      <ErrorBoundary fallback={() => <p>fallback</p>} resetKeys={['a']}>
        <Bomb shouldThrow={false} />
      </ErrorBoundary>,
    )

    expect(screen.getByText('fallback')).toBeInTheDocument()
  })
})
