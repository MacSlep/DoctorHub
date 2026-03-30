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
        brandTitle="PANEL LEKARZA"
        brandSubtitle="Anna Kowalska"
        navLinks={navLinks}
        onLogout={() => {
          // TODO: zastąp to prawdziwą akcją wylogowania (np. clear token, redirect)
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
