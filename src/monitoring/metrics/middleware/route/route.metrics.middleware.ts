import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import client from 'prom-client';
import { NextFunction, Request, Response } from 'express';

const endpointCounters = new Map<string, client.Counter>();
const endpointHistograms = new Map<string, client.Histogram>();

@Injectable()
export class RouteMetricsMiddleware implements NestMiddleware {
    constructor(
        @Inject('PROM_CLIENT') private readonly promClient: typeof client,
    ) {}

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

        // counters for total requests, successful requests, and failed requests
        if (!endpointCounters.has(endpoint)) {
            endpointCounters.set(
                endpoint + '_requests_total',
                new this.promClient.Counter({
                    name: endpoint + '_requests_total',
                    help: 'Total number of HTTP requests made.',
                    labelNames: ['route', endpoint, 'all'],
                }),
            );
            endpointCounters.set(
                endpoint + '_successful_requests_total',
                new this.promClient.Counter({
                    name: endpoint + '_successful_requests_total',
                    help: 'Total number of successful HTTP requests made.',
                    labelNames: ['route', endpoint, 'success'],
                }),
            );
            endpointCounters.set(
                endpoint + '_failed_requests_total',
                new this.promClient.Counter({
                    name: endpoint + '_failed_requests_total',
                    help: 'Total number of failed HTTP requests made.',
                    labelNames: ['route', endpoint, 'error'],
                }),
            );
        }

        // histogram for response time
        if (!endpointHistograms.has(endpoint)) {
            endpointHistograms.set(
                endpoint + '_response_time',
                new this.promClient.Histogram({
                    name: endpoint + '_response_time',
                    help: 'Response time in milliseconds',
                    labelNames: ['route', endpoint, 'time'],
                    buckets: [0.1, 0.3, 0.5, 1, 1.5, 2, 3, 4, 5, 10],
                }),
            );
        }

        const start = process.hrtime();

        res.on('finish', () => {
            const [seconds, nanoseconds] = process.hrtime(start);
            const duration = seconds + nanoseconds / 1e9;

            if (res.statusCode >= 200 && res.statusCode < 300) {
                endpointCounters
                    .get(endpoint + '_successful_requests_total')
                    .inc({ route: endpoint, success: 'success' });
            } else {
                endpointCounters
                    .get(endpoint + '_failed_requests_total')
                    .inc({ route: endpoint, error: 'error' });
            }

            endpointHistograms
                .get(endpoint + '_response_time')
                .observe({ route: endpoint, time: 'time' }, duration);
        });

        endpointCounters
            .get(endpoint + '_requests_total')
            .inc({ route: endpoint, all: 'all' });

        next();
    }
}
