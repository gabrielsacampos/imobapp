import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GranatumModule } from './3party-client/granatum/granatum.module';
import { QueueGranatumModule } from './3party-client/granatum/queue-granatum/queue-granatum.module';
import { ImobziModule } from './3party-client/imobzi/imobzi.module';
import { QueueImobziModule } from './3party-client/imobzi/queue-imobzi/queue-imobzi.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { InvoicesController } from './modules/invoices/invoices.controller';
import { InvoicesRepository } from './modules/invoices/invoices.repository';
import { InvoicesService } from './modules/invoices/invoices.service';
import { ModulesModule } from './modules/modules.module';
import { ModulesServices } from './modules/modules.service';
import { UsersModule } from './modules/users/users.module';
import { SharedModule } from './shared.module';

@Module({
  imports: [
    ImobziModule,
    SharedModule,
    GranatumModule,
    ModulesModule,
    AuthModule,
    UsersModule,
    QueueGranatumModule,
    QueueImobziModule,
  ],
  controllers: [AppController, InvoicesController],
  providers: [
    InvoicesService,
    InvoicesRepository,
    ModulesServices,
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
