import { RouteMetricsMiddleware } from './route.metrics.middleware';
import client from 'prom-client';
import { Request, Response } from 'express';
import sinon from 'sinon';

describe('RouteMetricsMiddleware', () => {
    let req: Request;
    let res: Response;
    let next: sinon.SinonSpy;
    let middleware: RouteMetricsMiddleware;

    beforeEach(() => {
        req = {} as Request;
        res = {} as Response;
        next = sinon.spy();
        middleware = new RouteMetricsMiddleware(client);
        client.register.clear();
    });

    describe('create a middleware instance', () => {
        it('should be defined', () => {
            expect(middleware).toBeDefined();
        });
    });

    describe('test the overall, success and failure counters', () => {
        it('should increase the requests total and successful requests total counters', async () => {
            req.originalUrl = '/test';
            res.statusCode = 200;
            res.on = (event, callback) => {
                if (event === 'finish') {
                    callback();
                }

                return res;
            };

            middleware.use(req, res, next);

            const metrics = await client.register.metrics();
            const requestsTotal = client.register.getSingleMetric(
                'test_requests_total',
            );
            const successfulRequestsTotal = client.register.getSingleMetric(
                'test_successful_requests_total',
            );

            expect(requestsTotal).toBeDefined();
            expect(successfulRequestsTotal).toBeDefined();

            setTimeout(() => {
                expect(metrics).toContain(
                    'test_successful_requests_total{route="test",success="success"} 1',
                );
                expect(metrics).toContain(
                    'test_requests_total{route="test",all="all"} 1',
                );
            }, 100);
        });

        it('should increase the requests total and failed requests total counters', async () => {
            req.originalUrl = '/test';
            res.statusCode = 400;
            res.on = (event, callback) => {
                if (event === 'finish') {
                    callback();
                }

                return res;
            };

            middleware.use(req, res, next);

            const metrics = await client.register.metrics();
            const requestsTotal = client.register.getSingleMetric(
                'test_requests_total',
            );
            const failedRequestsTotal = client.register.getSingleMetric(
                'test_failed_requests_total',
            );

            expect(requestsTotal).toBeDefined();
            expect(failedRequestsTotal).toBeDefined();

            setTimeout(() => {
                expect(metrics).toContain(
                    'test_failed_requests_total{route="test",error="error"} 1',
                );
                expect(metrics).toContain(
                    'test_requests_total{route="test",all="all"} 1',
                );
            }, 100);
        });
    });

    describe('test the duration histogram', () => {
        it('should update the request duration histogram for a successful request', async () => {
            req.originalUrl = '/test';
            res.statusCode = 200;
            res.on = (event: string, callback) => {
                if (event === 'finish') {
                    callback();
                }

                return res;
            };

            middleware.use(req, res, next);

            const metrics = await client.register.metrics();

            expect(metrics).toContain(
                'test_response_time_bucket{le="0.1",route="test",time="time"} 1',
            );
            expect(metrics).toContain(
                'test_response_time_bucket{le="0.3",route="test",time="time"} 1',
            );
            expect(metrics).toContain(
                'test_response_time_bucket{le="0.5",route="test",time="time"} 1',
            );
            expect(metrics).toContain(
                'test_response_time_bucket{le="1",route="test",time="time"} 1',
            );
            expect(metrics).toContain(
                'test_response_time_bucket{le="1.5",route="test",time="time"} 1',
            );
            expect(metrics).toContain(
                'test_response_time_bucket{le="2",route="test",time="time"} 1',
            );
            expect(metrics).toContain(
                'test_response_time_bucket{le="3",route="test",time="time"} 1',
            );
            expect(metrics).toContain(
                'test_response_time_bucket{le="4",route="test",time="time"} 1',
            );
            expect(metrics).toContain(
                'test_response_time_bucket{le="5",route="test",time="time"} 1',
            );
            expect(metrics).toContain(
                'test_response_time_bucket{le="10",route="test",time="time"} 1',
            );
            expect(metrics).toContain(
                'test_response_time_bucket{le="+Inf",route="test",time="time"} 1',
            );
            expect(metrics).toContain(
                'test_response_time_sum{route="test",time="time"}',
            );
            expect(metrics).toContain(
                'test_response_time_count{route="test",time="time"} 1',
            );
        });
    });
});
