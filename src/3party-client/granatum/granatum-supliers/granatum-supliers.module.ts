import { Module } from '@nestjs/common';
import { GranatumSupliersService } from './granatum-supliers.service';
import { SharedModule } from 'src/shared.module';
import { GranatumSupliersRepository } from './granatum-supliers.repository';

@Module({
  imports: [SharedModule],
  providers: [GranatumSupliersService, GranatumSupliersRepository],
  exports: [GranatumSupliersService, GranatumSupliersRepository],
})
export class GranatumSupliersModule {}
