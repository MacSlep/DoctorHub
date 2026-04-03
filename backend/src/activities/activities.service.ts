import {
  Injectable,
  Logger,
  ServiceUnavailableException,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import oracledb from 'oracledb';
import {
  OracleActivityRow,
  ActivityResponse,
  PaginatedActivitiesResponse,
} from '../types/activity.interface';

@Injectable()
export class ActivitiesService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ActivitiesService.name);
  private pool: any;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    // Initialize Oracle connection pool on module startup
    try {
      const user = this.configService.get<string>('ORACLE_USER', '');
      const password = this.configService.get<string>('ORACLE_PASSWORD', '');
      const connectionString = this.configService.get<string>(
        'ORACLE_CONNECTION_STRING',
        '',
      );

      this.pool = await oracledb.createPool({
        user,
        password,
        connectionString,
        max: 4, // Maximum connections in pool
        min: 1, // Minimum connections in pool
      });

      this.logger.log('Oracle connection pool initialized');
    } catch (error) {
      this.logger.error(
        'Failed to initialize Oracle connection pool',
        String(error),
      );
    }
  }

  async onModuleDestroy() {
    // Close pool on module shutdown
    if (this.pool) {
      try {
        await this.pool.close();
        this.logger.log('Oracle connection pool closed');
      } catch (error) {
        this.logger.error('Error closing connection pool', String(error));
      }
    }
  }

  async getOracleActivities(
    uzyId: number,
    page: number,
    pageSize: number,
  ): Promise<PaginatedActivitiesResponse> {
    let connection: any;
    const startTime = performance.now();
    const safePage = Math.max(1, page);
    const safePageSize = Math.min(100, Math.max(1, pageSize));
    const offset = (safePage - 1) * safePageSize;

    this.logger.log(
      `[Oracle Query] Starting query for uzyId=${uzyId}, page=${safePage}, pageSize=${safePageSize}`,
    );

    try {
      // Get connection from pool
      if (!this.pool) {
        throw new Error('Oracle connection pool not initialized');
      }

      connection = await this.pool.getConnection();

      const countSql = `
        SELECT COUNT(1) AS TOTAL_COUNT
        FROM WYK_ELECZ we
        JOIN PERS_UCZESTN pu ON we.ID_WYK_ELECZ = pu.ID_WYK_ELECZ
        JOIN LEKARZ l ON pu.UZY = l.KOD_UZ_DBAP
        JOIN JOS j ON we.IDK_JOS_WYK = j.IDK_JOS
        JOIN ELEM_LECZ el ON we.ID_ELECZ = el.KOD_ELECZ
        JOIN POBYT p ON we.ID_POB = p.ID_POB
        JOIN PACJENT pac ON p.ID_PAC = pac.ID_PAC
        WHERE
          we.ID_NADRZ_WYK_ELECZ IS NULL
          AND pu.ROLA = 'BW'
          AND pu.UZY = :uzyId
      `;

      const countResult = await connection.execute(
        countSql,
        { uzyId },
        { outFormat: oracledb.OUT_FORMAT_OBJECT },
      );

      const countRow = (countResult.rows?.[0] ?? { TOTAL_COUNT: 0 }) as {
        TOTAL_COUNT: number | string;
      };
      const total = Number(countRow.TOTAL_COUNT ?? 0);

      const sql = `
        SELECT
          we.ID_ZLEC,
          we.DT_ZAKONCZ AS DATA_BADANIA,
          we.NAZWA AS NAZWA_BADANIA,
          we.STAN AS STAN_ELEMENTU_LECZENIA,
          pac.IMIONA || ' ' || pac.NAZWISKO AS PACJENT,
          pac.PESEL,
          j.NAZWA AS NAZWA_JEDNOSTKI_WYKONUJACEJ
        FROM WYK_ELECZ we
        JOIN PERS_UCZESTN pu ON we.ID_WYK_ELECZ = pu.ID_WYK_ELECZ
        JOIN LEKARZ l ON pu.UZY = l.KOD_UZ_DBAP 
        JOIN JOS j ON we.IDK_JOS_WYK = j.IDK_JOS
        JOIN ELEM_LECZ el ON we.ID_ELECZ = el.KOD_ELECZ
        JOIN POBYT p ON we.ID_POB = p.ID_POB
        JOIN PACJENT pac ON p.ID_PAC = pac.ID_PAC
        WHERE
          we.ID_NADRZ_WYK_ELECZ IS NULL
          AND pu.ROLA = 'BW'
          AND pu.UZY = :uzyId
        ORDER BY we.DT_ZAKONCZ DESC, we.ID_ZLEC DESC
        OFFSET :offset ROWS FETCH NEXT :pageSize ROWS ONLY
      `;

      // Bind variables for security
      const result = await connection.execute(
        sql,
        { uzyId, offset, pageSize: safePageSize },
        { outFormat: oracledb.OUT_FORMAT_OBJECT },
      );

      const rows = (result.rows ?? []) as OracleActivityRow[];
      const duration = performance.now() - startTime;

      this.logger.log(
        `[Oracle Query] ✅ Completed in ${duration.toFixed(2)}ms - Retrieved ${rows.length} record(s), total=${total} for uzyId=${uzyId}`,
      );

      if (rows.length === 0) {
        this.logger.warn(`No activities found in Oracle for uzyId=${uzyId}.`);
      }

      const data = rows.map((row) => this.mapToActivityResponse(row));
      const totalPages = Math.max(1, Math.ceil(total / safePageSize));

      return {
        data,
        page: safePage,
        pageSize: safePageSize,
        total,
        totalPages,
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      this.logger.error(
        `[Oracle Query] ❌ Failed in ${duration.toFixed(2)}ms for uzyId=${uzyId}: ${String(error)}`,
        error instanceof Error ? error.stack : 'No stack trace',
      );
      throw new ServiceUnavailableException(
        'Oracle connection is unavailable. Verify ORACLE_CONNECTION_STRING and network access from Docker container.',
      );
    } finally {
      // Always return connection to pool
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          this.logger.error('Error returning connection to pool', String(err));
        }
      }
    }
  }

  private mapToActivityResponse(row: OracleActivityRow): ActivityResponse {
    return {
      id: row.ID_ZLEC,
      examinationDate: row.DATA_BADANIA,
      examinationName: row.NAZWA_BADANIA,
      status: row.STAN_ELEMENTU_LECZENIA,
      patientName: row.PACJENT,
      patientPesel: row.PESEL,
      executingUnitName: row.NAZWA_JEDNOSTKI_WYKONUJACEJ,
      source: 'oracle',
    };
  }
}