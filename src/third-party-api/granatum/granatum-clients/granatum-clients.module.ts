import { Module } from '@nestjs/common';
import { GranatumClientsService } from './granatum-clients.service';
import { SharedModule } from 'src/third-party-api/shared.module';
import { HttpService } from '@nestjs/axios';

@Module({
  imports: [SharedModule],
  providers: [GranatumClientsService, HttpService],
})
export class GranatumClientsModule {}
