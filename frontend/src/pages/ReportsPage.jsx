import { Link } from 'react-router-dom'

const reports = [
  {
    period: 'Październik 2023',
    sentAt: '02.11.2023, 10:45',
    proceduresCount: 142,
    value: '8 420,00 PLN',
    status: 'approved',
  },
  {
    period: 'Listopad 2023',
    sentAt: '01.12.2023, 09:15',
    proceduresCount: 98,
    value: '6 150,00 PLN',
    status: 'review',
  },
  {
    period: 'Wrzesień 2023',
    sentAt: '04.10.2023, 14:22',
    proceduresCount: 115,
    value: '7 200,00 PLN',
    status: 'needs-fix',
  },
  {
    period: 'Grudzień 2023',
    sentAt: 'Brak',
    proceduresCount: '45 (roboczy)',
    value: '3 100,00 PLN',
    status: 'sent',
  },
]

const statusLabel = {
  approved: 'Zatwierdzony',
  review: 'W trakcie weryfikacji',
  'needs-fix': 'Wymaga poprawy',
  sent: 'Wysłany',
}

function ReportsPage() {
  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Raporty</p>
          <h1 className="page-title">Zestawienia okresowe</h1>
          <p className="page-subtitle">
            Przeglądaj wysłane raporty, śledź status oraz pobieraj pliki PDF.
          </p>
        </div>
        <div className="actions">
          <Link className="btn btn-primary" to="/raporty/nowy">
            Nowy raport
          </Link>
        </div>
      </header>

      <section className="card">
        <div className="filters">
          <div className="field">
            <span className="field__label">Data od</span>
            <input className="input" type="date" />
          </div>
          <div className="field">
            <span className="field__label">Data do</span>
            <input className="input" type="date" />
          </div>
          <div className="field">
            <span className="field__label">Status</span>
            <select className="input select">
              <option>Wszystkie statusy</option>
              <option>Zatwierdzony</option>
              <option>W trakcie weryfikacji</option>
              <option>Wymaga poprawy</option>
              <option>Wysłany</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Okres rozliczeniowy</th>
                <th>Data wysłania</th>
                <th>Liczba procedur</th>
                <th className="text-right">Wartość</th>
                <th>Status</th>
                <th className="text-right">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.period}>
                  <td className="strong">{report.period}</td>
                  <td>{report.sentAt}</td>
                  <td>{report.proceduresCount}</td>
                  <td className="text-right strong">{report.value}</td>
                  <td>
                    <span className={`badge status-${report.status}`}>
                      {statusLabel[report.status]}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="table-actions">
                      <button className="btn btn-ghost">Pobierz</button>
                      <button className="btn btn-text">Szczegóły</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <span>Pokazano 1-4 z 24 raportów</span>
          <div className="pagination">
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

export default ReportsPage
