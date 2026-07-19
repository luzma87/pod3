import { Route, Routes } from 'react-router'
import AttributionsPage from './routes/AttributionsPage'
import DesignerPage from './routes/DesignerPage'
import IconPickerPage from './routes/IconPickerPage'
import NotFoundPage from './routes/NotFoundPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DesignerPage />} />
      <Route path="/attributions" element={<AttributionsPage />} />
      {/* temporary, unlinked — see docs/icons.md, delete once icons are finalized */}
      <Route path="/dev/icons" element={<IconPickerPage />} />
      <Route path="/:quiltId" element={<DesignerPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
