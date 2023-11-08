import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared.module';
import { GranatumCostCenterRepository } from './granatum-cost-center.repository';
import { GranatumCostCenterService } from './granatum-cost-center.service';

@Module({
  imports: [SharedModule],
  providers: [GranatumCostCenterService, GranatumCostCenterRepository],
  exports: [GranatumCostCenterService, GranatumCostCenterRepository],
})
export class GranatumCostCenterModule {}
