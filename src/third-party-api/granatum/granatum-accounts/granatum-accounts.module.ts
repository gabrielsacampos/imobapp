import { Module } from '@nestjs/common';
import { GranatumAccountsService } from './granatum-accounts.service';
import { SharedModule } from 'src/third-party-api/shared.module';

@Module({
  imports: [SharedModule],
  providers: [GranatumAccountsService],
  exports: [GranatumAccountsService],
})
export class GranatumAccountsModule {}
