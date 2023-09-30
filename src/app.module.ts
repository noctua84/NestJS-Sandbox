import Joi from 'joi';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { ConfigModule } from '@nestjs/config';
import serverConfig, { serverConfigSchema } from './config/server.config';
import { MetricsModule } from './metrics/metrics.module';
import monitoringConfig, {
    healthCheckConfigSchema,
    metricsConfigSchema,
} from './config/monitoring.config';
import { RouteMetricsMiddleware } from './metrics/middleware/route/route.metrics.middleware';
import { FeatureConfigModule } from './config/featureconfig/featureconfig.module';
import { FeatureConfigService } from './config/featureconfig/featureconfig.service';

@Module({
    imports: [
        DevtoolsModule.register({
            http: process.env.NODE_ENV !== 'production',
        }),
        HealthModule,
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            expandVariables: true,
            load: [serverConfig, monitoringConfig],
            validationSchema: Joi.object({
                ...serverConfigSchema,
                ...metricsConfigSchema,
                ...healthCheckConfigSchema,
            }),
        }),
        MetricsModule,
        FeatureConfigModule,
    ],
    controllers: [AppController],
    providers: [AppService, FeatureConfigService],
})
export class AppModule {
    constructor(private readonly featureFlags: FeatureConfigService) {}

    configure(consumer: MiddlewareConsumer) {
        if (this.featureFlags.isMetricsEnabled()) {
            consumer.apply(RouteMetricsMiddleware).forRoutes('*');
        }
    }
}
