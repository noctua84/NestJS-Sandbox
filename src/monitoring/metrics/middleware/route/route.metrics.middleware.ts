import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { MetricsService } from '../../metrics.service';
import { KNOWN_ERROR_CODES } from '../../constants/metrics.constants';

@Injectable()
export class RouteMetricsMiddleware implements NestMiddleware {
    constructor(private readonly metricsService: MetricsService) {}

    use(req: Request, res: Response, next: NextFunction) {
        let endpoint = req.originalUrl;

        if (endpoint === '/favicon.ico') {
            next();
            return;
        }

        if (endpoint === '/') {
            endpoint = 'root';
        } else {
            endpoint = endpoint.replace(/\//g, '');
        }

        const totalRequestsCounter = this.metricsService.registerCounter(
            `${endpoint}_requests_total`,
            'The total number of requests',
            ['route', endpoint, 'all'],
        );

        const successfulRequestsCounter = this.metricsService.registerCounter(
            `${endpoint}_successful_requests_total`,
            'The total number of successful requests',
            ['route', endpoint, 'success'],
        );

        const faildRequestCounter = this.metricsService.registerCounter(
            `${endpoint}_failed_requests_total`,
            'The total number of failed requests',
            ['route', endpoint, 'error'],
        );

        const responseTimeHistogram = this.metricsService.registerHistogram(
            `${endpoint}_response_time`,
            'The response time in seconds',
            ['route', endpoint, 'time'],
            [0.1, 0.2, 0.3, 0.5, 1, 1.5, 2, 3, 4, 5, 10],
        );

        const start = process.hrtime();

        res.on('finish', () => {
            const [seconds, nanoseconds] = process.hrtime(start);
            const duration = seconds + nanoseconds / 1e9;
            const trackedErrorCodes = KNOWN_ERROR_CODES;

            if (res.statusCode >= 200 && res.statusCode < 400) {
                successfulRequestsCounter.inc({
                    route: endpoint,
                    success: 'success',
                });
            } else {
                faildRequestCounter.inc({
                    route: endpoint,
                    error: 'error',
                });

                if (trackedErrorCodes.includes(res.statusCode)) {
                    this.metricsService.incrementErrorCodeCounter(
                        res.statusCode.toString(),
                        endpoint,
                    );
                }
            }

            responseTimeHistogram.observe(
                {
                    route: endpoint,
                    time: 'time',
                },
                duration,
            );
        });

        totalRequestsCounter.inc({
            route: endpoint,
            all: 'all',
        });

        next();
    }
}
