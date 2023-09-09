import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
    imports: [
        DevtoolsModule.register({
            http: process.env.NODE_ENV !== 'production',
        }),
        HealthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
