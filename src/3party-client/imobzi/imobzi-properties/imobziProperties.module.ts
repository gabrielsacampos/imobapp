import { Module } from '@nestjs/common';
import { ImobziPropertiesService } from './imobziProperties.service';
import { SharedModule } from 'src/shared.module';
import { ImobziPropertiesRepository } from './imobziProperties.repository';

@Module({
  imports: [SharedModule],
  providers: [ImobziPropertiesService, ImobziPropertiesRepository],
  exports: [ImobziPropertiesService, ImobziPropertiesRepository],
})
export class ImobziPropertiesModule {}
