import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { GranatumModule } from './3party-client/granatum/granatum.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ImobziModule } from './3party-client/imobzi/imobzi.module';
import { QueueGranatumModule } from './queues/queue-granatum/queue-granatum.module';
import { QueuesModule } from './queues/queues.module';
import { UsersModule } from './repository/users/users.module';
import { SharedModule } from './shared.module';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/loggin.interceptor';
import { InvoiceItemsModule } from './repository/invoice_items/invoice_items.module';

@Module({
  imports: [
    ImobziModule,
    SharedModule,
    GranatumModule,
    AuthModule,
    UsersModule,
    QueuesModule,
    QueueGranatumModule,
    QueuesModule,
    InvoiceItemsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
