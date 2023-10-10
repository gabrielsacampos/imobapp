import { HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SharedModule } from 'src/third-party-api/shared.module';
import { GranatumCostCenterService } from './granatum-cost-center.service';

@Module({
  imports: [SharedModule],
  providers: [GranatumCostCenterService, HttpService],
})
export class GranatumCostCenterModule {}