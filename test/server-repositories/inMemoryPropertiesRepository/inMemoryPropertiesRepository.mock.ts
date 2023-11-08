import { CreatePropertyDTO } from 'src/repository/properties/dtos/create-property.dtos';
import { Property } from 'src/repository/properties/entities/property.entity';

export const inMemoryPropertiesRepositoryMock: CreatePropertyDTO[] = [
  {
    id_imobzi: 'prop1',
    unity: '101A',
    type: 'apartment',
    active: true,
    status: 'available',
    id_building_imobzi: 'building1',
    area: 80,
    bedroom: 2,
    suite: 1,
    garage: 1,
    rental_value: 2000,
    sale_value: 300000,
    alternative_code: 'ABC123',
    owners: [],
  },
  {
    id_imobzi: 'prop2',
    unity: '202B',
    type: 'apartment',
    active: true,
    status: 'available',
    id_building_imobzi: 'building1',
    area: 90,
    bedroom: 3,
    suite: 2,
    garage: 2,
    rental_value: 2500,
    sale_value: 350000,
    alternative_code: 'DEF456',
    owners: [],
  },
  {
    id_imobzi: 'prop3',
    unity: '301',
    type: 'house',
    active: true,
    status: 'available',
    id_building_imobzi: 'building2',
    area: 120,
    bedroom: 4,
    suite: 3,
    garage: 2,
    rental_value: 3000,
    sale_value: 450000,
    alternative_code: 'GHI789',
    owners: [],
  },
  {
    id_imobzi: 'prop4',
    unity: 'C101',
    type: 'apartment',
    active: true,
    status: 'available',
    id_building_imobzi: 'building3',
    area: 70,
    bedroom: 1,
    suite: 0,
    garage: 1,
    rental_value: 1500,
    sale_value: 200000,
    alternative_code: 'JKL012',
    owners: [],
  },
  {
    id_imobzi: 'prop5',
    unity: '101',
    type: 'office',
    active: true,
    status: 'occupied',
    id_building_imobzi: 'building4',
    area: 60,
    bedroom: 0,
    suite: 0,
    garage: 0,
    rental_value: 1800,
    sale_value: 250000,
    alternative_code: 'MNO345',
    owners: [],
  },
  {
    id_imobzi: 'prop6',
    unity: '401',
    type: 'warehouse',
    active: true,
    status: 'available',
    id_building_imobzi: 'building5',
    area: 300,
    bedroom: 0,
    suite: 0,
    garage: 0,
    rental_value: 4000,
    sale_value: 550000,
    alternative_code: 'PQR678',
    owners: [],
  },
  {
    id_imobzi: 'prop7',
    unity: '502',
    type: 'apartment',
    active: false,
    status: 'unavailable',
    id_building_imobzi: 'building6',
    area: 95,
    bedroom: 3,
    suite: 2,
    garage: 2,
    rental_value: 2300,
    sale_value: 320000,
    alternative_code: 'STU901',
    owners: [],
  },
  {
    id_imobzi: 'prop8',
    unity: '201',
    type: 'shop',
    active: true,
    status: 'available',
    id_building_imobzi: 'building7',
    area: 150,
    bedroom: 0,
    suite: 0,
    garage: 0,
    rental_value: 5000,
    sale_value: 700000,
    alternative_code: 'VWX234',
    owners: [],
  },
  {
    id_imobzi: 'prop9',
    unity: '1A',
    type: 'apartment',
    active: true,
    status: 'available',
    id_building_imobzi: 'building8',
    area: 85,
    bedroom: 2,
    suite: 1,
    garage: 1,
    rental_value: 2200,
    sale_value: 310000,
    alternative_code: 'YZ0123',
    owners: [],
  },
  {
    id_imobzi: 'prop10',
    unity: 'B202',
    type: 'apartment',
    active: true,
    status: 'available',
    id_building_imobzi: 'building9',
    area: 100,
    bedroom: 3,
    suite: 2,
    garage: 2,
    rental_value: 2600,
    sale_value: 370000,
    alternative_code: '456XYZ',
    owners: [],
  },
];