[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![CodeFactor](https://www.codefactor.io/repository/github/noctua84/nestjs-sandbox/badge)](https://www.codefactor.io/repository/github/noctua84/nestjs-sandbox)
[![codecov](https://codecov.io/gh/noctua84/NestJS-Sandbox/graph/badge.svg?token=JZMjRX3oRi)](https://codecov.io/gh/noctua84/NestJS-Sandbox) [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fnoctua84%2FNestJS-Sandbox.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fnoctua84%2FNestJS-Sandbox?ref=badge_shield)
 
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=noctua84_NestJS-Sandbox&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=noctua84_NestJS-Sandbox)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=noctua84_NestJS-Sandbox&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=noctua84_NestJS-Sandbox)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=noctua84_NestJS-Sandbox&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=noctua84_NestJS-Sandbox)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=noctua84_NestJS-Sandbox&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=noctua84_NestJS-Sandbox)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=noctua84_NestJS-Sandbox&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=noctua84_NestJS-Sandbox)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=noctua84_NestJS-Sandbox&metric=bugs)](https://sonarcloud.io/summary/new_code?id=noctua84_NestJS-Sandbox)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=noctua84_NestJS-Sandbox&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=noctua84_NestJS-Sandbox)

  
# NestJS Sandbox API-App
This application is mainly a playground to test technology concerning APIs and TypeScript.  
It has no purpose to supply a fully working application but a work-in-progress approach.  
Although it has its limitations due to its WIP-nature,
it might also be a useful source of inspiration or a staring point for your next app.  
To serve as a starting point, the repository is marked as a template.
  
The applications' branching strategy roughly follows git-flow.  
The main development branch is develop and everything finished lives in main. Frozen states will live under versions. It will also integrate commitizen for commits and release please to automate changelog and releases. The application also has a continous integration setup following along.  
The app has two continuous integration pipelines: one for the main branch and one for the development branch. The one for the main branch runs coverage scans and build, as well as changlog and release, whereas the one for the development branch runs the tests, linting and formatting jobs.  
A real continuous integration approach would do everything on the main branch and does not apply any specific branching strategy. This would though colide a bit with release please since it would create a new releas each time a 'fix' or 'feat' commit is done. That is why the ongoing development is done in a dedicated branch whereas the usable state is in the main branch and the releases. 

## NestJS and Microservices
This application can be transformed into a microservice application by using the NestJS microservice module.
NestJS supports microservices out of the box. The module is called @nestjs/microservices and the documentation can be found [here](https://docs.nestjs.com/microservices/basics).
To transfer this application into a microservice, you need to do the following steps:
- install the microservice module ``` npm install --save @nestjs/microservices ```
- change the main.ts file to create a microservice instead of a web application.
  To achieve this, change this line ``` const app: INestApplication = await NestFactory.create(AppModule); ``` 
  to this line ``` const app: INestMicroservice = await NestFactory.createMicroservice(AppModule, { transport: Transport.TCP }); ```
The default transport is TCP, but you can also use other transports like Redis, RabbitMQ or gRPC.

## Tools used:
- Pipelines:
  - GitHub Actions is used as the default pipeline runner. The repository has two different pipelines, one attached to the dev-branch and one to the main-branch.
    - [CI-Dev(](./.github/workflows/ci-dev.yml): This pipeline runs tests, limiting and formatting it is triggered by any commit to the develop branch.
    - [CI](./.github/workflows/ci.yml): This pipeline runs an additional dependency check, coverage, build and release steps.  
  - [CircleCI](https://www.circleci.com) is a pipeline runner like GitHub actions but with a different way to configure jobs. This is mainly for experimenting with different pipline types and configurations. (freemium tool) To remove or edit the integration, modify or delet the [CI config](./.circleci/config.yml)
- Pipeline-Tools:
    - [Dependabot](https://github.com/dependabot) is a dependency management tool exclusively for GitHub. The pipeline configuration can be found [here](./.github/dependabot.yml). (free tool)  
    Important: the labels and milestones mentioned in the configuration need to be present in the respective github project.
    - [Release Please](https://github.com/googleapis/release-please) is used for release and changelog automation in the [CI-Pipeline](./.github/workflows/ci.yml). It depends on conventional-commits-style of commits. (free tool)
    - [CodeCov](https://codecov.io) is a tool to manage code coverage, and make visible, which parts of the code base needs test improvements.
    - [SonarCloud](https://sonarcloud.io) is a tool for overall code quality, maintainability and coverage. To remove the integration, delete the file [sonar-projects.properties](./sonar-project.properties) and the step in the [ci-pipeline](./.github/workflows/ci.yml) and [ci-dev-pipeline](./.github/workflows/ci-dev.yml).
- Commits:
    - [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) is used for commits and utilizes [commitizen](https://github.com/commitizen/cz-cli). (free tool)
- Development:
    - [NestJS-Devtools](devtools.nestjs.com) is a tool to analyse and debug your local NestJS application (paid tool)
- Environment-Management:
    - [dotenv-Vault](https://www.dotenv.org/docs) is a tool to securely distribute your environment configurations across platforms and teams. It is a new way to safely store environment variables. It works with an encrypted .env.vault file that is save to add to version controll and requires an account on dotenv.org. It is recommended though to set up your own account if you want to use your own .env config. See [here](#dotenv-vault) for more info about the integration into this app. (free tool)
    - As an alternative, you can also change the .env.example file to .env and add your values there. Use this approach if you don't want to use dotenv-vault.
    - In order to fully use both approaches, the application makes use of dotenv-expand as well.

## NestJS integrated tools:
- [Read-Eval-Print-Loop(REPL)](docs.nestjs.com/recipes/repl) is a simple interactive environment for dependency graphs and trying out methods from providers and/or controllers from the terminal.

## Feature List:
This section contains a list of features, that are implemented and/or planned. As the application has no definite targed so does this list. It will be updated accordingly
- [x] Metrics with Prometheus
  - [x] Collection of default metrics
  - [x] Collection of prisma metrics
  - [x] Middleware for usage data
  - [x] Service methods for different metric types
    - [x] Service method for counter
    - [x] Service method for histogram
    - [x] Service method for gauge
    - [x] Service method for summary
- [x] Healthcheck with Terminus (certain endpoints and database)
  - [x] Healthcheck for root endpoint
  - [ ] Healthcheck for a database
- [x] Database interaction with Prisma
  - [x] Enable prometheus metrics for prisma (usage)
  - [ ] Migrations
  - [x] Seeds
  - [x] prisma commands (package.json)
  - [ ] prisma query options as a service method
    - [x] paging  
  - [x] prisma generators
    - [x] [Entity relationship diagram (ERD)](./documentation/prisma-orm.md#erd-generator)  
    - [x] [NestJS DTOs](./documentation/prisma-orm.md#nestjs-dto-generator)
- [x] API documentation with OpenAPI
- [x] Unit tests with Jest
- [x] Configuration with NestJS Config
- [x] Configuration schema and validation with Joi

## Deployment
- [x] Dockerfile
- [ ] Helm Chart

## Documentation:
This section lists topics, that have their own file, where they are discussed in detail but in scope of the application.  
  
### [dotenv-vault](./documentation/dotenv-vault.md)
### [Prisma ORM](./documentation/prisma-orm.md)
### [Entity Relationship Diagram](./documentation/ERD.md)



## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fnoctua84%2FNestJS-Sandbox.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fnoctua84%2FNestJS-Sandbox?ref=badge_large)