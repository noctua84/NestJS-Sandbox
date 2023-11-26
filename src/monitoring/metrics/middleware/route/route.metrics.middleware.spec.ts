import { RouteMetricsMiddleware } from './route.metrics.middleware';
import client from 'prom-client';
import { Request, Response } from 'express';
import { MetricsService } from '../../metrics.service';
import { Test, TestingModule } from '@nestjs/testing';
import { metricsServiceMock } from '../../../../../test/mocks/metrics.mock';

describe('RouteMetricsMiddleware', () => {
    let req: Request;
    let res: Response;
    let next: jest.Mock;
    let middleware: RouteMetricsMiddleware;
    let mockMetricsService: Partial<MetricsService>;
    let finishCallback: () => void;

    beforeEach(async () => {
        mockMetricsService = metricsServiceMock;

        finishCallback = jest.fn();
        req = { originalUrl: '/test' } as Request;
        res = {} as Response;
        res.on = jest.fn().mockImplementation((event, callback) => {
            if (event === 'finish') {
                finishCallback = callback;
            }
        });
        next = jest.fn();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RouteMetricsMiddleware,
                {
                    provide: MetricsService,
                    useValue: mockMetricsService,
                },
            ],
        }).compile();

        middleware = module.get<RouteMetricsMiddleware>(RouteMetricsMiddleware);

        client.register.clear();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create a middleware instance', () => {
        it('should be defined', () => {
            expect(middleware).toBeDefined();
        });
    });

    describe('Request handling', () => {
        it('should correctly extract the endpoint from the request object and register the appropriate counters and histograms', () => {
            middleware.use(req, res, next);
            finishCallback();

            expect(next).toHaveBeenCalled();

            expect(mockMetricsService.registerCounter).toHaveBeenCalledWith(
                'test_requests_total',
                'The total number of requests',
                ['route', 'test', 'all'],
            );
            expect(mockMetricsService.registerCounter).toHaveBeenCalledWith(
                'test_successful_requests_total',
                'The total number of successful requests',
                ['route', 'test', 'success'],
            );
            expect(mockMetricsService.registerCounter).toHaveBeenCalledWith(
                'test_failed_requests_total',
                'The total number of failed requests',
                ['route', 'test', 'error'],
            );
            expect(mockMetricsService.registerHistogram).toHaveBeenCalledWith(
                'test_response_time',
                'The response time in seconds',
                ['route', 'test', 'time'],
                [0.1, 0.2, 0.3, 0.5, 1, 1.5, 2, 3, 4, 5, 10],
            );

            expect(mockMetricsService.registerCounter).toHaveBeenCalledTimes(3);
            expect(mockMetricsService.registerHistogram).toHaveBeenCalledTimes(
                1,
            );
        });

        it('should correctly handle the case where the endpoint is "/" and replace it with "root"', () => {
            req.originalUrl = '/';

            middleware.use(req, res, next);

            finishCallback();

            expect(next).toHaveBeenCalled();

            expect(mockMetricsService.registerCounter).toHaveBeenCalledWith(
                'root_requests_total',
                'The total number of requests',
                ['route', 'root', 'all'],
            );
            expect(mockMetricsService.registerCounter).toHaveBeenCalledWith(
                'root_successful_requests_total',
                'The total number of successful requests',
                ['route', 'root', 'success'],
            );
            expect(mockMetricsService.registerCounter).toHaveBeenCalledWith(
                'root_failed_requests_total',
                'The total number of failed requests',
                ['route', 'root', 'error'],
            );
            expect(mockMetricsService.registerHistogram).toHaveBeenCalledWith(
                'root_response_time',
                'The response time in seconds',
                ['route', 'root', 'time'],
                [0.1, 0.2, 0.3, 0.5, 1, 1.5, 2, 3, 4, 5, 10],
            );

            expect(mockMetricsService.registerCounter).toHaveBeenCalledTimes(3);
            expect(mockMetricsService.registerHistogram).toHaveBeenCalledTimes(
                1,
            );
        });
    });
});
