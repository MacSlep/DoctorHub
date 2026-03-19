const entries = [
  {
    date: '02.10.2023',
    code: '89.522',
    procedure: 'Elektrokardiogram z 12 lub więcej odprowadzeniami (EKG)',
    quantity: 14,
  },
  {
    date: '05.10.2023',
    code: '88.721',
    procedure: 'Echokardiografia serca - badanie przezklatkowe (Echo)',
    quantity: 8,
  },
  {
    date: '12.10.2023',
    code: '89.541',
    procedure: 'Monitorowanie Holtera - rytmu serca (24h-48h)',
    quantity: 5,
  },
  {
    date: '20.10.2023',
    code: '89.522',
    procedure: 'Elektrokardiogram z 12 lub więcej odprowadzeniami (EKG)',
    quantity: 12,
  },
]

function ReportPreviewPage() {
  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Raport</p>
          <h1 className="page-title">Raport aktywności medycznej</h1>
          <p className="page-subtitle">
            Podgląd dokumentu wygenerowanego na podstawie Twoich aktywności w
            październiku 2023.
          </p>
        </div>
        <div className="actions">
          <button className="btn btn-primary">Złóż raport</button>
          <button className="btn btn-ghost">Pobierz PDF</button>
          <button className="btn btn-text">Drukuj</button>
        </div>
      </header>

      <div className="grid two-columns">
        <aside className="card">
          <h2 className="card-title">Status raportu</h2>
          <p className="muted">
            Ten raport został automatycznie wygenerowany na podstawie aktywności
            w systemie DoctorHub.
          </p>
          <div className="status-row">
            <span className="dot dot-primary" />
            <span className="muted small">Zweryfikowany</span>
          </div>

          <div className="divider" />

          <button className="btn btn-primary full">Wyślij raport</button>
          <button className="btn btn-ghost full">Udostępnij</button>
        </aside>

        <section className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Dane raportu</p>
              <h2 className="card-title">Raport: DH-2023-10-JK</h2>
              <p className="muted">Okres rozliczeniowy: 01.10.2023 - 31.10.2023</p>
            </div>
            <div className="badge status-zatwierdzony">Zweryfikowany</div>
          </div>

          <div className="summary-grid">
            <div className="summary">
              <p className="eyebrow">Specjalista</p>
              <p className="strong">dr n. med. Jan Kowalski</p>
              <p className="muted small">Kardiologia inwazyjna</p>
            </div>
            <div className="summary">
              <p className="eyebrow">Czas pracy (est.)</p>
              <p className="strong">164h</p>
              <p className="muted small">Na podstawie wprowadzonych aktywności</p>
            </div>
            <div className="summary">
              <p className="eyebrow">Unikalne kody</p>
              <p className="strong">3</p>
              <p className="muted small">ICD-9 w tym okresie</p>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Kod ICD-9</th>
                  <th>Procedura</th>
                  <th className="text-right">Ilość</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={`${entry.date}-${entry.code}`}>
                    <td>{entry.date}</td>
                    <td className="strong">{entry.code}</td>
                    <td>{entry.procedure}</td>
                    <td className="text-right strong">{entry.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="summary-grid">
            <div className="summary">
              <p className="eyebrow">Suma procedur</p>
              <p className="strong">39</p>
            </div>
            <div className="summary">
              <p className="eyebrow">Data wygenerowania</p>
              <p className="strong">02.11.2023, 14:35</p>
            </div>
            <div className="summary">
              <p className="eyebrow">Podpis</p>
              <p className="muted small">J. Kowalski — podpis elektroniczny</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ReportPreviewPage
