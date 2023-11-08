import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared.module';
import { GranatumTransactionsRepository } from './granatum-transactions.repository';
import { GranatumTransactionsService } from './granatumTransactions.service';

@Module({
  imports: [SharedModule],
  providers: [GranatumTransactionsService, GranatumTransactionsRepository],
  exports: [GranatumTransactionsService, GranatumTransactionsRepository],
})
export class GranatumTransactionsModule {}
