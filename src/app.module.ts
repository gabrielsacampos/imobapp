import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImobziModule } from './imobzi/imobzi.module';
import { SharedModule } from './shared.module';
import { GranatumModule } from './granatum/granatum.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './repository/modules/users/users.module';

@Module({
  imports: [ImobziModule, SharedModule, GranatumModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
