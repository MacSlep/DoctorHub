import {
  Controller,
  DefaultValuePipe,
  Get,
  Logger,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { PaginatedActivitiesResponse } from '../types/activity.interface';

@Controller('activities')
export class ActivitiesController {
  private readonly logger = new Logger(ActivitiesController.name);

  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  async getOracleActivities(
    @Query('uzyId', ParseIntPipe) uzyId: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ): Promise<PaginatedActivitiesResponse> {
    this.logger.log(
      `[HTTP] Incoming request for activities, uzyId: ${uzyId}, page: ${page}, pageSize: ${pageSize}`,
    );
    return this.activitiesService.getOracleActivities(uzyId, page, pageSize);
  }
}