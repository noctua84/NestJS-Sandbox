import { Test, TestingModule } from '@nestjs/testing';
import { MetricsService } from './metrics.service';
import { Registry } from 'prom-client';
import {
    MockContext,
    createMockContext,
} from '../../../test/mocks/prisma.mock';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { KNOWN_ERROR_CODES } from './constants/metrics.constants';

describe('HealthService', () => {
    let service: MetricsService;
    let mockRegistry: Registry;
    let prismaService: PrismaService;
    let mockPrismaClient: MockContext['prisma'];

    beforeEach(async () => {
        mockRegistry = new Registry();
        const mockContext = createMockContext();
        mockPrismaClient = mockContext.prisma;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MetricsService,
                PrismaService,
                {
                    provide: Registry,
                    useValue: mockRegistry,
                },
                {
                    provide: PrismaClient,
                    useValue: mockPrismaClient,
                },
            ],
        }).compile();

        service = module.get<MetricsService>(MetricsService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    describe('service', () => {
        it('should be defined', () => {
            expect(service).toBeDefined();
            expect(prismaService).toBeDefined();
        });

        it('should return the prom client', () => {
            expect(service.getPromClient()).toBeDefined();
        });

        it('should return the metrics', async () => {
            const metrics = await service.getMetrics();
            expect(metrics).toBeDefined();
        });
    });

    describe('metrics container', () => {
        describe('counter', () => {
            it('should create a counter', () => {
                const counter = service.registerCounter('test', 'test', [
                    'test',
                ]);
                expect(counter).toBeDefined();
            });

            it('should not create a counter if it already exists', () => {
                const counter = service.registerCounter('test', 'test', [
                    'test',
                ]);
                const counter2 = service.registerCounter('test', 'test', [
                    'test',
                ]);
                expect(counter).toBeDefined();
                expect(counter2).toBeDefined();
                expect(counter).toEqual(counter2);
            });
        });

        describe('histogram', () => {
            it('should create a histogram', () => {
                const histogram = service.registerHistogram(
                    'test',
                    'test',
                    ['test'],
                    [1, 2],
                );
                expect(histogram).toBeDefined();
            });

            it('should not create a histogram if it already exists', () => {
                const histogram = service.registerHistogram(
                    'test',
                    'test',
                    ['test'],
                    [1, 2],
                );
                const histogram2 = service.registerHistogram(
                    'test',
                    'test',
                    ['test'],
                    [1, 2],
                );
                expect(histogram).toBeDefined();
                expect(histogram2).toBeDefined();
                expect(histogram).toEqual(histogram2);
            });
        });

        describe('gauge', () => {
            it('should create a gauge', () => {
                const gauge = service.registerGauge('test', 'test', ['test']);

                expect(gauge).toBeDefined();
            });

            it('should not create a gauge if it already exists', () => {
                const gauge = service.registerGauge('test', 'test', ['test']);
                const gauge2 = service.registerGauge('test', 'test', ['test']);

                expect(gauge).toBeDefined();
                expect(gauge2).toBeDefined();
                expect(gauge).toEqual(gauge2);
            });
        });

        describe('summary', () => {
            it('should create a summary', () => {
                const summary = service.registerSummary(
                    'test',
                    'test',
                    ['test'],
                    [1, 2],
                );

                expect(summary).toBeDefined();
            });

            it('should not create a summary if it already exists', () => {
                const summary = service.registerSummary(
                    'test',
                    'test',
                    ['test'],
                    [1, 2],
                );
                const summary2 = service.registerSummary(
                    'test',
                    'test',
                    ['test'],
                    [1, 2],
                );

                expect(summary).toBeDefined();
                expect(summary2).toBeDefined();
                expect(summary).toEqual(summary2);
            });
        });
    });

    describe('error code trackers', () => {
        it.each(KNOWN_ERROR_CODES)(
            'should successfully increment counter for $code',
            async (code: number) => {
                service.incrementErrorCodeCounter(code.toString(), 'test');

                const metrics = await service.getMetrics();
                expect(metrics).toBeDefined();
                expect(metrics).toContain(
                    `http_requests_error_${code}_total{route="test"}`,
                );
            },
        );
    });
});
