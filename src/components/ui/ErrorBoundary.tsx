import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback: (retry: () => void) => ReactNode
  // When provided, the boundary automatically clears its error state if any
  // key changes between renders (e.g. the data that caused the crash gets
  // replaced/removed) — same idea as react-error-boundary's `resetKeys`.
  resetKeys?: unknown[]
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  resetKeys?: unknown[]
}

function sameKeys(a: unknown[], b: unknown[]) {
  return (
    a.length === b.length &&
    a.every((value, index) => Object.is(value, b[index]))
  )
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    resetKeys: this.props.resetKeys,
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  // Handles clearing the error when resetKeys change, via derived state
  // (rather than a setState call inside componentDidUpdate) so it resolves
  // within the same render pass instead of scheduling a second one.
  static getDerivedStateFromProps(
    props: ErrorBoundaryProps,
    state: ErrorBoundaryState,
  ): Partial<ErrorBoundaryState> | null {
    if (sameKeys(state.resetKeys ?? [], props.resetKeys ?? [])) return null
    return {
      resetKeys: props.resetKeys,
      hasError: state.hasError ? false : state.hasError,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo)
  }

  retry = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.retry)
    }
    return this.props.children
  }
}

export default ErrorBoundary
