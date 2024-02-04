import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { FeatureConfigService } from '../../config/featureconfig/featureconfig.service';
import { RouteMetricsMiddleware } from '../metrics/middleware/route/route.metrics.middleware';
import { FeatureConfigModule } from '../../config/featureconfig/featureconfig.module';
import { MetricsModule } from '../metrics/metrics.module';
import { MetricsService } from '../metrics/metrics.service';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [
        TerminusModule.forRoot({
            errorLogStyle: 'pretty',
        }),
        HttpModule,
        FeatureConfigModule,
        MetricsModule,
        PrismaModule,
    ],
    controllers: [HealthController],
    providers: [MetricsService, PrismaService],
})
export class HealthModule {
    constructor(private readonly featureFlags: FeatureConfigService) {}

    configure(consumer: MiddlewareConsumer) {
        if (this.featureFlags.isMetricsEnabled()) {
            consumer.apply(RouteMetricsMiddleware).forRoutes('*');
        }
    }
}
