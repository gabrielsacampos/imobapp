import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared.module';
import { GranatumCostCenterService } from './granatum-cost-center.service';

@Module({
  imports: [SharedModule],
  providers: [GranatumCostCenterService],
})
export class GranatumCostCenterModule {}
