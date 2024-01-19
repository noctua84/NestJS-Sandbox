import { NestFactory, PartialGraphHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { writeFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { otelSDK } from './monitoring/tracing/tracing';

async function bootstrap() {
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
