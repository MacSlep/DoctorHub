import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivityResponse } from '../types/activity.interface';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  async getOracleActivities(
    @Query('uzyId', ParseIntPipe) uzyId: number,
  ): Promise<ActivityResponse[]> {
    return this.activitiesService.getOracleActivities(uzyId);
  }
}