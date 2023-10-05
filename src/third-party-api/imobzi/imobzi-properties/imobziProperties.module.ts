import { Module } from '@nestjs/common';
import { ImobziPropertiesService } from './imobziProperties.service';
import { SharedModule } from 'src/third-party-api/shared.module';

@Module({
  imports: [SharedModule],
  providers: [ImobziPropertiesService],
  exports: [ImobziPropertiesService],
})
export class ImobziPropertiesModule {}
