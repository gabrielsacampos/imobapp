import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryPropertiesRepository } from '../../test/server-repositories/inMemoryPropertiesRepository/inMemoryPropertiesRepository';
import { inMemoryPropertiesRepositoryMock } from '../../test/server-repositories/inMemoryPropertiesRepository/inMemoryPropertiesRepository.mock';
import { CreatePropertyDTO } from './dtos/create-property.dtos';
import { PropertiesRepository } from './properties.repository';
import { PropertiesService } from './properties.service';

describe('PropertiesService', () => {
  let service: PropertiesService;
  let inMemoryPropertiesRepository: InMemoryPropertiesRepository;
  beforeEach(async () => {
    inMemoryPropertiesRepository = new InMemoryPropertiesRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertiesService, { provide: PropertiesRepository, useValue: inMemoryPropertiesRepository }],
    }).compile();

    service = module.get<PropertiesService>(PropertiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('upsert > should update property when it exists', async () => {
    const propertyTest: CreatePropertyDTO = inMemoryPropertiesRepositoryMock[0];
    propertyTest.unity = '00';
    const result = await service.upsert(propertyTest);
    const updatedProperty = inMemoryPropertiesRepositoryMock.find((property) => {
      return property.id_imobzi === propertyTest.id_imobzi;
    });
    expect(result).toEqual(updatedProperty);
    expect(result.unity).toBe('00');
  });

  it('upsert > should create property when it NOT exists', async () => {
    const propertyTest: CreatePropertyDTO = inMemoryPropertiesRepositoryMock[0];
    propertyTest.id = 9898;
    const result = await service.upsert(propertyTest);
    const updatedProperty = inMemoryPropertiesRepositoryMock.find((property) => {
      return property.id_imobzi === propertyTest.id_imobzi;
    });
    expect(result).toEqual(updatedProperty);
    expect(result.id).toBe(9898);
  });
});
