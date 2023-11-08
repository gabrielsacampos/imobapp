import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared.module';
import { GranatumCategoriesRepository } from './granatum-categories.repository';
import { GranatumCategoriesService } from './granatum-categories.service';

@Module({
  imports: [SharedModule],
  providers: [GranatumCategoriesService, GranatumCategoriesRepository],
  exports: [GranatumCategoriesService, GranatumCategoriesRepository],
})
export class GranatumCategoriesModule {}
