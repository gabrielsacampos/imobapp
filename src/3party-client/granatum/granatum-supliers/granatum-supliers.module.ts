import { Module } from '@nestjs/common';
import { GranatumSupliersService } from './granatum-supliers.service';
import { SharedModule } from 'src/shared.module';

@Module({
  imports: [SharedModule],
  providers: [GranatumSupliersService],
  exports: [GranatumSupliersService],
})
export class GranatumSupliersModule {}
