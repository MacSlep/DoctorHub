import { NavLink } from 'react-router-dom'

function Navbar({ brandTitle, brandSubtitle, navLinks, user }) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand__mark">DH</div>
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
        <div className="user__meta">
          <span className="user__name">{user.name}</span>
          <span className="user__role">{user.role}</span>
        </div>
        <div className="avatar" aria-hidden="true">
          {user.initials}
        </div>
      </div>
    </header>
  )
}

export default Navbar
