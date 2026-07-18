import { Route, Routes } from 'react-router'
import DesignerPage from './routes/DesignerPage'
import NotFoundPage from './routes/NotFoundPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DesignerPage />} />
      <Route path="/:quiltId" element={<DesignerPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
