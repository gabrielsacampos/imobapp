import { Test, TestingModule } from '@nestjs/testing';
import { CreateBeneficiaryDTO } from 'src/repository/leases/dtos/create-beneficiary.dtos';
import { CreateLeaseDTO } from 'src/repository/leases/dtos/create-lease.dtos';
import { LeaseItemsCreateDTO } from 'src/repository/leases/lease-items/leaseItemsCreate.dtos';
import { SharedModule } from 'src/shared.module';
import { imobziLeaseMock } from '../../../../test/3rdParty-repositories/imobzi-repositories/leases/imobziLease.mock';
import { ImobziLeasesService } from './imobziLeases.service';
import { ImobziLeaseDetailsDTO } from './imobziLeasesDetails.dtos';

describe('ImobziLeasesService', () => {
  let service: ImobziLeasesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [ImobziLeasesService],
    }).compile();

    service = moduleRef.get<ImobziLeasesService>(ImobziLeasesService);
  });

  test('service be defined', () => {
    expect(service).toBeDefined();
  });

  test('getRequiredBeneficiariesDataToDb should format data from lease and return values ready to store on DB', () => {
    const leaseTest = imobziLeaseMock;
    const result: CreateBeneficiaryDTO[] = service.getRequiredLeaseBeneficiariesDataToDb(leaseTest.beneficiaries);
    const expected: CreateBeneficiaryDTO[] = [
      {
        id_beneficiary_organization_imobzi: null,
        id_beneficiary_person_imobzi: '11111111111',
        share: 50,
      },
      {
        id_beneficiary_organization_imobzi: '22222222222',
        id_beneficiary_person_imobzi: null,
        share: 50,
      },
    ];
    expect(result).toEqual(expected);
  });

  test('getRequiredLeaseItemsDataToDb should format items data from lease and return values ready to store on DB', () => {
    const leaseTest = imobziLeaseMock;
    const result: LeaseItemsCreateDTO[] = service.getRequiredLeaseItemsDataToDb(leaseTest.items);

    for (const item in result) {
      expect(result[item]).toBeDefined();
    }
  });

  test('getRequiredLeaseDataToDb should format items data from lease and return values ready to store on DB', async () => {
    const leaseTest: ImobziLeaseDetailsDTO = imobziLeaseMock;
    const result: CreateLeaseDTO = await service.getRequiredLeaseDataToDb(leaseTest);

    for (const item in result) {
      expect(result[item]).toBeDefined();
    }
  });
});
