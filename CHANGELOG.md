# Changelog

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
