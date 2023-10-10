import { Module } from '@nestjs/common';
import { GranatumSupliersService } from './granatum-supliers.service';
import { SharedModule } from 'src/third-party-api/shared.module';
import { HttpService } from '@nestjs/axios';

@Module({
  controllers: [SharedModule],
  providers: [GranatumSupliersService, HttpService],
})
export class GranatumSupliersModule {}
