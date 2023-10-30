# ImobManager

This application has the function of storing data provided by a third-party API, which currently manages property rental payments for a property management company. After the complete integration between this application and the third-party API, we will create new features based on the data persisted in our own database.


## Third-party APIs 
 - **Imobzi**: Real State Software, manages payments and contracts/leases
 - **Granatum**: Financial software. Here we handle with cash flow, revenues and expenses. 




BackEnd infra: 
  - NestJs
  - Prisma ORM
  - Postgres
  - Docker
  - BullMQ
  - Jwt Auth
  
Our Entities: 
  - People (Module)
  - Organizations (Module)
  - Buildings (Module)
  - Properties (Module)
    - Owners 
  - Leases (Module)
    - Leases_items 
  - Invoices (Module)
    - Invoices_items
   

## Firts step
### __ImobziService__ is responsable for consume all data from Imobzi API, handle the data and store our own DATABASE. 
  - Imobzi
    - ImobziContacts
    - ImobziPeople
    - ImobziOrganizations
    - ImobziBuildings
    - ImobziProperties
    - ImobziLeases
    - ImobziInvoices

  ### __GranatumService__ after our databse is up to date, this service get paid invoices and divide by catgory each item from invoices to store at cash flow. 
  - Granatum
    - GranatumTransactions
    - GranatumAccounts
    - GranatumCategories
    - GranatumCostCenters
    - GranatumClients
    - GranatumSupliers

### How does each service work? 
  In Application, we have queues:
  
  __QueueImobzi__:  Listening POST method at the endpoint '/queues/imobzi/dump-db' with the body bellow:

  ``` 
  // we can choose wich entity we want to update on db. 
   {
	"contacts": true, 
	"buildings": true,
	"properties": true,
	"leases": true,
	"invoices": true
}
  ```

  __QueueGranatum__:  Listening POST method at the endpoint '/queues/granatum/sync' with the body bellow:

  ``` 
  // here we need to send the payment date from invoices to process queue and sync with Granatum's API. 

	{ "start_at": "2023-08-30", "end_at": "2023-09-29" }
  ```