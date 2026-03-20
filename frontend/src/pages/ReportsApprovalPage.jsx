import { useMemo, useState } from 'react'

const rows = [
  {
    doctorName: 'dr Jan Kowalski',
    role: 'Specjalista Kardiolog',
    period: 'Wrzesień 2023',
    proceduresCount: 42,
    status: 'pending',
  },
  {
    doctorName: 'dr Maria Wiśniewska',
    role: 'Rezydent',
    period: 'Październik 2023',
    proceduresCount: 18,
    status: 'review',
  },
  {
    doctorName: 'dr Piotr Zieliński',
    role: 'Lekarz dyżurny',
    period: 'Listopad 2023',
    proceduresCount: 112,
    status: 'pending',
  },
]

const statusLabel = {
  pending: 'Oczekuje',
  review: 'W trakcie weryfikacji',
  approved: 'Zatwierdzony',
}

const statusOptions = [
  { value: 'all', label: 'Wszystkie statusy' },
  { value: 'pending', label: 'Oczekuje' },
  { value: 'review', label: 'W trakcie weryfikacji' },
  { value: 'approved', label: 'Zatwierdzony' },
]

function ReportsApprovalPage() {
  const [searchDoctor, setSearchDoctor] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredRows = useMemo(() => {
    const needle = searchDoctor.trim().toLowerCase()

    return rows.filter((row) => {
      const matchesDoctor = needle
        ? row.doctorName.toLowerCase().includes(needle)
        : true
      const matchesStatus = statusFilter === 'all' || row.status === statusFilter
      return matchesDoctor && matchesStatus
    })
  }, [searchDoctor, statusFilter])

  return (
    <div className="page-stack">
      <section className="card">
        <div className="filters">
          <div className="field">
            <span className="field__label">Miesiąc</span>
            <select className="input select">
              <option>Wszystkie</option>
              <option>Styczeń</option>
              <option>Luty</option>
              <option>Marzec</option>
              <option>Kwiecień</option>
              <option>Maj</option>
              <option>Czerwiec</option>
              <option>Lipiec</option>
              <option>Sierpień</option>
              <option>Wrzesień</option>
              <option>Październik</option>
              <option>Listopad</option>
              <option>Grudzień</option>
            </select>
          </div>
          <div className="field">
            <span className="field__label">Rok</span>
            <select className="input select">
              <option>Wszystkie</option>
              <option>2026</option>
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>
          <div className="field">
            <span className="field__label">Szukaj lekarza</span>
            <input
              className="input"
              type="search"
              placeholder="Wpisz imię, nazwisko"
              value={searchDoctor}
              onChange={(e) => setSearchDoctor(e.target.value)}
            />
          </div>
          <div className="field">
            <span className="field__label">Oddział</span>
            <select className="input select">
              <option>Kardiologia</option>
              <option>Chirurgia</option>
              <option>Neurologia</option>
            </select>
          </div>
          <div className="field">
            <span className="field__label">Status</span>
            <select
              className="input select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Lekarz</th>
                <th>Okres rozliczeniowy</th>
                <th className="text-center">Liczba procedur</th>
                <th>Status</th>
                <th className="text-right">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.doctorName}>
                  <td>
                    <div className="person">
                      <div className="avatar small" aria-hidden="true">
                        {row.doctorName
                          .split(' ')
                          .map((part) => part[0])
                          .join('')
                          .slice(0, 2)}
                      </div>
                      <div>
                        <div className="strong">{row.doctorName}</div>
                        <div className="muted small">{row.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="strong">{row.period}</td>
                  <td className="text-center strong">{row.proceduresCount}</td>
                  <td>
                    <span className={`badge status-${row.status}`}>
                      {statusLabel[row.status]}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="table-actions">
                      <button className="btn btn-ghost">Pobierz PDF</button>
                      <button className="btn btn-positive">Zatwierdź</button>
                      <button className="btn btn-danger">Odrzuć</button>
                      <button className="btn btn-text">Szczegóły</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <span>Wyświetlono 3 z 24 raportów</span>
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

export default ReportsApprovalPage
