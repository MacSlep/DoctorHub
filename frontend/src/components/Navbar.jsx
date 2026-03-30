import { NavLink } from 'react-router-dom'

function Navbar({ brandTitle, brandSubtitle, navLinks, user }) {
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <div className="brand">
          <div className="brand__mark">
            <img
              src="/logo_dh.png"
              alt="DoctorHub Logo"
              className="brand__logo"
            />
          </div>
          <div className="brand__titles">
            <span className="brand__title">{brandTitle}</span>
            <span className="brand__subtitle">{brandSubtitle}</span>
          </div>
        </div>

        <nav className="nav">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav-pill${isActive ? ' nav-pill-active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="user-actions">
          <button className="btn-logout" type="button">
            Wyloguj
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
