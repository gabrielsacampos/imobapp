import { Module } from '@nestjs/common';
import { SharedModule } from 'src/third-party-api/shared.module';
import { GranatumCategoriesService } from './granatumCategories.service';

@Module({
  imports: [SharedModule],
  providers: [GranatumCategoriesService],
  exports: [GranatumCategoriesService],
})
export class GranatumCategoriesModule {}
