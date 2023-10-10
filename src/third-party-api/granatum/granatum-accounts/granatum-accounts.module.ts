import { Module } from '@nestjs/common';
import { GranatumAccountsService } from './granatum-accounts.service';
import { SharedModule } from 'src/third-party-api/shared.module';
import { HttpService } from '@nestjs/axios';

@Module({
  imports: [SharedModule],
  providers: [GranatumAccountsService, HttpService],
  exports: [GranatumAccountsService],
})
export class GranatumAccountsModule {}
