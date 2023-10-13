import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared.module';
import { GranatumTransactionsService } from './granatumTransactions.service';

@Module({
  imports: [SharedModule],
  providers: [GranatumTransactionsService],
  exports: [GranatumTransactionsService],
})
export class GranatumTransactionsModule {}
