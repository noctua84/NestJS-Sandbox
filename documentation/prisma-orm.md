## Setup Prisma
The information provided under this topic is related to a fresh install. Regarding this project, the steps are already done and are only documented as a reference.  
You can also follow [this guide](https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0) if you are new to prisma and want to set it up on your own or in your own projects.  
The official documentation can be found here: [Prisma Documentation](https://www.prisma.io/docs)
  
To actually use Prisma in your project, you need to follow the steps outlined next:
First, install the prisma package ``` npm install -D prisma ```
After installing the package, you need to run ``` npx prisma init ``` to initialize Prisma inside of your project.  
Next, add your database url to your .env file.  
Then, open the schema.prisma file, located in the prisma folder in the app root-dir, and set the provider in the datasource block to match your database.  
Currently supported by the orm are: postgresql, mysql, sqlite, sqlserver, mongodb and cockroachdb  
The next step depends on your project:
- If you setup prisma in a blank project, simply run ``` npx prisma generate ``` to generate the actual prisma client and start working with the db.
- If you already have an existing database run ``` npx prisma db pull ``` first to generate your prisma schema out of your existing database schema. After that, run ```  npx prisma generate ``` to generate the client and continue.

Per schema only one datasource is allowed.  
If more than one database is needed in the project, this can be done by structuring the respective schema.prisma files in different folders but it is not a supported szenario for prisma.  
  
The prisma client is generated by the prisma cli using this command: ``` npx prisma generate ```.  
The command will evaluate the schema.prisma file and at first run, install the @prisma/client and prisma packages and afterwards create the actual prisma client.
In order to generate the basic prisma client, the application contains a really basic user-model. This is only serving as an initializer for the prisma client and can be removed, edited or renamed according to the applications needs.  
After creation, the client can be used like this:  
``` 
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```

## Working with Prisma  
### Script Commands (package.json)
In order to ease the process of working with prisma, several commands were added to package.json.  
List of commands:
- ``` npm run prisma:generate ``` This command will generate or regenerate the prisma client.
- ``` npm run prisma:migrate:dev ``` This command will apply all migrations, that were not applied 
- ``` npm run prisma:migrate:dev:init ``` This command will create and apply the inital, or first migration. This normaly only need to be done once per project.
- ``` npm run prisma:migrate:dev:name <migration_name> ``` This command will create and apply any migration after the first one. A name needs to be specified.
- ``` npm run prisma:migrate:dev:reset ``` This command will reset the database. Use this with caution and not in a production environment!
- ``` npm run prisma:migrate:dev:create <migration_name> ``` This command will create a draft migration. This migration only gets created but not applied. In order to apply it, run ``` npm run prisma:migrate:dev ```.
- ``` npm run prisma:migrate:dev:down ``` This command will create a schema-diff in order to be able to revert migrations
- ``` npm run prisma:migrate:dev:rollback <migration_name> ```
- ``` npm run prisma:migrate:status ``` This command will check on the migration status.
- ``` npm run prisma:studio ``` This command runs the integrated database explorer (like pgadmin)

The commands listed above are for development only and designed for SQL-databases.  
To use a NoSQL-database, you need to use ``` prisma db push ``` instead of ``` prisma migrate dev ```  
Additional information can about this topic can be found here: [Use Prisma with MongoDB](https://www.prisma.io/docs/guides/database/mongodb)  

### Models/Entities
If you are used to TypeORM or Sequelize, you might want to create your own model classes or entity objects combining database representation with custom logic to create concious models or only database representations, using simple models. In Prisma though, you define your table structure in the schema.prisma file and only there.  
Each table is represented in that specific file. Each time you add a new model or change an existing one, you need to run ``` npx prisma generate ``` to update the generated client with the new information. 
  
### Migrations
Prisma supports Typescriptfitting migrations out of the box. Other than one might expect, all operations done in a migration are written in raw SQL and are based on what is written down in the schema file. Other than TypeORM and Sequelize, migrations are executed uppon creation!

### Workflow
- create the data model in the schema.prisma file.
- migration process:
  - create a migration diff. For this, run the command ``` prisma:migrate:dev:down ```. It will create a down.sql file in the project root.
  - generate and apply the actual migration. For this, run the command ``` prisma:migrate:dev:name <migration_name> ```. Replace migration_name with the actual name of the migration. 
  - copy the down.sql file generated before in the migration folder under ``` prisma/migrations/<timestamp_migration_name> ```.
  - in case of a failed migration, run the command ``` prisma:migrate:dev:rollback <migration_name> ```. This will execute the down.sql in the migration folder to revert the migration.  
- generate the prisma client using ``` prisma:generate ```.

The step "generate the prisma client" can be automated with running npm run watch:prisma. This command will start a file watcher that regenerates the prisma client each time the file schema.prisma is changed. 

## Prisma and testing
When it comes to prisma and testing, [this Guide](https://www.prisma.io/blog/testing-series-1-8eRB5p0Y8o) is a good start, since it covers topics like mocking, unit testing, integration testing, e2e testing and ci pipelines.