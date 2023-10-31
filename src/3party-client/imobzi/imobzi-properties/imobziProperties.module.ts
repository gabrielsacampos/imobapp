import { Module } from '@nestjs/common';
import { ImobziPropertiesService } from './imobziProperties.service';
import { SharedModule } from 'src/shared.module';

@Module({
  imports: [SharedModule],
  providers: [ImobziPropertiesService],
  exports: [ImobziPropertiesService],
})
export class ImobziPropertiesModule {}
