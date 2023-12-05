import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GranatumModule } from './3party-client/granatum/granatum.module';
import { ImobziModule } from './3party-client/imobzi/imobzi.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { DashboardModule } from './modules/BFF/dashboard/dashboard.module'; 
import { InvoicesRepository } from './modules/entities/invoices/invoices.repository';
import { InvoicesService } from './modules/entities/invoices/invoices.service';
import { ModulesModule } from './modules/entities/modules.module';
import { ModulesServices } from './modules/entities/modules.service';
import { UsersModule } from './modules/entities/users/users.module';
import { SharedModule } from './shared.module';
import { HttpExceptionFilter } from './shared/http-excepetion.filter';

@Module({
  imports: [ImobziModule, SharedModule, GranatumModule, ModulesModule, AuthModule, UsersModule, DashboardModule],
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
