import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryPropertiesRepository } from '../../../test/repositories/inMemoryPropertiesRepository/inMemoryPropertiesRepository';
import { inMemoryPropertiesRepositoryMock } from '../../../test/repositories/inMemoryPropertiesRepository/inMemoryPropertiesRepository.mock';
import { Owner } from '../owners/entities/owner.entity';
import { CreatePropertyDTO } from './dtos/create-property.dtos';
import { PropertiesRepository } from './properties.repository';
import { PropertiesService } from './properties.service';

describe('PropertiesService', () => {
  let service: PropertiesService;
  let inMemoryPropertiesRepository: InMemoryPropertiesRepository;

  // ignore error from others methods to do not break test
  const skipeNoNeededErrors = () => {
    const spyFindById = jest.spyOn(inMemoryPropertiesRepository, 'findById');
    spyFindById.mockReturnValue(false as any);
  };

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

  it('findAll > should return array of properties', async () => {
    const result = await service.findAll();
    expect(result).toBe(inMemoryPropertiesRepositoryMock);
  });

  it('findUnique > existgin id_imobzi should return a property', async () => {
    const randomProperty = inMemoryPropertiesRepositoryMock[4];
    const randomPersonId = randomProperty.id_imobzi;
    const result = await service.findById(randomPersonId);
    const property = inMemoryPropertiesRepositoryMock.find((property) => property.id_imobzi === randomPersonId);
    expect(result).toBe(property);
  });

  it('findUnique > NOT exsting id_imobzi should NOT return a property', async () => {
    await expect(service.findById('10')).rejects.toThrow();
  });

  it('create > should create and return the new property', async () => {
    const owners: Owner[] = [{ id_owner_organization_imobzi: '12443121', id_owner_person_imobzi: null, share: 100 }];
    const newPerson: CreatePropertyDTO = {
      id_imobzi: '09873',
      id_building_imobzi: '',
      unity: '',
      active: false,
      status: '',
      type: '',
      owners,
    };

    skipeNoNeededErrors();
    await expect(service.create(newPerson)).resolves.not.toThrow();
    expect(inMemoryPropertiesRepository.items).toEqual(expect.arrayContaining([expect.objectContaining(newPerson)]));
  });

  it('create > exsting id_imobzi || cpf should NOT create a property', async () => {
    const randomProperty = inMemoryPropertiesRepositoryMock[4];
    const owners = [{ id_owner_organization_imobzi: '12443121', id_owner_person_imobzi: null, share: 100 }];
    await expect(service.create({ ...randomProperty, owners })).rejects.toThrow();
  });

  it('upsert > create property or update if not exists', async () => {
    skipeNoNeededErrors();
    const randomProperty = inMemoryPropertiesRepositoryMock[4];
    const owners = [{ id_owner_organization_imobzi: '12443121', id_owner_person_imobzi: null, share: 100 }];
    randomProperty.status = 'suspended';
    await expect(service.upsert({ ...randomProperty, owners })).resolves.not.toThrow();
    expect(inMemoryPropertiesRepository.items).toEqual(
      expect.arrayContaining([expect.objectContaining(randomProperty)]),
    );
  });
});
