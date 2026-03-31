import { NavLink } from 'react-router-dom'

function Navbar({ brandTitle, userRole, userName, navLinks, onLogout }) {
  return (
    <header className="topbar">
      <div className="brand">
        <img src="/logo_dh.png" alt="DH" className="brand__mark" />
        <span className="brand__title">
          <span className="brand__title--doctor">Doctor</span><span className="brand__title--hub">Hub</span>
        </span>
      </div>

      <nav className="nav">
        <div className="nav-pill">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="user">
        <div className="user__meta">
          <p className="user__role">{userRole}</p>
          <p className="user__name">{userName}</p>
        </div>

        <button type="button" className="logout-button" onClick={onLogout}>
          <span className="material-symbols-outlined">logout</span>
          <span>Wyloguj</span>
        </button>
      </div>
    </header>
  )
}

export default Navbar
