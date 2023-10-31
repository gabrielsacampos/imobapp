import { Test, TestingModule } from '@nestjs/testing';
import { GranatumAccountsController } from './granatum-accounts.controller';
import { GranatumAccountsService } from './granatum-accounts.service';

describe('GranatumAccountsController', () => {
  let controller: GranatumAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GranatumAccountsController],
      providers: [GranatumAccountsService],
    }).compile();

    controller = module.get<GranatumAccountsController>(GranatumAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
