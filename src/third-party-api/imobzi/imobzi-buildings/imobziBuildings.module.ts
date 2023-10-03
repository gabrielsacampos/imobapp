import { Module } from '@nestjs/common';
import { ImobziBuildingsService } from './imobziBuildings.service';

@Module({
  imports: [],
  providers: [ImobziBuildingsService],
  exports: [ImobziBuildingsService],
})
export class ImobziBuildingsModule {}
