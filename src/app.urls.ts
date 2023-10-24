import * as dotenv from 'dotenv';
dotenv.config();

export const appUrls = {
  urlWebhooksPost(provider: 'imobzi' | 'granatum') {
    return `${process.env.imobapp_server}/webhook/${provider}`;
  },

  urlWebhooks(status: 'done' | 'undone') {
    return `${process.env.imobapp_server}/webhook/${status}`;
  },

  urlProperties(id: number | string | undefined = undefined) {
    if (id) {
      return `${process.env.imobapp_server}/properties/${id}`;
    } else {
      return `${process.env.imobapp_server}/properties`;
    }
  },

  urlPeople(id: number | string | undefined = undefined) {
    if (id) {
      return `${process.env.imobapp_server}/people/${id}`;
    } else {
      return `${process.env.imobapp_server}/people`;
    }
  },

  urlOrganizations(id: number | string | undefined = undefined) {
    if (id) {
      return `${process.env.imobapp_server}/organizations/${id}`;
    } else {
      return `${process.env.imobapp_server}/organizations`;
    }
  },

  urlLeases(id: number | string | undefined = undefined) {
    if (id) {
      return `${process.env.imobapp_server}/leases/${id}`;
    } else {
      return `${process.env.imobapp_server}/leases`;
    }
  },

  urlInvoices(id: number | string | undefined = undefined) {
    if (id) {
      return `${process.env.imobapp_server}/invoices/${id}`;
    } else {
      return `${process.env.imobapp_server}/invoices`;
    }
  },
};

export const appParams = {
  headers: {
    Authorization: `Bearer ${process.env.imobapp_secret}`,
  },
};
