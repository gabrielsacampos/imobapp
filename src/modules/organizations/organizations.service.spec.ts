import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryOrganizationsRepository } from '../../test/server-repositories/inMemoryOrganizationsRepository/inMemoryOrganizationsRepository';
import { inMemoryOrganizationsRepositoryMock } from '../../test/server-repositories/inMemoryOrganizationsRepository/inMemoryOrganizationsRepository.mock';
import { CreateOrganizationDTO } from './dtos/create-organization.dtos';
import { OrganizationsRepository } from './organizations.repository';
import { OrganizationsService } from './organizations.service';

describe('OrganizationsService', () => {
  let service: OrganizationsService;
  let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
  beforeEach(async () => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationsService,
        { provide: OrganizationsRepository, useValue: inMemoryOrganizationsRepository },
      ],
    }).compile();

    service = module.get<OrganizationsService>(OrganizationsService);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('upsert > should update organization when it exists', async () => {
    const spyUpdate = jest.spyOn(inMemoryOrganizationsRepository, 'update');

    const organizationTest: CreateOrganizationDTO = inMemoryOrganizationsRepositoryMock[0];
    organizationTest.email = 'NewEmail@gmail.com';
    const result = await service.upsert(organizationTest);
    const updatedPerson = inMemoryOrganizationsRepositoryMock.find((organization) => {
      return organization.id_imobzi === organizationTest.id_imobzi;
    });
    expect(result).toEqual(updatedPerson);
    expect(result.email).toBe('NewEmail@gmail.com');
    expect(spyUpdate).toHaveBeenCalled();
  });

  it('upsert > should create organization when it NOT exists', async () => {
    const spyCreate = jest.spyOn(inMemoryOrganizationsRepository, 'update');
    const organizationTest: CreateOrganizationDTO = inMemoryOrganizationsRepositoryMock[0];
    organizationTest.id = 9898;
    const result = await service.upsert(organizationTest);
    const updatedPerson = inMemoryOrganizationsRepositoryMock.find((organization) => {
      return organization.id_imobzi === organizationTest.id_imobzi;
    });
    expect(result).toEqual(updatedPerson);
    expect(result.id).toBe(9898);
    expect(spyCreate).toHaveBeenCalled();
  });
});
