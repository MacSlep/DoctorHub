import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'

const navLinks = [
  { to: '/moje-aktywnosci', label: 'Moje aktywności' },
  { to: '/raporty', label: 'Raporty' },
  { to: '/raporty/akceptacja', label: 'Akceptacja raportów' },
]

function AppLayout() {
  const { pathname } = useLocation()

  return (
    <div className="app-shell">
      <Navbar
        brandTitle="DoctorHub"
        brandSubtitle="Panel lekarza"
        navLinks={navLinks}
        user={{ name: 'dr n. med. Jan Kowalski', role: 'Kardiologia', initials: 'JK' }}
      />

      <main className="page" key={pathname}>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
