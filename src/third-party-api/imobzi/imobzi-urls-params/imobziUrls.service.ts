export class ImobziUrlService {
  urlPaidInvoices(page: number = 1): string {
    return `https://api.imobzi.app/v1/invoices?page=${page}&status=paid&start_at=2000-01-01&end_at=2100-01-01&contract_type=all&order_by=desc`;
  }

  urlAllInvoices(page: number = 1): string {
    return `https://api.imobzi.app/v1/invoices?page=${page}&status=all&start_at=2000-01-01&end_at=2100-01-01&contract_type=all&order_by=desc`;
  }

  urlAllBuildings(cursor: string): string {
    return `https://api.imobzi.app/v1/properties?smart_list=buildings&cursor=${cursor}`;
  }

  urlInvoiceDetail(invoiceId: number | string): string {
    return `https://api.imobzi.app/v1/invoice/${invoiceId}`;
  }

  urlProperties(status: 'all' | 'unavailable_properties', cursor: string = ''): string {
    return `https://api.imobzi.app/v1/properties?smart_list=${status}&cursor=${cursor}`;
  }

  urlPropertyDetails(propertyId: number | string): string {
    return `https://api.imobzi.app/v1/property/${propertyId}`;
  }

  urlContacts(cursor: string): string {
    return `https://api.imobzi.app/v1/contacts?cursor=${cursor}`;
  }

  urlPersonDetails(personId: number | string | string): string {
    return `https://api.imobzi.app/v1/person/${personId}`;
  }

  urlOrganizationDetails(organizationId: number | string): string {
    return `https://api.imobzi.app/v1/organization/${organizationId}`;
  }

  urlLeaseDetails(leaseId: number | string): string {
    return `https://api.imobzi.app/v1/lease/${leaseId}`;
  }

  urlAllLeases(cursor: string = ''): string {
    return `https://api.imobzi.app/v1/leases?smart_list=all&cursor=${cursor}`;
  }
}

export class ImobziParamService {
  constructor(private readonly imobziSecret: string = process.env.IMOBZI_KEY) {}
  headers = {
    'X-Imobzi-Secret': this.imobziSecret,
    'Content-Type': 'application/json',
  };
  timeout: 100000;
}
