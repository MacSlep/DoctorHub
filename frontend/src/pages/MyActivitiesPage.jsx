import { useState, useEffect } from 'react'
import { fetchActivities } from '../api/activitiesApi'

// Mock data structure matching ActivityResponse from backend
const mockActivities = [
  {
    id: 'ZL001',
    examinationDate: new Date('2023-10-19T08:30:00'),
    examinationName: 'Angio CT wieńcowe',
    status: 'approved',
    patientName: 'Anna Kowalska',
    patientPesel: '82041212345',
    executingUnitName: 'Oddział Kardiologii',
    source: 'oracle',
  },
  {
    id: 'ZL002',
    examinationDate: new Date('2023-10-19T10:15:00'),
    examinationName: 'USG Doppler kończyn dolnych',
    status: 'review',
    patientName: 'Marek Nowak',
    patientPesel: '90030598765',
    executingUnitName: 'Oddział Chorób Wewnętrznych',
    source: 'oracle',
  },
  {
    id: 'ZL003',
    examinationDate: new Date('2023-10-18T14:00:00'),
    examinationName: 'MRI serca z kontrastem',
    status: 'needs-fix',
    patientName: 'Jan Zieliński',
    patientPesel: '75012245678',
    executingUnitName: 'Kardiochirurgia',
    source: 'oracle',
  },
  {
    id: 'ZL004',
    examinationDate: new Date('2023-10-18T16:45:00'),
    examinationName: 'RTG klatki piersiowej',
    status: 'pending',
    patientName: 'Zofia Wiśniewska',
    patientPesel: '68091833456',
    executingUnitName: 'Izba Przyjęć',
    source: 'oracle',
  },
]

const statusLabel = {
  approved: 'Zatwierdzona',
  review: 'Weryfikacja',
  'needs-fix': 'Do poprawy',
  pending: 'Robocza',
}

// Format date and time for display
const formatDateTime = (date) => {
  const d = new Date(date)
  return {
    date: d.toLocaleDateString('pl-PL'),
    time: d.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
  }
}

function MyActivitiesPage() {
  const [activities, setActivities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(mockActivities.length)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const loadActivities = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const uzyId = 10802 // TODO: Get from user context/auth context later
        const result = await fetchActivities(uzyId, page, pageSize)
        setActivities(result.data)
        setTotal(result.total)
        setTotalPages(result.totalPages)
      } catch (err) {
        setError(err.message)
        console.error('Failed to load activities:', err)
        // Keep mock data on error for UI testing
        const fallbackStart = (page - 1) * pageSize
        const fallbackEnd = fallbackStart + pageSize
        setActivities(mockActivities.slice(fallbackStart, fallbackEnd))
        setTotal(mockActivities.length)
        setTotalPages(Math.max(1, Math.ceil(mockActivities.length / pageSize)))
      } finally {
        setIsLoading(false)
      }
    }

    loadActivities()
  }, [page, pageSize])

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
            <span className="field__label">Status aktywności</span>
            <select className="input select">
              <option>Wszystkie statusy</option>
              <option>Zatwierdzona</option>
              <option>Weryfikacja</option>
              <option>Do poprawy</option>
              <option>Robocza</option>
            </select>
          </div>
          <div className="field">
            <span className="field__label">Jednostka</span>
            <select className="input select">
              <option>Wszystkie jednostki</option>
              <option>Oddział Kardiologii</option>
              <option>Oddział Chorób Wewnętrznych</option>
              <option>Kardiochirurgia</option>
              <option>Izba Przyjęć</option>
            </select>
          </div>
          <div className="field">
            <span className="field__label">Pacjent (wyszukaj)</span>
            <input
              className="input"
              type="search"
              placeholder="Wpisz imię i nazwisko"
            />
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-error" style={{ marginBottom: '1rem' }}>
            <strong>Błąd:</strong> {error}
            <br />
            <small>
              Wyświetlam dane testowe. Upewnij się, że backend działa na porcie 3002.
            </small>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="alert alert-info" style={{ marginBottom: '1rem' }}>
            ⏳ Ładowanie danych z serwera...
          </div>
        )}

        {/* Empty State */}
        {!isLoading && activities.length === 0 && (
          <div className="alert alert-warning" style={{ marginBottom: '1rem' }}>
            📭 Brak znalezionych aktywności.
          </div>
        )}

        {/* Table */}
        {activities.length > 0 && (
          <>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Data badania</th>
                    <th>Godzina</th>
                    <th>Nazwa badania</th>
                    <th>Status</th>
                    <th>Jednostka</th>
                    <th>Pacjent</th>
                    <th>PESEL</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((item) => {
                    const { date, time } = formatDateTime(item.examinationDate)
                    return (
                      <tr key={item.id}>
                        <td className="strong">{item.id}</td>
                        <td>{date}</td>
                        <td>{time}</td>
                        <td className="strong">{item.examinationName}</td>
                        <td>
                          <span className={`badge status-${item.status}`}>
                            {statusLabel[item.status] ?? item.status}
                          </span>
                        </td>
                        <td className="muted">{item.executingUnitName}</td>
                        <td className="strong">{item.patientName}</td>
                        <td className="muted">{item.patientPesel}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <span>
                Pokazano {(page - 1) * pageSize + (activities.length > 0 ? 1 : 0)}-
                {(page - 1) * pageSize + activities.length} z {total} wyników
              </span>
              <div className="pagination">
                <button
                  className="page-btn"
                  disabled={page <= 1 || isLoading}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                >
                  &lt;
                </button>
                <button className="page-btn active" disabled>
                  {page}
                </button>
                <button
                  className="page-btn"
                  disabled={page >= totalPages || isLoading}
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                >
                  &gt;
                </button>
                <span className="muted small" style={{ marginLeft: '0.5rem' }}>
                  Strona {page} z {totalPages}
                </span>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default MyActivitiesPage
