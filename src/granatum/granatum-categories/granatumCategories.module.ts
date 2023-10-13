import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared.module';
import { GranatumCategoriesService } from './granatumCategories.service';

@Module({
  imports: [SharedModule],
  providers: [GranatumCategoriesService],
  exports: [GranatumCategoriesService],
})
export class GranatumCategoriesModule {}
