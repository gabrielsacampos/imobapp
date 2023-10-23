import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImobziModule } from './imobzi/imobzi.module';
import { SharedModule } from './shared.module';
import { GranatumModule } from './granatum/granatum.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './repository/modules/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { WebhookModule } from './repository/modules/webhook/webhook.module';

@Module({
  imports: [ImobziModule, SharedModule, GranatumModule, AuthModule, UsersModule, WebhookModule],
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
