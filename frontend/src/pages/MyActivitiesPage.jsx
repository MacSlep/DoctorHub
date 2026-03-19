import { Link } from 'react-router-dom'

const activities = [
  {
    date: '19 Paź 2023',
    time: '08:30',
    activityType: 'Konsultacja',
    description: 'Anna Kowalska — kontrola pooperacyjna stentu',
    department: 'Kardiologia',
    status: 'primary',
  },
  {
    date: '19 Paź 2023',
    time: '10:15',
    activityType: 'Hospitalizacja',
    description: 'Marek Nowak — przyjęcie planowe, diagnostyka',
    department: 'Oddział wewnętrzny',
    status: 'info',
  },
  {
    date: '18 Paź 2023',
    time: '14:00',
    activityType: 'Zabieg',
    description: 'Jan Zieliński — aplikacja kardiowertera',
    department: 'Kardiochirurgia',
    status: 'danger',
  },
  {
    date: '18 Paź 2023',
    time: '16:45',
    activityType: 'Konsultacja',
    description: 'Zofia Wiśniewska — interpretacja wyników badań krwi',
    department: 'Kardiologia',
    status: 'primary',
  },
]

function MyActivitiesPage() {
  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Panel lekarza</p>
          <h1 className="page-title">Moje aktywności</h1>
          <p className="page-subtitle">
            Filtruj aktywności według daty, oddziału i typu. Wyniki są widoczne
            w tabeli poniżej.
          </p>
        </div>
        <Link className="btn btn-primary" to="/raporty/nowy">
          Nowy raport
        </Link>
      </header>

      <section className="card">
        <div className="filters">
          <div className="field">
            <span className="field__label">Data od</span>
            <input className="input" type="date" defaultValue="2023-10-12" />
          </div>
          <div className="field">
            <span className="field__label">Data do</span>
            <input className="input" type="date" defaultValue="2023-10-19" />
          </div>
          <div className="field">
            <span className="field__label">Oddział</span>
            <select className="input select">
              <option>Wszystkie oddziały</option>
              <option>Kardiologia</option>
              <option>Neurologia</option>
              <option>Onkologia</option>
            </select>
          </div>
          <div className="field">
            <span className="field__label">Typ aktywności</span>
            <div className="chip-row">
              <button className="chip active" type="button">
                Wszystko
              </button>
              <button className="chip" type="button">
                Wizyty
              </button>
              <button className="chip" type="button">
                Zabiegi
              </button>
            </div>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Godzina</th>
                <th>Typ aktywności</th>
                <th>Opis</th>
                <th>Oddział</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((item) => (
                <tr key={`${item.date}-${item.time}-${item.activityType}`}>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>
                    <span className={`badge badge-soft status-${item.status}`}>
                      {item.activityType}
                    </span>
                  </td>
                  <td>
                    <div className="strong">{item.description.split(' — ')[0]}</div>
                    <div className="muted small">
                      {item.description.split(' — ')[1] ?? ''}
                    </div>
                  </td>
                  <td className="muted">{item.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <span>Pokazano 4 z 128 wyników</span>
          <div className="pagination">
            <button className="page-btn">&lt;</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">&gt;</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MyActivitiesPage
