import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'

const navLinks = [
  { to: '/moje-aktywnosci', label: 'Moje aktywności' },
  { to: '/raporty', label: 'Raporty' },
  { to: '/nowy-raport', label: 'Nowy raport' },
  { to: '/akceptacja', label: 'Akceptacja raportów' },
]

function AppLayout() {
  const { pathname } = useLocation()

  return (
    <div className="app-shell">
      <Navbar
        brandTitle="PANEL LEKARZA"
        brandSubtitle="Jan Kowalski"
        navLinks={navLinks}
        onLogout={() => {
          console.log('Wylogowano')
        }}
      />

      <main className="page" key={pathname}>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
