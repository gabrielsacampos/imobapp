import { Test, TestingModule } from '@nestjs/testing';
import { ImobziService } from './imobzi.service';

describe('ImobziService', () => {
  let service: ImobziService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImobziService],
    }).compile();

    service = module.get<ImobziService>(ImobziService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
