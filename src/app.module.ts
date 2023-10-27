import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImobziModule } from './imobzi/imobzi.module';
import { SharedModule } from './shared.module';
import { GranatumModule } from './granatum/granatum.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './repository/users/users.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/loggin.interceptor';

@Module({
  imports: [ImobziModule, SharedModule, GranatumModule, AuthModule, UsersModule],
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
