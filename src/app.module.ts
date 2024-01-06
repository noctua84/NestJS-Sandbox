import Joi from 'joi';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './monitoring/health/health.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { ConfigModule } from '@nestjs/config';
import serverConfig, { serverConfigSchema } from './config/server.config';
import { MetricsModule } from './monitoring/metrics/metrics.module';
import monitoringConfig, {
    healthCheckConfigSchema,
    metricsConfigSchema,
} from './config/monitoring.config';
import { RouteMetricsMiddleware } from './monitoring/metrics/middleware/route/route.metrics.middleware';
import { FeatureConfigModule } from './config/featureconfig/featureconfig.module';
import { FeatureConfigService } from './config/featureconfig/featureconfig.service';
import { PrismaModule } from './prisma/prisma.module';
import { MetricsService } from './monitoring/metrics/metrics.service';
import { PrismaService } from './prisma/prisma.service';
import appConfig, { appConfigSchema } from './config/app.config';

const composeModules = () => {
    const registeredModules: any = [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            expandVariables: true,
            load: [serverConfig, monitoringConfig, appConfig],
            validationSchema: Joi.object({
                ...serverConfigSchema,
                ...metricsConfigSchema,
                ...healthCheckConfigSchema,
                ...appConfigSchema,
            }),
        }),
        FeatureConfigModule,
        PrismaModule,
    ];

    if (process.env.ENABLE_DEVTOOLS === 'true') {
        registeredModules.push(
            DevtoolsModule.register({
                http: process.env.NODE_ENV !== 'production',
            }),
        );
    }

    if (process.env.ENABLE_METRICS === 'true') {
        registeredModules.push(MetricsModule);
    }

    if (process.env.ENABLE_HEALTH_CHECK === 'true') {
        registeredModules.push(HealthModule);
    }

    return registeredModules;
};

const composeProviders = () => {
    const registeredProviders: any = [
        AppService,
        FeatureConfigService,
        PrismaService,
    ];

    if (process.env.ENABLE_METRICS === 'true') {
        registeredProviders.push(MetricsService);
    }

    return registeredProviders;
};

@Module({
    imports: composeModules(),
    controllers: [AppController],
    providers: composeProviders(),
})
export class AppModule {
    constructor(private readonly featureFlags: FeatureConfigService) {}

    configure(consumer: MiddlewareConsumer) {
        if (this.featureFlags.isMetricsEnabled() === 'true') {
            consumer.apply(RouteMetricsMiddleware).forRoutes('*');
        }
    }
}
