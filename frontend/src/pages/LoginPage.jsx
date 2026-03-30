import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/raporty')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Branding Section */}
        <div className="auth-card__branding">
          <img 
            alt="DoctorHub Logo" 
            className="auth-logo" 
            src="/logo_dh.png" 
          />
          <div className="auth-card__brand-text">
            <span className="auth-brand-main">Doctor</span>
            <span className="auth-brand-accent">Hub</span>
          </div>
        </div>

        {/* Welcome Header */}
        <header className="auth-card__header">
          <h1>Witaj!</h1>
          <p className="muted">
            Zaloguj się, aby zarządzać swoimi raportami i aktywnościami.
          </p>
        </header>

        {/* Login Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span className="field__label">ID lub e-mail</span>
            <input
              className="input"
              name="login"
              placeholder="np. lekarz@doctorhub.pl"
              type="email"
              required
            />
          </label>

          <label className="field">
            <span className="field__label">Hasło</span>
            <input
              className="input"
              name="password"
              placeholder="••••••••"
              type="password"
              required
            />
            <div className="field__hint">
              <a href="#" className="link">
                Nie pamiętasz hasła?
              </a>
            </div>
          </label>

          <button type="submit" className="btn btn-primary full">
            Zaloguj się
          </button>
        </form>

        {/* Footer */}
        <footer className="auth-card__footer">
          <p className="helper-text">
            Brak konta? Skontaktuj się z administratorem, aby otrzymać dostęp.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default LoginPage
