# ImobManager

This application has the function of storing data provided by a third-party API, which currently manages property rental payments for a property management company. After the complete integration between this application and the third-party API, we will create new features based on the data persisted in our own database.

### To follow in your dependencies:
``` 
$ git clone https://github.com/gabrielsacampos/imobManager-server-NestJs.git && npm i
```

-----
### Config Prisma: 
We need to determinate **DATABASE_URL** for a MySQL database. You typically need to obtain this information from your hosting provider or your own server configuration. The **DATABASE_URL** is a connection string that contains the necessary information for connecting to the MySQL database. It typically follows this format:
```mysql://username:password@hostname:port/database```

set on file **.env**
```DATABASE_URL_MYSQL="mysql://username:password@hostname:port/database?schema=public"```
remember: `?schema=public` in the end.

#### On terminal, to migrate PrismaSchema:
```
 $ npx prisma migrate dev
```
*Seeds to dump into database come soon.*

----------------

#### On terminal, to start server:
```
$ npm run start:dev
```


> Our API: **http://localhost:3000/api**

note: _API's documentation still in construction. For now, we can only see the endpoints and params. Body examples and schemas come soon._

> Third-Party API: **https://developer.imobzi.com/#section/Introduction**


BackEnd structure: 
  - NestJs
  - Prisma ORM
  - MySql
  - BullMQ

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
   
3rd-party Api Modules:
  - ImobziContacts
  - ImobziPeople
  - ImobziOrganizations
  - ImobziBuildings
  - ImobziProperties
  - ImobziLeases
  - ImobziInvoices
