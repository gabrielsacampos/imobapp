import { Module } from '@nestjs/common';
import { GranatumClientsService } from './granatum-clients.service';
import { SharedModule } from 'src/shared.module';

@Module({
  imports: [SharedModule],
  providers: [GranatumClientsService],
  exports: [GranatumClientsService],
})
export class GranatumClientsModule {}
