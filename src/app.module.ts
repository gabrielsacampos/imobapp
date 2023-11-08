import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { GranatumModule } from './3party-client/granatum/granatum.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ImobziModule } from './3party-client/imobzi/imobzi.module';
import { QueueGranatumModule } from './queues/queue-granatum/queue-granatum.module';
import { UsersModule } from './repository/users/users.module';
import { SharedModule } from './shared.module';
import { InvoiceItemsModule } from './repository/invoice_items/invoice_items.module';
import { QueueImobziModule } from './queues/queue-imobzi/queue-imobzi.module';

@Module({
  imports: [
    ImobziModule,
    SharedModule,
    GranatumModule,
    AuthModule,
    UsersModule,
    QueueGranatumModule,
    QueueImobziModule,
    InvoiceItemsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
