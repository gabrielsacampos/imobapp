import { BuildingDTO } from 'src/3party-client/imobzi/imobzi-buildings/dtos/imobziBuildings.dtos';

export class ImobziBuildingsMock {
  pagination = {
    page1: { cursor: 'abc', properties: [{ db_id: 111111 }, { db_id: 2222222 }] },
    page2: { cursor: null, properties: [{ db_id: 333333 }, { db_id: 4444444 }] },
  };
  items: BuildingDTO[] = [
    {
      address: '123 Main St',
      city: 'New York',
      building_name: 'Building A',
      zipcode: '10001',
      db_id: '23312341',
    },
    {
      address: '456 Elm St',
      city: 'Los Angeles',
      building_name: 'Building B',
      zipcode: '90001',
      db_id: '4314124',
    },
    {
      address: '789 Oak St',
      city: 'Chicago',
      building_name: 'Building C',
      zipcode: '60601',
      db_id: '43254132',
    },
    {
      address: '321 Pine St',
      city: 'San Francisco',
      building_name: 'Building D',
      zipcode: '94101',
      db_id: '776735',
    },
    {
      address: '654 Maple St',
      city: 'Miami',
      building_name: 'Building E',
      zipcode: '33101',
      db_id: '352',
    },
    {
      address: '987 Cedar St',
      city: 'Seattle',
      building_name: 'Building F',
      zipcode: '98101',
      db_id: '542543',
    },
    {
      address: '135 Walnut St',
      city: 'Boston',
      building_name: 'Building G',
      zipcode: '02101',
      db_id: '123131',
    },
    {
      address: '864 Cherry St',
      city: 'Dallas',
      building_name: 'Building H',
      zipcode: '75201',
      db_id: '1231333331',
    },
    {
      address: '246 Birch St',
      city: 'Denver',
      building_name: 'Building I',
      zipcode: '80201',
      db_id: '44432',
    },
    {
      address: '579 Spruce St',
      city: 'Phoenix',
      building_name: 'Building J',
      zipcode: '85001',
      db_id: '6534524',
    },
  ];

  async getAllBuildings(): Promise<BuildingDTO[]> {
    return this.items;
  }
}
