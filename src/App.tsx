import { BrowserRouter } from 'react-router'
import AppRoutes from './app/AppRoutes'
import Layout from './app/Layout'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  )
}

export default App
