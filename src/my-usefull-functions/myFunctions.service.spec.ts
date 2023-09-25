import { Test, TestingModule } from '@nestjs/testing';
import { MyFunctionsService } from './myFunctions.service';

describe('MyFunctionsService', () => {
  let myFunctionsService: MyFunctionsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [MyFunctionsService],
    }).compile();

    myFunctionsService = moduleRef.get<MyFunctionsService>(MyFunctionsService);
  });

  test('defineCreditDate', () => {
    const result = myFunctionsService.defineCreditDate('2023-02-19');
    expect(result).toBe('2023-02-23');
  });
});
