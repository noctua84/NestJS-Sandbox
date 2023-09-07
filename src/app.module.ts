import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { HealthModule } from './health/health.module';

@Module({
    imports: [HealthModule],
    controllers: [AppController, HealthController],
    providers: [AppService],
})
export class AppModule {}
