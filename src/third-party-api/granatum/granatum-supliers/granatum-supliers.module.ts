import { Module } from '@nestjs/common';
import { GranatumSupliersService } from './granatum-supliers.service';
import { SharedModule } from 'src/third-party-api/shared.module';

@Module({
  imports: [SharedModule],
  providers: [GranatumSupliersService],
  exports: [GranatumSupliersService],
})
export class GranatumSupliersModule {}
