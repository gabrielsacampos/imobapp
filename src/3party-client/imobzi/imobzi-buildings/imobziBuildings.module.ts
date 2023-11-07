import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared.module';
import { ImobziBuildingsRepository } from './imobziBuildings.repository';
import { ImobziBuildingsService } from './imobziBuildings.service';

@Module({
  imports: [SharedModule],
  providers: [ImobziBuildingsService, ImobziBuildingsRepository],
  exports: [ImobziBuildingsService, ImobziBuildingsRepository],
})
export class ImobziBuildingsModule {}
