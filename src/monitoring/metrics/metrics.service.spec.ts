import { Test, TestingModule } from '@nestjs/testing';
import { MetricsService } from './metrics.service';
import { Registry } from 'prom-client';

describe('HealthService', () => {
    let service: MetricsService;
    let mockRegistry: Registry;

    beforeEach(async () => {
        mockRegistry = new Registry();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MetricsService,
                {
                    provide: Registry,
                    useValue: mockRegistry,
                },
            ],
        }).compile();

        service = module.get<MetricsService>(MetricsService);
    });

    describe('service', () => {
        it('should be defined', () => {
            expect(service).toBeDefined();
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
    });
});
