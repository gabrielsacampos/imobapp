import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryPropertiesRepository } from '../../../test/server-repositories/inMemoryPropertiesRepository/inMemoryPropertiesRepository';
import { inMemoryPropertiesRepositoryMock } from '../../../test/server-repositories/inMemoryPropertiesRepository/inMemoryPropertiesRepository.mock';
import { Owner } from '../owners/entities/owner.entity';
import { CreatePropertyDTO } from './dtos/create-property.dtos';
import { PropertiesRepository } from './properties.repository';

describe('PropertiesRepository', () => {
  let repository: PropertiesRepository;
  let inMemoryPropertiesRepository: InMemoryPropertiesRepository;

  beforeEach(async () => {
    inMemoryPropertiesRepository = new InMemoryPropertiesRepository();
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: PropertiesRepository, useValue: inMemoryPropertiesRepository }],
    }).compile();

    repository = module.get<PropertiesRepository>(PropertiesRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('findAll > should return array of properties', async () => {
    const result = await repository.findAll();
    expect(result).toBe(inMemoryPropertiesRepositoryMock);
  });

  it('findUnique > existgin id_imobzi should return a property', async () => {
    const randomProperty = inMemoryPropertiesRepositoryMock[4];
    const randomPersonId = randomProperty.id_imobzi;
    const result = await repository.findById(randomPersonId);
    const property = inMemoryPropertiesRepositoryMock.find((property) => property.id_imobzi === randomPersonId);
    expect(result).toBe(property);
  });

  it('findUnique > NOT exsting id_imobzi should NOT return a property', async () => {
    await expect(repository.findById('10')).rejects.toThrow();
  });

  it('create > should create and return the new property', async () => {
    const owners: Owner[] = [{ id_owner_organization_imobzi: '12443121', id_owner_person_imobzi: null, share: 100 }];
    const newPerson: CreatePropertyDTO = {
      id_imobzi: '1',
      id_building_imobzi: '',
      unity: '',
      active: false,
      status: '',
      type: '',
      owners,
    };

    await expect(repository.create(newPerson)).resolves.not.toThrow();
    expect(inMemoryPropertiesRepository.items).toEqual(expect.arrayContaining([expect.objectContaining(newPerson)]));
  });

  it('create > exsting id_imobzi || cpf should NOT create a property', async () => {
    const randomProperty = inMemoryPropertiesRepositoryMock[4];
    const owners = [{ id_owner_organization_imobzi: '12443121', id_owner_person_imobzi: null, share: 100 }];
    await expect(repository.create({ ...randomProperty, owners })).rejects.toThrow();
  });

  it('upsert > create property or update if not exists', async () => {
    const randomProperty = inMemoryPropertiesRepositoryMock[4];
    const owners = [{ id_owner_organization_imobzi: '12443121', id_owner_person_imobzi: null, share: 100 }];
    randomProperty.status = 'suspended';
    await expect(repository.upsert({ ...randomProperty, owners })).resolves.not.toThrow();
    expect(inMemoryPropertiesRepository.items).toEqual(
      expect.arrayContaining([expect.objectContaining(randomProperty)]),
    );
  });
});
