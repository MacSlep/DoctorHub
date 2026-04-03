/**
 * Raw row object from Oracle database query
 */
export interface OracleActivityRow {
  ID_ZLEC: string;
  DATA_BADANIA: Date;
  NAZWA_BADANIA: string;
  STAN_ELEMENTU_LECZENIA: string;
  PACJENT: string;
  PESEL: string;
  NAZWA_JEDNOSTKI_WYKONUJACEJ: string;
}

/**
 * Activity response returned to client after mapping from Oracle
 */
export interface ActivityResponse {
  id: string;
  examinationDate: Date;
  examinationName: string;
  status: string;
  patientName: string;
  patientPesel: string;
  executingUnitName: string;
  source: 'oracle';
}

export interface PaginatedActivitiesResponse {
  data: ActivityResponse[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
