import { HttpAdapterHost, NestFactory, PartialGraphHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { writeFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { otelSDK } from './monitoring/tracing/tracing';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry.config';
import { SentryFilter } from './sentry/sentry.filter';

async function bootstrap() {
    // init sentry in the bootstrap phase if tracing is not enabled or app is not running in production mode.
    // for production mode, sentry is initialized in the tracing.ts file.
    if (
        process.env.ENABLE_TRACING === 'false' ||
        process.env.NODE_ENV !== 'production'
    ) {
        Sentry.init({
            ...sentryConfig,
        });
    }

    if (process.env.ENABLE_TRACING === 'true') {
        // change process.env.npm_package_name to your service name if needed.
        otelSDK.start();
    }

    const app: INestApplication = await NestFactory.create(AppModule, {
        snapshot: true,
        abortOnError: false,
    });

    const configService: ConfigService<any, boolean> = app.get(ConfigService);
    const port = configService.get('server.port');
    const hostName = configService.get('server.hostname');

    const docsConfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
        .setTitle(configService.get('app.name'))
        .setDescription(configService.get('app.description'))
        .setVersion(configService.get('app.version'))
        .build();
    const document: OpenAPIObject = SwaggerModule.createDocument(
        app,
        docsConfig,
    );
    SwaggerModule.setup('documentation', app, document);

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new SentryFilter(httpAdapter));

    await app.listen(port, hostName);
}

bootstrap()
    .then(() => {
        console.log('NestJS server started');
    })
    .catch((err) => {
        console.error(err);
        writeFileSync('graph.json', PartialGraphHost.toString() ?? '');
        process.exit(1);
    });
