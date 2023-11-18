import { InjectQueue } from '@nestjs/bull';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { BuildingDTO } from 'src/3party-client/imobzi/imobzi-buildings/dtos/imobziBuildings.dtos';
import { ContactDTO } from 'src/3party-client/imobzi/imobzi-contacts/dtos/imobziContacts.dtos';
import { AllImobziInvoiceDTO } from 'src/3party-client/imobzi/imobzi-invoices/dto/all-imobzi-invoice.dtos';
import { LeaseDTO } from 'src/3party-client/imobzi/imobzi-leases/dtos/imobziLeases.dtos';
import { PropertyDTO } from 'src/3party-client/imobzi/imobzi-properties/dtos/imobziProperties.dtos';
import { ImobziRepository } from 'src/3party-client/imobzi/imobzi.repository';
import { ModulesServices } from 'src/modules/modules.service';
import { StoreDb, StoreDbType } from './interfaces/imobziQueue.interface';

@Injectable()
export class QueueImobziProducer {
  private logger = new Logger('QueueImobziProducer');
  constructor(
    @InjectQueue('ImobziQueue') private readonly imobziQueue: Queue,
    private readonly imobziRepository: ImobziRepository,
    private readonly modulesService: ModulesServices,
  ) {}

  async produce(data: StoreDb) {
    try {
      const { type, contacts, buildings, properties, leases, invoices } = data;

      if (contacts) {
        await this.produceContacts(type);
      }

      if (buildings) {
        await this.produceBuildings(type);
      }

      if (properties) {
        await this.produceProperties(type);
      }

      if (leases) {
        await this.produceLeases();
      }

      if (invoices) {
        await this.produceInvoices(invoices.start_due_date);
      }

      return { message: 'running imobziQueue' };
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async produceContacts(type: StoreDbType): Promise<void> {
    try {
      this.logger.verbose('.produceContacts() running');
      const allContacts: ContactDTO[] = await this.imobziRepository.contact.getAll();
      const lastPeopleUpdate = await this.modulesService.updates.entitylastUpdate('people');

      let peopleToUpdate: any;
      if (type === 'backup') {
        peopleToUpdate = allContacts.filter((contact) => contact.contact_type === 'person');
      } else {
        peopleToUpdate = allContacts.filter((contact) => {
          if (contact.contact_type === 'person') {
            return new Date(contact.updated_at) > lastPeopleUpdate.updated_at;
          }
        });
      }

      this.logger.verbose(`${peopleToUpdate.length} people to ${type} catched from Imobzi`);

      if (peopleToUpdate.length > 0) {
        for (const person of peopleToUpdate) {
          await this.imobziQueue.add('updatePeople', person, {
            attempts: 3,
            delay: 3000,
            backoff: { delay: 10000, type: 'exponential' },
          });
        }
      } else {
        this.logger.verbose(`people already up to date`);
      }

      const lastOrgsUpdated = await this.modulesService.updates.entitylastUpdate('organizations');

      let orgsToUpdate: any;
      if (type === 'backup') {
        orgsToUpdate = allContacts.filter((contact) => contact.contact_type === 'organization');
      } else {
        orgsToUpdate = allContacts.filter((contact) => {
          if (contact.contact_type === 'organization') {
            return new Date(contact.updated_at) > lastOrgsUpdated.updated_at;
          }
        });
      }

      this.logger.verbose(`${orgsToUpdate.length} orgs to ${type} catched from Imobzi`);

      if (orgsToUpdate.length > 0) {
        for (const org of orgsToUpdate) {
          await this.imobziQueue.add('updateOrganizations', org, {
            attempts: 3,
            delay: 3000,
            backoff: { delay: 10000, type: 'exponential' },
          });
        }
      } else {
        this.logger.verbose(`organizations already up to date`);
      }
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async produceBuildings(type: StoreDbType): Promise<void> {
    try {
      this.logger.verbose('.produceBuildings() running');
      const allBuildings: BuildingDTO[] = await this.imobziRepository.building.getAll();
      const lastBuildingUpdate = await this.modulesService.updates.entitylastUpdate('buildings');

      let buildingsToUpdate: BuildingDTO[];
      if (type === 'backup') {
        buildingsToUpdate = allBuildings;
      } else {
        buildingsToUpdate = allBuildings.filter((building) => {
          return new Date(building.updated_at) > lastBuildingUpdate.updated_at;
        });
      }

      if (buildingsToUpdate.length > 0) {
        for (const building of buildingsToUpdate) {
          await this.imobziQueue.add('updateBuildings', building, {
            attempts: 3,
            delay: 3000,
            backoff: { delay: 10000, type: 'exponential' },
          });
        }
      } else {
        this.logger.verbose(`buildings already up to date`);
      }
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async produceProperties(type: StoreDbType): Promise<void> {
    try {
      this.logger.verbose('.produceProperties() running');
      const allProperties: PropertyDTO[] = await this.imobziRepository.property.getAll();

      const lastpropertiesToUpdate = await this.modulesService.updates.entitylastUpdate('properties');

      let propertiesToUpdate: any[];
      if (type === 'backup') {
        propertiesToUpdate = allProperties;
      } else {
        propertiesToUpdate = allProperties.filter((property) => {
          return new Date(property.updated_at) > lastpropertiesToUpdate.updated_at;
        });
      }

      if (propertiesToUpdate.length > 0) {
        for (const property of propertiesToUpdate) {
          await this.imobziQueue.add('updateProperties', property, {
            attempts: 3,
            delay: 3000,
            backoff: { delay: 10000, type: 'exponential' },
          });
        }
      } else {
        this.logger.verbose(`properties already up to date`);
      }
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async produceLeases() {
    try {
      this.logger.verbose('.produceLeases() running');
      const allLeases: LeaseDTO[] = await this.imobziRepository.lease.getAll();

      for (const lease of allLeases) {
        await this.imobziQueue.add('updateLeases', lease, {
          attempts: 3,
          delay: 3000,
          backoff: { delay: 10000, type: 'exponential' },
        });
        this.logger.verbose(` ${allLeases.length} leases to check updates`);
      }
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async produceInvoices(start_due_date: string): Promise<void> {
    try {
      this.logger.verbose('.produceInvoices() running');
      const allInvoices: AllImobziInvoiceDTO[] = await this.imobziRepository.invoice.getAll(start_due_date);
      const immutableInvoicesIds = await this.modulesService.invoices.inmutableInvoicesIds();
      const invoicesToUpsert = allInvoices.filter((invoice) => {
        return !immutableInvoicesIds.includes(invoice.invoice_id);
      });
      this.logger.verbose(` ${invoicesToUpsert.length} invoices to check updates`);

      for (const invoice of invoicesToUpsert) {
        await this.imobziQueue.add('updateInvoices', invoice, {
          attempts: 3,
          delay: 3000,
          backoff: { delay: 10000, type: 'exponential' },
        });
      }
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }
}
