import { Module } from '@nestjs/common';
import { SharedModule } from 'src/third-party-api/shared.module';
import { ImobziLeasesService } from './imobziLeases.service';

@Module({
  imports: [SharedModule],
  providers: [ImobziLeasesService],
  exports: [ImobziLeasesService],
})
export class ImobziLeasesModule {}
