import { useMemo, useState } from 'react'

const ACTIVITY_TYPES = ['Konsultacja', 'Hospitalizacja', 'Zabieg', 'Teleporada']
const DEPARTMENTS = ['Kardiologia', 'Neurologia', 'Onkologia', 'Ortopedia']
const STATUS_OPTIONS = [
  { value: 'all', label: 'Wszystkie statusy' },
  { value: 'approved', label: 'Zatwierdzone' },
  { value: 'review', label: 'Weryfikacja' },
  { value: 'pending', label: 'Robocze' },
  { value: 'needs-fix', label: 'Wymaga poprawy' },
]

const statusLabel = {
  approved: 'Zatwierdzona',
  review: 'Weryfikacja',
  pending: 'Robocza',
  'needs-fix': 'Do poprawy',
}

const seedActivities = [
  {
    id: 1,
    date: '2026-03-19',
    time: '08:30',
    activityType: 'Konsultacja',
    description: 'Anna Kowalska — kontrola pooperacyjna stentu',
    department: 'Kardiologia',
    status: 'approved',
  },
  {
    id: 2,
    date: '2026-03-18',
    time: '10:15',
    activityType: 'Hospitalizacja',
    description: 'Marek Nowak — przyjęcie planowe, diagnostyka',
    department: 'Neurologia',
    status: 'review',
  },
  {
    id: 3,
    date: '2026-03-17',
    time: '14:00',
    activityType: 'Zabieg',
    description: 'Jan Zieliński — implantacja stymulatora',
    department: 'Kardiologia',
    status: 'needs-fix',
  },
  {
    id: 4,
    date: '2026-03-05',
    time: '16:45',
    activityType: 'Konsultacja',
    description: 'Zofia Wiśniewska — interpretacja wyników badań',
    department: 'Onkologia',
    status: 'pending',
  },
  {
    id: 5,
    date: '2026-02-20',
    time: '11:20',
    activityType: 'Teleporada',
    description: 'Kacper Mazur — omówienie wyników kontrolnych',
    department: 'Ortopedia',
    status: 'approved',
  },
  {
    id: 6,
    date: '2026-02-08',
    time: '09:10',
    activityType: 'Hospitalizacja',
    description: 'Ewa Lewandowska — obserwacja neurologiczna',
    department: 'Neurologia',
    status: 'pending',
  },
  {
    id: 7,
    date: '2026-01-29',
    time: '13:40',
    activityType: 'Zabieg',
    description: 'Piotr Baran — artroskopia kolana',
    department: 'Ortopedia',
    status: 'review',
  },
  {
    id: 8,
    date: '2025-12-15',
    time: '15:05',
    activityType: 'Konsultacja',
    description: 'Magdalena Bąk — kwalifikacja do zabiegu',
    department: 'Kardiologia',
    status: 'approved',
  },
]

// Avoid UTC shift when filling date inputs
const formatDateInput = (date) => {
  const y = date.getFullYear()
  const m = `${date.getMonth() + 1}`.padStart(2, '0')
  const d = `${date.getDate()}`.padStart(2, '0')
  return `${y}-${m}-${d}`
}

const formatDisplayDate = (value) => {
  const parsed = new Date(value)
  return new Intl.DateTimeFormat('pl-PL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsed)
}

const parseLocalDate = (value) => {
  const [y, m, d] = value.split('-').map(Number)
  return new Date(y, m - 1, d)
}

const computeRange = (range, base = new Date()) => {
  const now = new Date(base)
  let start = new Date(now)
  let end = new Date(now)

  if (range === 'last-week') {
    start.setDate(now.getDate() - 7)
  } else if (range === 'this-month') {
    start = new Date(now.getFullYear(), now.getMonth(), 1)
    end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  } else if (range === 'prev-month') {
    start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    end = new Date(now.getFullYear(), now.getMonth(), 0)
  } else if (range === 'last-90') {
    start.setDate(now.getDate() - 90)
  }

  return { from: formatDateInput(start), to: formatDateInput(end) }
}

function NewReportPage() {
  const today = new Date()
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

  const [dateFrom, setDateFrom] = useState(formatDateInput(startOfMonth))
  const [dateTo, setDateTo] = useState(formatDateInput(today))
  const [selectedTypes, setSelectedTypes] = useState(ACTIVITY_TYPES)
  const [selectedDepartments, setSelectedDepartments] = useState(DEPARTMENTS)
  const [statusFilter, setStatusFilter] = useState('all')
  const [activities, setActivities] = useState(seedActivities)

  const applyRange = (range) => {
    const { from, to } = computeRange(range)
    setDateFrom(from)
    setDateTo(to)
  }

  const toggleType = (type) => {
    if (type === 'all') {
      setSelectedTypes(ACTIVITY_TYPES)
      return
    }

    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    )
  }

  const toggleDepartment = (department) => {
    if (department === 'all') {
      setSelectedDepartments(DEPARTMENTS)
      return
    }

    setSelectedDepartments((prev) =>
      prev.includes(department)
        ? prev.filter((d) => d !== department)
        : [...prev, department],
    )
  }

  const filteredActivities = useMemo(() => {
    const fromDate = dateFrom ? parseLocalDate(dateFrom) : null
    const toDate = dateTo ? parseLocalDate(dateTo) : null
    if (toDate) {
      toDate.setHours(23, 59, 59, 999)
    }

    return [...activities]
      .filter((item) => {
        const itemDate = parseLocalDate(item.date)
        if (fromDate && itemDate < fromDate) return false
        if (toDate && itemDate > toDate) return false
        if (selectedTypes.length && !selectedTypes.includes(item.activityType)) return false
        if (selectedDepartments.length && !selectedDepartments.includes(item.department)) return false
        if (statusFilter !== 'all' && item.status !== statusFilter) return false
        return true
      })
      .sort((a, b) => {
        const byDate = new Date(b.date) - new Date(a.date)
        if (byDate !== 0) return byDate
        return b.time.localeCompare(a.time)
      })
  }, [activities, dateFrom, dateTo, selectedDepartments, selectedTypes, statusFilter])

  const handleRemove = (id) => {
    setActivities((prev) => prev.filter((item) => item.id !== id))
  }

  const isRangeActive = (range) => {
    const { from, to } = computeRange(range)
    return dateFrom === from && dateTo === to
  }

  const allTypesSelected = selectedTypes.length === ACTIVITY_TYPES.length
  const allDepartmentsSelected = selectedDepartments.length === DEPARTMENTS.length

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Raporty</p>
          <h1 className="page-title">Nowy raport</h1>
          <p className="page-subtitle">
            Wybierz zakres dat oraz filtry. Lista poniżej odświeża się automatycznie, a wygenerowany raport
            otrzymasz w PDF.
          </p>
        </div>
      </header>

      <div className="grid two-columns">
        <section className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Zakres czasu</p>
              <h2 className="card-title">Parametry raportu</h2>
              <p className="muted">
                Zmieniaj daty, status, typy lub oddziały — lista aktywności po prawej odświeża się automatycznie.
              </p>
            </div>
          </div>

          <div className="field">
            <span className="field__label">Szybkie zakresy</span>
            <div className="chip-row">
              <button
                className={`chip ${isRangeActive('last-week') ? 'active' : ''}`}
                type="button"
                onClick={() => applyRange('last-week')}
              >
                Ostatni tydzień
              </button>
              <button
                className={`chip ${isRangeActive('this-month') ? 'active' : ''}`}
                type="button"
                onClick={() => applyRange('this-month')}
              >
                Bieżący miesiąc
              </button>
              <button
                className={`chip ${isRangeActive('prev-month') ? 'active' : ''}`}
                type="button"
                onClick={() => applyRange('prev-month')}
              >
                Poprzedni miesiąc
              </button>
              <button
                className={`chip ${isRangeActive('last-90') ? 'active' : ''}`}
                type="button"
                onClick={() => applyRange('last-90')}
              >
                Ostatnie 90 dni
              </button>
            </div>
          </div>

          <div className="form-grid">
            <label className="field">
              <span className="field__label">Data od</span>
              <input
                className="input"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </label>
            <label className="field">
              <span className="field__label">Data do</span>
              <input
                className="input"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </label>
            <label className="field">
              <span className="field__label">Status</span>
              <select
                className="input select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="field">
            <span className="field__label">Typy aktywności</span>
            <div className="chip-row">
              <button
                className={`chip ${allTypesSelected ? 'active' : ''}`}
                type="button"
                onClick={() => toggleType('all')}
              >
                Wszystkie
              </button>
              {ACTIVITY_TYPES.map((type) => (
                <button
                  key={type}
                  className={`chip ${selectedTypes.includes(type) ? 'active' : ''}`}
                  type="button"
                  onClick={() => toggleType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <span className="field__label">Oddziały</span>
            <div className="chip-row">
              <button
                className={`chip ${allDepartmentsSelected ? 'active' : ''}`}
                type="button"
                onClick={() => toggleDepartment('all')}
              >
                Wszystkie
              </button>
              {DEPARTMENTS.map((department) => (
                <button
                  key={department}
                  className={`chip ${selectedDepartments.includes(department) ? 'active' : ''}`}
                  type="button"
                  onClick={() => toggleDepartment(department)}
                >
                  {department}
                </button>
              ))}
            </div>
          </div>

          <div className="actions">
            <button className="btn btn-primary" type="button">
              Generuj raport
            </button>
            <button className="btn btn-ghost" type="button">
              Anuluj
            </button>
          </div>

          <div className="info">
            <div className="info__icon" aria-hidden="true">
              i
            </div>
            <div>
              <p className="strong small">Informacja o raporcie</p>
              <p className="muted small">
                Lista aktywności po prawej pokazuje wynik filtrowania według daty, statusu, typu i oddziału.
                Usunięte rekordy nie trafią do generowanego PDF.
              </p>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Podgląd aktywności</p>
              <h2 className="card-title">Wyniki dla wybranego zakresu</h2>
              <p className="muted">
                Lista automatycznie odświeża się przy zmianie dat, statusu, typów lub oddziałów.
              </p>
            </div>
            <span className="badge badge-soft status-info">{filteredActivities.length} aktywności</span>
          </div>

          {filteredActivities.length === 0 ? (
            <div className="placeholder">
              <div className="placeholder__icon" aria-hidden="true">
                —
              </div>
              <h3 className="card-title">Brak aktywności w wybranym zakresie</h3>
              <p className="muted small">
                Zmień daty lub filtry, aby zobaczyć dopasowane pozycje.
              </p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Godzina</th>
                    <th>Typ</th>
                    <th>Oddział</th>
                    <th>Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredActivities.map((item) => (
                    <tr key={item.id}>
                      <td>{formatDisplayDate(item.date)}</td>
                      <td>{item.time}</td>
                      <td>
                        <span className="badge badge-soft">{item.activityType}</span>
                      </td>
                      <td className="muted">{item.department}</td>
                      <td>
                        <button className="btn btn-text" type="button" onClick={() => handleRemove(item.id)}>
                          Usuń
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <footer className="page-footer">
        <span className="muted small">Zgodność RODO · Wersja systemu 2.4.0</span>
        <span className="muted small">Wsparcie techniczne</span>
      </footer>
    </div>
  )
}

export default NewReportPage
