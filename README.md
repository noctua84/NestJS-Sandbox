[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
  
# NestJS Sandbox API-App
This application is mainly a playground to test technology concerning APIs and TypeScript.  
It has no purpose to supply a fully working application but a work-in-progress approach.  
Although it has it's limitations due to its WIP-nature, it might also be a usefull source of inspriation or a staringpoint for your next app.
  
The applications' branching strategy follows git-flow.  
The main development branch is develop and everything finished lives in main. Frozen states will live under versions. It will also integrate commitizen for commits and release please to automate changelog and release. The application also has a continous integration setup following along.  
In this, the application does not fully follow the git-flow approach but creats a bit of its own.  
The app has two continous integragtion pipelines: one for the main branch and one for the development branch. The one for the main branch runs coverage scans and build, as well as changlog and release, whereas the one for the development branch runs the tests, linting and formatting jobs.  
A real continious integration approach would do everything on the main branch and does not apply any specific branching strategy. This would though colide a bit with release please since it would create a new releas each time a 'fix' or 'feat' commit is done. That is why the ongoing development is done in a dedicated branch whereas the usable state is in the main branch and the releases. 

## Technologies used:
The following list contains technologies and approaches, that are used/demoed in the application.

## Tools used:
- Pipline-Tools:
    - [Qodana](https://www.qodana.cloud) is a code quality tool. It requires an active JetBrains account with subscription to be used. The pipeline configuration can be found [here](./.github/workflows/qodana-scan.yml). (paid tool) 
    - [Dependabot](https://github.com/dependabot) is a dependancy management tool exclusivly for GitHub. The pipeline configuration can be found [here](./.github/dependabot.yml). (free tool)  
    Importand: the labels and milestones mentioned in the configuration need to be present in the respective github project.
    - [Release Please](https://github.com/googleapis/release-please) is used for release and changelog automation in the [CI-Pipeline](./.github/workflows/ci.yml). It depends on conventional-commits-style of commits. (free tool)
- Commits:
    - [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) is used for commits and utilizes [commitizen](https://github.com/commitizen/cz-cli). (free tool)
- Development:
    - [NestJS-Devtools](devtools.nestjs.com) is a tool to analyse and debug your local NestJS application (paid tool)
- Environment-Management:
    - [dotenv-Vault](https://www.dotenv.org/docs) is a tool to securly distribute your environment configurations across platforms and teams. It is a new way to safely store environment variables. It works with an encrypted .env.vault file that is save to add to version controll and requires an account on dotenv.org. It is recommended though to set up your own account if you want to use your own .env config. See [here](#dotenv-vault) for more info about the integration into this app. (free tool)

## NestJS integrated tools:
- [Read-Eval-Print-Loop(REPL)](docs.nestjs.com/recipes/repl) is a simple interactive environment for dependency graph and to try out methods from providers and/or controllers from the terminal.

## Feature List:
This section contains a list of features, that are implemented and/or planned. As the application has no definite targed so does this list. It will be updated accordingly
- [x] Metrics with Prometheus (default metrics)
- [x] Healthcheck with Terminus (certain endpoints and database)
- [ ] Databaseinteraction with Prisma (Postgresql, MongoDB)
- [ ] Migrations
- [ ] API documentation with OpenAPI
- [x] Unit tests with Jest
- [x] Configuration with NestJS Config
- [x] Configuration schema and validation with Joi

## Documentation:
This section lists topics, that have their own file, where they are discussed in detail but in scope of the application.  
  
### [dotenv-vault](./documentation/dotenv-vault.md)
### [Prisma ORM](./documentation/prisma-orm.md)