import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly commonService: DashboardService) { }

  @Get('data')
  async getPendingInvoices() {
    return this.commonService.getDashboardData();
  }
}
