import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared.module';
import { ImobziOrganizationsRepository } from './imobziOrganizations.reposiotry';
import { ImobziOrganizationsService } from './imobziOrganizations.service';

@Module({
  imports: [SharedModule],
  providers: [ImobziOrganizationsService, ImobziOrganizationsRepository],
  exports: [ImobziOrganizationsService, ImobziOrganizationsRepository],
})
export class ImobziOrganizationsModule {}
