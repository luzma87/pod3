import { Route, Routes } from 'react-router'
import AttributionsPage from './routes/AttributionsPage'
import DesignerPage from './routes/DesignerPage'
import NotFoundPage from './routes/NotFoundPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DesignerPage />} />
      <Route path="/attributions" element={<AttributionsPage />} />
      <Route path="/:quiltId" element={<DesignerPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
