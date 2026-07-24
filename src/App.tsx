import { BrowserRouter } from 'react-router'
import AppRoutes from './app/AppRoutes'
import CrashFallback from './app/CrashFallback'
import Layout from './app/Layout'
import ErrorBoundary from './components/ui/ErrorBoundary'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <ErrorBoundary fallback={() => <CrashFallback />}>
          <AppRoutes />
        </ErrorBoundary>
      </Layout>
    </BrowserRouter>
  )
}

export default App
