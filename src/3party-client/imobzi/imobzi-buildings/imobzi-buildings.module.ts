import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared.module';
import { ImobziBuildingsRepository } from './imobzi-buildings.repository';
import { ImobziBuildingsService } from './imobzi-buildings.service';

@Module({
  imports: [SharedModule],
  providers: [ImobziBuildingsService, ImobziBuildingsRepository],
  exports: [ImobziBuildingsService, ImobziBuildingsRepository],
})
export class ImobziBuildingsModule {}
