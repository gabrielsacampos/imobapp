import { Module } from '@nestjs/common';
import { SharedModule } from 'src/third-party-api/shared.module';
import { ImobziBuildingsService } from './imobziBuildings.service';

@Module({
  imports: [SharedModule],
  providers: [ImobziBuildingsService],
  exports: [ImobziBuildingsService],
})
export class ImobziBuildingsModule {}
