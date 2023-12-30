The Imobapp FullStack is an application designed for a Real Estate company management. At its core, the backend engine efficiently handles data sourced from a third-party API, currently overseeing property rental payments for the enterprise. The application's primary mission is to extract detailed data from the API, carefully store it in our database, and empower many company sectors with real-time insights through the creation of complex queries and detailed reports. Looking ahead, Imobapp is set to evolve into a FullStack Application, unlocking the potential to explore and optimize all facets of the firm's data while introducing cutting-edge functionalities and industry best practices.

Frontend corresponding project available at: 'https://github.com/gabrielsacampos/imobapp-front-next'


# Summary of third-party APIs


## Imobzi:
### Functionalities: 
It works as a detailed ERP for Real Estate, efficiently managing contacts, buildings, and leases. 
- Cons:
  - Limited reporting: The reporting feature is lacking, especially in      consolidating information related to leases, invoices, and buildings.
  - Bulk information management: Managing and editing building information on a large scale is not user-friendly.
  - Inefficient API structure: Lacks individual endpoints for each organization, and occasional data redundancy in simple entity endpoints adds unnecessary complexity.

## Granatum:
### Functionalities: 
Given the limitations in Imobzi ERP's reporting capabilities, we've incorporated Granatum software into our workflow to handle detailed financial reports.
- Cons:
  - While it excels in managing financial reports and data comprehensively, Granatum isn't ideally suited for broader company management. Currently, it works as a supplementary tool in our project.


# Infra:
The server runs smoothly on NestJS, offering a user-friendly framework for seamlessly integrating services and features as our application evolves in complexity. Furthermore, it offers extremely well-defined and clear MVC (Model-View-Controller) patterns.
Within the common NestJS pattern, we employ Services, Controllers, and Modules for each module in the application. In this case, we introduce a novel file type known as Repository. This file takes charge of processing logic from service files, ensuring efficient data handling, and calling on the repository when a database query needs execution. This approach enhances organization in our development workflow.

Our application employs **BullMQ** for listening to POST requests, backed by a **Redis** server. With a user-friendly interface, real-time queue and job statuses are easily monitored. After accurate data processing, **Prisma ORM** seamlessly connects our application to a **PostgreSQL** database for robust data management.

All services in the application are equipped with Jest unit tests, incorporating the "In-Memory Repository" concept by Martin Fowler (https://martinfowler.com/bliki/InMemoryTestDatabase.html). This approach involves using mocks to simulate database connections during testing.

## Infra and database abstraction:
###Requirements and concepts.
####Entities:
#####People
#####Organizations (FK - People as sponsors)
#####Properties (FK - People & Organizations as owner)
- In certain scenarios, properties may have multiple owners, where each owner can be an organization or an individual. To manage this, we introduce a subtable called **Owners** (FK - People / Organizations as owners) to avoid multivalued columns and store the percentage of each property sharing.

#####Buildings (FK - Properties)
 - In this context, buildings are treated as an independent entity. This is crucial as many properties are grouped by a few buildings, necessitating specific queries grouped by this table.


##### Leases - (FK - Properties - FK - Organizations/People as tenant)
##### Invoices - (FK - Leases)
##### Items - (FK - Invoices)*
* *Items are indispensable in our application, especially within invoices. They represent individual line items or products, offering a detailed breakdown of charges or services, including quantity, unit price, and total amount. This information is crucial for accurate billing and financial analysis. Items can include additional attributes like descriptions, codes, or categories, enhancing invoice clarity.
To address real estate industry needs, we've introduced a highly requested feature that separates items from invoices. This facilitates specific functionalities like lending, retained fees, and charges on items. It also enables distinct treatment of items for factors such as segment revenues or refunds, bolstering our accountability efforts.*


##Controllers:
In our system, each entity boasts its own controller, ensuring seamless communication between curl and the server, facilitating efficient data retrieval from the database.
What sets this apart is the integration of queues into two specific controllers and services, enhancing overall functionality and responsiveness.


## Queues - BullMQ
**queueImobzi**: Utilizing the limited database access provided by the Imobzi API, we extract essential properties from each entity, storing them in our database. A POST on ```'/imobzi/backup'`````` triggers the backup logic in the controller. Despite Imobzi's webhooks, incomplete data returns necessitate scrolling through all records for updates.

Type: Currently, limited to "backup," with potential for additional process types in the future.

**Entities (contacts, buildings, properties, leases, and invoices)**: Each entity allows queue workers to handle logic cases for database storage. Queues are strategically sequenced to ensure the completion of related jobs without interference in a cascade.

When a POST on ```'/granatum/sync'``` is received by the controller with properties **payment_start_at** and **payment_end_at**:
  1 - Retrieve paid invoices within the specified range.
 2 - Once invoices are retrieved, the queue determines whether to calculate values and apply rules for storing data in the Granatum service.
3 - Onlending: Manages items with behaviors to transfer amounts to owners.
4 -Revenue: Handles fees charged by the company for managing buildings and deducts from onlending.
5 - Invoice: Manages the most intricate logic of queue jobs by segregating items from invoices. This is crucial as the primary API (Imobzi) does not separate them correctly. Workers use logic to identify descriptions in invoices and categorize them by consuming the Granatum API ('/categories') for matching.


## BFF - Backend for Frontend
This folder is designed to architect specific queries, guaranteeing the perfect delivery of essential data to the frontend application and the accurate composition of components. Explore the frontend project, developed in NextJs, here: 'https://github.com/gabrielsacampos/imobapp-front-next.'
