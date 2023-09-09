import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './modules/people/people.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { BuildingsModule } from './modules/buildings/buildings.module';

@Module({
  imports: [PeopleModule, OrganizationsModule, BuildingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
