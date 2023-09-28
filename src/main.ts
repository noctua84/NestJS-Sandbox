import { NestFactory, PartialGraphHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { writeFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        snapshot: true,
        abortOnError: false,
    });

    const configService = app.get(ConfigService);
    const port = configService.get('server.port');

    await app.listen(port);
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
