import { NestFactory, PartialGraphHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { writeFileSync } from 'fs';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        snapshot: true,
        abortOnError: false,
    });
    await app.listen(3000);
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
