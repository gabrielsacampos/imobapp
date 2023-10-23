import * as dotenv from 'dotenv';
dotenv.config();

export class AppUrls {
  urlWebhooksPost(provider: 'imobzi' | 'granatum') {
    return `${process.env.imobapp_api}/webhook/${provider}`;
  }

  urlWebhooks(status: 'done' | 'undone') {
    return `${process.env.imobapp_api}/webhook/${status}`;
  }

  urlProperties(id: number) {
    return `${process.env.imobapp_api}/properties/${id}`;
  }

  urlPeople(id: number) {
    return `${process.env.imobapp_api}/people/${id}`;
  }

  urlOrganizations(id: number) {
    return `${process.env.imobapp_api}/organizations/${id}`;
  }

  urlLeases(id: number) {
    return `${process.env.imobapp_api}/leases/${id}`;
  }

  urlInvoices(id: number) {
    return `${process.env.imobapp_api}/invoices/${id}`;
  }
}

export const appParams = {
  headers: {
    Authorization: `Bearer ${process.env.imobapp_secret}`,
  },
};
