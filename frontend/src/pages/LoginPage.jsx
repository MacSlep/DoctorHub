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
        <div className="auth-card__header">
          <div className="auth-brand">DoctorHub</div>
          <p className="eyebrow">Panel medyczny</p>
          <h1>Witaj ponownie</h1>
          <p className="muted">
            Zaloguj się, aby zarządzać swoimi raportami i aktywnościami.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span className="field__label">ID medyczne lub e-mail</span>
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

          <label className="checkbox">
            <input type="checkbox" name="remember" />
            <span>Zapamiętaj to urządzenie</span>
          </label>

          <button type="submit" className="btn btn-primary">
            Zaloguj się
          </button>
        </form>

        <p className="helper-text">
          Brak konta? Skontaktuj się z administratorem, aby otrzymać dostęp.
        </p>
      </div>
    </div>
  )
}

export default LoginPage
