import { Module } from '@nestjs/common';
import { MyFunctionsService } from './myFunctions.service';

@Module({
  providers: [MyFunctionsService],
  exports: [MyFunctionsService],
})
export class MyFunctionsModule {}
