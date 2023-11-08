import { Module } from '@nestjs/common';
import { GranatumAccountsService } from './granatum-accounts.service';
import { SharedModule } from 'src/shared.module';
import { GranatumAccountsRepository } from './granatum-accounts.repository';

@Module({
  imports: [SharedModule],
  providers: [GranatumAccountsService, GranatumAccountsRepository],
  exports: [GranatumAccountsService, GranatumAccountsRepository],
})
export class GranatumAccountsModule {}
