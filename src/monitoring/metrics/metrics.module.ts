import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import client from 'prom-client';
import { RouteMetricsMiddleware } from './middleware/route/route.metrics.middleware';

@Module({
    controllers: [MetricsController],
    providers: [MetricsService, { provide: 'PROM_CLIENT', useValue: client }],
    exports: ['PROM_CLIENT'],
})
export class MetricsModule {
    constructor() {
        client.collectDefaultMetrics();
    }

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(RouteMetricsMiddleware)
            .forRoutes({ path: 'metrics', method: RequestMethod.GET });
    }
}
