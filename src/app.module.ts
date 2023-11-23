import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GranatumModule } from './3party-client/granatum/granatum.module';
import { ImobziModule } from './3party-client/imobzi/imobzi.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { InvoicesRepository } from './modules/invoices/invoices.repository';
import { InvoicesService } from './modules/invoices/invoices.service';
import { ModulesModule } from './modules/modules.module';
import { ModulesServices } from './modules/modules.service';
import { UsersModule } from './modules/users/users.module';
import { SharedModule } from './shared.module';
import { HttpExceptionFilter } from './shared/http-excepetion.filter';

@Module({
  imports: [ImobziModule, SharedModule, GranatumModule, ModulesModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [
    InvoicesService,
    InvoicesRepository,
    ModulesServices,
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
