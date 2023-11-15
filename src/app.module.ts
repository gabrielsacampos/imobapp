import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GranatumModule } from './3party-client/granatum/granatum.module';
import { ImobziModule } from './3party-client/imobzi/imobzi.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { InvoicesController } from './modules/invoices/invoices.controller';
import { InvoicesRepository } from './modules/invoices/invoices.repository';
import { InvoicesService } from './modules/invoices/invoices.service';
import { ModulesModule } from './modules/modules.module';
import { ModulesServices } from './modules/modules.service';
import { PeopleController } from './modules/people/people.controller';
import { UsersModule } from './modules/users/users.module';
import { SharedModule } from './shared.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'dist'),
      //exclude: ['api/*'],
    }),
    ImobziModule,
    SharedModule,
    GranatumModule,
    ModulesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, InvoicesController, PeopleController],
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
