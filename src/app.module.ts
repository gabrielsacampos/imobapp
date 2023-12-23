import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GranatumModule } from './3party-client/granatum/granatum.module';
import { ImobziModule } from './3party-client/imobzi/imobzi.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from './modules/BFF/dashboard/dashboard.module';
import { InvoicesRepository } from './modules/entities/invoices/invoices.repository';
import { InvoicesService } from './modules/entities/invoices/invoices.service';
import { ModulesModule } from './modules/entities/modules.module';
import { ModulesServices } from './modules/entities/modules.service';
import { UsersModule } from './modules/entities/users/users.module';
import { SharedModule } from './shared.module';
import { HttpExceptionFilter } from './shared/http-excepetion.filter';
import { CheckHeadersMiddleware } from './middleware';

@Module({
  imports: [ImobziModule, SharedModule, GranatumModule, ModulesModule, UsersModule, DashboardModule],
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

  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckHeadersMiddleware)
      .forRoutes('*');
  }
}
