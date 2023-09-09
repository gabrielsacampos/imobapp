# ImobManager

This application has the function of storing data provided by a third-party API, which currently manages property rental payments for a property management company. After the complete integration between this application and the third-party API, we will create new features based on the data persisted in our own database.

> Third-Party API: **imobzi.com**

BackEnd structure: 
  - NestJs
  - MySql
  - BullMq

Our Entities: 
  - People :white_check_mark:
  - Organizations :white_check_mark:
  - Buildings :white_check_mark:
  - Properties :clock10:
    - Owners :clock10:
  - Leases :clock10:
    - Leases_items :clock10:
    - Tenants :clock10:
  - Invoices :clock10:
    - Invoices_items :clock10:
  - Updates_table :clock10: