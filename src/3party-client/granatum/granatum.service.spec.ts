import { Test, TestingModule } from '@nestjs/testing';
import { GranatumAccountsModule } from './granatum-accounts/granatum-accounts.module';
import { GranatumCategoriesModule } from './granatum-categories/granatum-categories.module';
import { GranatumCostCenterModule } from './granatum-cost-center/granatum-cost-center.module';
import { GranatumCostumersModule } from './granatum-costumers/granatum-costumers.module';
import { GranatumSupliersModule } from './granatum-supliers/granatum-supliers.module';
import { GranatumTransactionsModule } from './granatum-transactions/granatumTransactions.module';
import { GranatumService } from './granatum.service';

describe('GranatumService', () => {
  let service: GranatumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        GranatumTransactionsModule,
        GranatumCategoriesModule,
        GranatumAccountsModule,
        GranatumCostCenterModule,
        GranatumCostumersModule,
        GranatumSupliersModule,
      ],
      providers: [GranatumService],
    }).compile();

    service = module.get<GranatumService>(GranatumService);
  });

  it('service shoud be defined', () => {
    expect(service).toBeDefined();
  });
});
