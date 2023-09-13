# ImobManager

This application has the function of storing data provided by a third-party API, which currently manages property rental payments for a property management company. After the complete integration between this application and the third-party API, we will create new features based on the data persisted in our own database.

> Our API: http://localhost:3000/api

note: _API documentation still in construction. For now, we can only see the endpoint and params. Body examples and schemas come soon._

> Third-Party API: **imobzi.com**


BackEnd structure: 
  - NestJs
  - MySql
  - BullMq

Our Entities: 
  - People :white_check_mark:
  - Organizations :white_check_mark:
  - Buildings :white_check_mark:
  - Properties :white_check_mark:
    - Owners :white_check_mark:
  - Leases :white_check_mark:
    - Leases_items :white_check_mark:
  - Invoices :white_check_mark:
    - Invoices_items :white_check_mark:
  - Updates_table :clock10: