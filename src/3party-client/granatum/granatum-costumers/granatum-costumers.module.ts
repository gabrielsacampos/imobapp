import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared.module';
import { GranatumCostumersRepository } from './granatum-costumers.repository';
import { GranatumCostumersService } from './granatum-costumers.service';

@Module({
  imports: [SharedModule],
  providers: [GranatumCostumersService, GranatumCostumersRepository],
  exports: [GranatumCostumersService, GranatumCostumersRepository],
})
export class GranatumCostumersModule {}
