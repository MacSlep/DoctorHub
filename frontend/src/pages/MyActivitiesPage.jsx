import { Link } from 'react-router-dom'

const activities = [
  {
    date: '19 Paź 2023',
    time: '08:30',
    procedure: 'Angio CT wieńcowe',
    modality: 'TK',
    status: 'approved',
    orderingUnit: 'Oddział Kardiologii',
    patientName: 'Anna Kowalska',
    pesel: '82041212345',
    lab: 'Pracownia TK',
  },
  {
    date: '19 Paź 2023',
    time: '10:15',
    procedure: 'USG Doppler kończyn dolnych',
    modality: 'USG',
    status: 'review',
    orderingUnit: 'Oddział Chorób Wewnętrznych',
    patientName: 'Marek Nowak',
    pesel: '90030598765',
    lab: 'Pracownia USG',
  },
  {
    date: '18 Paź 2023',
    time: '14:00',
    procedure: 'MRI serca z kontrastem',
    modality: 'MRI',
    status: 'needs-fix',
    orderingUnit: 'Kardiochirurgia',
    patientName: 'Jan Zieliński',
    pesel: '75012245678',
    lab: 'Pracownia MRI',
  },
  {
    date: '18 Paź 2023',
    time: '16:45',
    procedure: 'RTG klatki piersiowej',
    modality: 'RTG',
    status: 'pending',
    orderingUnit: 'Izba Przyjęć',
    patientName: 'Zofia Wiśniewska',
    pesel: '68091833456',
    lab: 'Pracownia RTG',
  },
]

const statusLabel = {
  approved: 'Zatwierdzona',
  review: 'Weryfikacja',
  'needs-fix': 'Do poprawy',
  pending: 'Robocza',
}

function MyActivitiesPage() {
  return (
    <div className="page-stack">
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
            <span className="field__label">Pracownia</span>
            <select className="input select">
              <option>Wszystkie pracownie</option>
              <option>Pracownia TK</option>
              <option>Pracownia USG</option>
              <option>Pracownia MRI</option>
              <option>Pracownia RTG</option>
            </select>
          </div>
          <div className="field">
            <span className="field__label">Modalność</span>
            <select className="input select">
              <option>Wszystkie modalności</option>
              <option>TK</option>
              <option>USG</option>
              <option>MRI</option>
              <option>RTG</option>
            </select>
          </div>
          <div className="field">
            <span className="field__label">Status aktywności</span>
            <select className="input select">
              <option>Wszystkie statusy</option>
              <option>Zatwierdzona</option>
              <option>Weryfikacja</option>
              <option>Do poprawy</option>
              <option>Robocza</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Data wykonania</th>
                <th>Godzina</th>
                <th>Nazwa badania / modalność</th>
                <th>Status aktywności</th>
                <th>Jednostka zlecająca</th>
                <th>Imię nazwisko pacjenta</th>
                <th>PESEL</th>
                <th>Pracownia</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((item) => (
                <tr key={`${item.date}-${item.time}-${item.patientName}`}>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>
                    <div className="strong">{item.procedure}</div>
                    <div className="muted small">{item.modality}</div>
                  </td>
                  <td>
                    <span className={`badge status-${item.status}`}>
                      {statusLabel[item.status] ?? item.status}
                    </span>
                  </td>
                  <td className="muted">{item.orderingUnit}</td>
                  <td className="strong">{item.patientName}</td>
                  <td className="muted">{item.pesel}</td>
                  <td className="muted">{item.lab}</td>
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
