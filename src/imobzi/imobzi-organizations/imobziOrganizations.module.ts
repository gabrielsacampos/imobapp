import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared.module';
import { ImobziOrganizationsService } from './imobziOrganizations.service';

@Module({
  imports: [SharedModule],
  providers: [ImobziOrganizationsService],
  exports: [ImobziOrganizationsService],
})
export class ImobziOrganizationsModule {}
