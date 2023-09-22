import { Test, TestingModule } from '@nestjs/testing';
import { ImobziOrganizationsProvider } from './imobziOrganizations.provider';
import { ImobziOrganizationsService } from './imobziOrganizations.service';

const getOrgMainDataFromImobziMock = [];

describe('ImobziOrganizationsService', () => {
  let imobziOrganizationsService: ImobziOrganizationsService;
  let imobziOrganizationsProviderMock: { getOrgMainDataFromImobzi: jest.Mock };

  beforeEach(async () => {
    imobziOrganizationsProviderMock = { getOrgMainDataFromImobzi: jest.fn() };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ImobziOrganizationsService,
        { provide: ImobziOrganizationsProvider, useValue: imobziOrganizationsProviderMock },
      ],
    }).compile();

    imobziOrganizationsService = moduleRef.get<ImobziOrganizationsService>(ImobziOrganizationsService);

    imobziOrganizationsProviderMock.getOrgMainDataFromImobzi.mockResolvedValue(getOrgMainDataFromImobziMock);
  });

  test('getOrgDataToDb', async () => {
    const result = await imobziOrganizationsService.getOrgDataToDb(1234);
    expect(result).toBe(getOrgMainDataFromImobziMock);
  });
});
