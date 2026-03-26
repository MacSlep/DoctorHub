import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout.jsx'
import LoginPage from './pages/LoginPage.jsx'
import MyActivitiesPage from './pages/MyActivitiesPage.jsx'
import NewReportPage from './pages/NewReportPage.jsx'
import ReportPreviewPage from './pages/ReportPreviewPage.jsx'
import ReportsApprovalPage from './pages/ReportsApprovalPage.jsx'
import ReportsPage from './pages/ReportsPage.jsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/raporty" replace />} />
        <Route path="/raporty" element={<ReportsPage />} />
        <Route path="/raporty/akceptacja" element={<ReportsApprovalPage />} />
        <Route path="/moje-aktywnosci" element={<MyActivitiesPage />} />
        <Route path="/nowy-raport" element={<NewReportPage />} />
        <Route path="/nowy-raport/podglad" element={<ReportPreviewPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/raporty" replace />} />
    </Routes>
  )
}

export default App
