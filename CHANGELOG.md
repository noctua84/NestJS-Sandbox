# Changelog

## [0.7.7](https://github.com/noctua84/NestJS-Sandbox/compare/v0.7.6...v0.7.7) (2023-12-19)


### Bug Fixes

* **pipeline:** added missing permission to add docker image to registry ([39581c4](https://github.com/noctua84/NestJS-Sandbox/commit/39581c47deea26a8aea5cd92d8b9d9ab4f2cf7af))

## [0.7.6](https://github.com/noctua84/NestJS-Sandbox/compare/v0.7.5...v0.7.6) (2023-12-19)


### Bug Fixes

* **pipeline:** added log output to automerge action ([397541d](https://github.com/noctua84/NestJS-Sandbox/commit/397541dc4b1bcfd9686da884c317962551f69281))

## [0.7.5](https://github.com/noctua84/NestJS-Sandbox/compare/v0.7.4...v0.7.5) (2023-12-19)


### Bug Fixes

* **pipeline scripts:** moved sh-script content back into pipeline ([401185c](https://github.com/noctua84/NestJS-Sandbox/commit/401185cf348310f4ee209116c33da25e1d9353aa))

## [0.7.4](https://github.com/noctua84/NestJS-Sandbox/compare/v0.7.3...v0.7.4) (2023-12-18)


### Bug Fixes

* **pipeline scripts:** added checks to the release scripts to stop if no PR is present ([6ca1cb6](https://github.com/noctua84/NestJS-Sandbox/commit/6ca1cb6572028ee9bd123a68a4d54266727bcb53))

## [0.7.3](https://github.com/noctua84/NestJS-Sandbox/compare/v0.7.2...v0.7.3) (2023-12-17)


### Bug Fixes

* **pipeline docker:** moved repo data extraction to script file and refactored the steps ([a031dc2](https://github.com/noctua84/NestJS-Sandbox/commit/a031dc2852d91b6d8c27c18b81d07efaf853f5c7))
* **pipline docker:** fixed env access in docker tag creation ([2ca176c](https://github.com/noctua84/NestJS-Sandbox/commit/2ca176c12e0bf89a169eed36a02ac0e5668d77b9))

## [0.7.2](https://github.com/noctua84/NestJS-Sandbox/compare/v0.7.1...v0.7.2) (2023-12-17)


### Bug Fixes

* **pipeline scripts:** add missing steps in the release job to locate the scripts ([c8cb0da](https://github.com/noctua84/NestJS-Sandbox/commit/c8cb0dafbb0b7c9526c70655d0e774eb069ea804))
* **pipeline scripts:** fixed access error for scripts in the pipeline ([b411702](https://github.com/noctua84/NestJS-Sandbox/commit/b4117028bce74cf46bdfd4fb9be54a9adccc1ee4))

## [0.7.1](https://github.com/noctua84/NestJS-Sandbox/compare/v0.7.0...v0.7.1) (2023-12-16)


### Bug Fixes

* **pipeline scripts:** fixed a typo in the naming of th label script ([0c9b038](https://github.com/noctua84/NestJS-Sandbox/commit/0c9b0383d68e4d062fbbbed4643e5728e88bbd83))

## [0.7.0](https://github.com/noctua84/NestJS-Sandbox/compare/v0.6.3...v0.7.0) (2023-12-15)


### Features

* **pipeline scripts:** added pipeline scripts as separate js files ([3cbb90a](https://github.com/noctua84/NestJS-Sandbox/commit/3cbb90a7792b8d6f4107c89f5492742679da5c85))


### Bug Fixes

* **pipeline:** fixed another issue with the label step ([842b317](https://github.com/noctua84/NestJS-Sandbox/commit/842b317210c569890a6428fa91f5bdb3f5ffb98b))

## [0.6.3](https://github.com/noctua84/NestJS-Sandbox/compare/v0.6.2...v0.6.3) (2023-12-15)


### Bug Fixes

* **pipeline:** wrong label name ([3c13cbc](https://github.com/noctua84/NestJS-Sandbox/commit/3c13cbcd73bb88f7eb98d8954311acffca31a034))

## [0.6.2](https://github.com/noctua84/NestJS-Sandbox/compare/v0.6.1...v0.6.2) (2023-12-15)


### Bug Fixes

* **pipeline:** missing merge trigger label ([aa53c7e](https://github.com/noctua84/NestJS-Sandbox/commit/aa53c7eb880f0477df186a838417beab4b0fc5ee))
* **pipeline:** updated the version of the script action and refined it ([a561e56](https://github.com/noctua84/NestJS-Sandbox/commit/a561e5641677d9fa497558dea4c274389107c879))

## [0.6.1](https://github.com/noctua84/NestJS-Sandbox/compare/v0.6.0...v0.6.1) (2023-12-14)


### Bug Fixes

* pipeline bugfix for releas step ([744ea26](https://github.com/noctua84/NestJS-Sandbox/commit/744ea26b48ab970a2289165e286dd8c0539cbb95))

## [0.6.0](https://github.com/noctua84/NestJS-Sandbox/compare/v0.5.0...v0.6.0) (2023-12-13)


### Features

* add .env.example as an alternative to dotenv-vault ([7915404](https://github.com/noctua84/NestJS-Sandbox/commit/791540449a9469388a1be84840fb64f2c775f7d2))


### Bug Fixes

* reverted a dependency update and added an additional step to the pipeline job ([48e6fd2](https://github.com/noctua84/NestJS-Sandbox/commit/48e6fd25206dfe7896ac756b50c5ff8d2a1023b9))

## [0.5.0](https://github.com/noctua84/NestJS-Sandbox/compare/v0.4.1...v0.5.0) (2023-12-10)


### Features

* **docker:** added Dockerfile for deployment ([44b5c1e](https://github.com/noctua84/NestJS-Sandbox/commit/44b5c1e5a3f457ee10b2110ee5393539b042dce3))

## [0.4.1](https://github.com/noctua84/NestJS-Sandbox/compare/v0.4.0...v0.4.1) (2023-12-09)


### Bug Fixes

* **metrics service:** metrics collection was not propperly initialized ([04d04c8](https://github.com/noctua84/NestJS-Sandbox/commit/04d04c853ac878f040eca73dbc552f0b3bdc2ddd))

## [0.4.0](https://github.com/noctua84/NestJS-Sandbox/compare/v0.3.0...v0.4.0) (2023-11-26)


### Features

* **db seeds:** added skeleton for database seeding ([12ebcb9](https://github.com/noctua84/NestJS-Sandbox/commit/12ebcb93c04123fd5907864b127598802053d359))
* **metrics:** added reg methods for gauge and summery and error code tracker ([05b846c](https://github.com/noctua84/NestJS-Sandbox/commit/05b846c26184176c6a2dc0af71ec904691f4319a))
* **prisma:** enabled postgres extension support in schema.prisma ([2c8af62](https://github.com/noctua84/NestJS-Sandbox/commit/2c8af6231fed409726b34fc30cf733957bb683b8))


### Bug Fixes

* **metrics:** fixed a bug where metrics could be atempted to be registerd more than once ([9916412](https://github.com/noctua84/NestJS-Sandbox/commit/9916412b415cde2c24f5b06f6b7ce20f9d36d153))

## [0.3.0](https://github.com/noctua84/NestJS-Sandbox/compare/v0.2.0...v0.3.0) (2023-11-26)


### Features

* **config refinement:** added additional server config vars and their usage ([e35da1b](https://github.com/noctua84/NestJS-Sandbox/commit/e35da1bceda213fcbe548858205fcc2c88c32fdb))
* **feature flag module:** added a dedicated module for featureflag configuration and app wide usage ([fe2ec10](https://github.com/noctua84/NestJS-Sandbox/commit/fe2ec10037dd1fc11b202fa37b80e41c5cc2b48c))
* **health:** added healthcheck endpoint to monitor the applications health status ([a173408](https://github.com/noctua84/NestJS-Sandbox/commit/a1734085c4c7dcdc36749313412a9a827697df0e))
* **metrics:** add prometheus metrics endpoint for application metrics ([e495d5c](https://github.com/noctua84/NestJS-Sandbox/commit/e495d5cf8c0f79242d78d84c5a51cb47be39d1ef))
* **metrics:** added metrics and rout metrics middleware ([38ddc29](https://github.com/noctua84/NestJS-Sandbox/commit/38ddc299a55382ed348d3e9c2ca15ffa6e7ad000))
* **prisma metrics:** added prisma metrics to metrics collection ([c1caddb](https://github.com/noctua84/NestJS-Sandbox/commit/c1caddbb3a7a7e360697c0a4dfd53ffe1c40c412))
* **prisma:** added prisma as orm ([f523cdf](https://github.com/noctua84/NestJS-Sandbox/commit/f523cdf0f701ebf2cb0d12ba4d257978faded307))


### Bug Fixes

* **app:** fixed a bug where a dummy module was not deleted correctly ([64a5569](https://github.com/noctua84/NestJS-Sandbox/commit/64a556970f9f93c01019a84aaece841f7b1cfb53))
* import statements and dependencies ([9cbf13a](https://github.com/noctua84/NestJS-Sandbox/commit/9cbf13a3b1ed8ec9ea5e983090b92c7b4196a3df))
* **metrics:** added missing dependency exports and imports ([fe3e32f](https://github.com/noctua84/NestJS-Sandbox/commit/fe3e32f376b9ae898e8859d298b86a244252568d))
* **metrics:** middleware was trying to register metrics multiple times ([8aef4e1](https://github.com/noctua84/NestJS-Sandbox/commit/8aef4e18127aa6d6f3660b480a0a29a9c7c33a06))

## [0.2.0](https://github.com/noctua84/NestJS-Sandbox/compare/v0.1.0...v0.2.0) (2023-09-28)


### Features

* added basic health check for the  root endpoint ([bccee36](https://github.com/noctua84/NestJS-Sandbox/commit/bccee360a992fb18e7137e0441e83b16666b988d))
* **commitizen:** added commitizen as commit tool ([2d92778](https://github.com/noctua84/NestJS-Sandbox/commit/2d92778089006f19bd6bddca34043df33d7a0f1e))
* **config:** added nestjs/config, joi and config entry points for server config and feature flags ([688a820](https://github.com/noctua84/NestJS-Sandbox/commit/688a82077d82079bb98c0fe326c138f2036456ab))
* **health:** implementation of basic health controll ([039bb0a](https://github.com/noctua84/NestJS-Sandbox/commit/039bb0a694a2fb2fb9a8d57f09776de49423f10c))
* integration of nestjs dev tools ([8f0a796](https://github.com/noctua84/NestJS-Sandbox/commit/8f0a79622cd512ecce2ec2c64a244520637957d0))
* **repl:** added a Read-Eval-Print-Loop for inspections ([7197a2d](https://github.com/noctua84/NestJS-Sandbox/commit/7197a2dbe529bb6e77f25bf0c23c0341c0705f6c))


### Bug Fixes

* added a fix for a code style issue shown by qodana ([d52160f](https://github.com/noctua84/NestJS-Sandbox/commit/d52160f63b2b2fa733065897a1fae74fe2b7284a))

## [0.1.0](https://github.com/noctua84/NestJS-Sandbox/compare/v0.0.1...v0.1.0) (2023-08-31)


### Features

* pipeline setup ([5bee189](https://github.com/noctua84/NestJS-Sandbox/commit/5bee189e402be6ee834546d8baba6f488e85a9c8))
