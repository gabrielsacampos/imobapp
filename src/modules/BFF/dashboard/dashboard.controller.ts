import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @Get('topcards')
  async getTopCardsData() {
    return await this.dashboardService.getTopCardsData();
  }

  @Get('charts')
  async getChartsData() {
    return await this.dashboardService.getChartsData();
  }

  @Get('tables')
  async getTablesData() {
    return await this.dashboardService.getTablesData();
  }
}
