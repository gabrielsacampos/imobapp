import { Test, TestingModule } from '@nestjs/testing';
import { CreateOwnerDto } from 'src/repository/owners/dto/create-owner.dto';
import { CreatePropertyDTO } from 'src/repository/properties/dtos/create-property.dtos';
import { SharedModule } from 'src/shared.module';
import { ImobziPropertiesMock } from '../../../test/3rdParty-repositories/imobzi-repositories/properties/imobziProperties.mocks';
import { ImobziPropertiesRepository } from './imobziProperties.repository';
import { ImobziPropertiesService } from './imobziProperties.service';

describe('ImobziPropertiesService', () => {
  let service: ImobziPropertiesService;
  let propertiesMock: ImobziPropertiesMock;

  beforeEach(async () => {
    propertiesMock = new ImobziPropertiesMock();
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [ImobziPropertiesService, { provide: ImobziPropertiesRepository, useValue: propertiesMock }],
    }).compile();

    service = moduleRef.get<ImobziPropertiesService>(ImobziPropertiesService);
  });

  test('service should be defined', () => {
    expect(service).toBeDefined();
  });

  test('getAllProperties ', async () => {
    const properties = propertiesMock.allPropertiesFullData;
    const propertyTest = properties[0];
    const result: CreatePropertyDTO = await service.getRequiredData(propertyTest.db_id.toString());
    for (const item in result) {
      expect(result[item]).toBeDefined();
    }
  });

  test('getRequiredPropertyOwnersToDb should return array of defined owners', () => {
    const properties = propertiesMock.allPropertiesFullData;
    const propertyTest = properties[0];
    const result: CreateOwnerDto[] = service.getRequiredPropertyOwnersToDb(propertyTest.owners);
    for (const item in result) {
      expect(result[item]).toBeDefined();
    }
  });
});
