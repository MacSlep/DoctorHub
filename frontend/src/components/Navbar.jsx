import { NavLink } from 'react-router-dom'

function Navbar({ brandTitle, brandSubtitle, navLinks, onLogout }) {
  return (
    <header className="topbar">
      <div className="brand">
        <img src="/logo_dh.png" alt="DH" className="brand__mark" />
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
            className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="user">
        <button type="button" className="logout-button" onClick={onLogout}>
          Wyloguj
        </button>
      </div>
    </header>
  )
}

export default Navbar
