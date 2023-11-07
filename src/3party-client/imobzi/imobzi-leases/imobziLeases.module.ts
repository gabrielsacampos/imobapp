import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared.module';
import { ImobziLeasesRepository } from './imobziLeases.repository';
import { ImobziLeasesService } from './imobziLeases.service';

@Module({
  imports: [SharedModule],
  providers: [ImobziLeasesService, ImobziLeasesRepository],
  exports: [ImobziLeasesService, ImobziLeasesRepository],
})
export class ImobziLeasesModule {}
