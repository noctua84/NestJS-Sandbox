import { Test, TestingModule } from '@nestjs/testing';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { InternalServerErrorException } from '@nestjs/common';
import { Registry } from 'prom-client';
import { PrismaClient } from '@prisma/client';
import {
    MockContext,
    createMockContext,
} from '../../../test/mocks/prisma.mock';
import { PrismaService } from '../../prisma/prisma.service';

describe('MetricsController', () => {
    let controller: MetricsController;
    let metricsService: MetricsService;
    let prismaService: PrismaService;
    let mockRegistry: Registry;
    let mockPrismaClient: MockContext['prisma'];

    beforeEach(async () => {
        mockRegistry = new Registry();
        const mockContext = createMockContext();
        mockPrismaClient = mockContext.prisma;

        const module: TestingModule = await Test.createTestingModule({
            controllers: [MetricsController],
            providers: [
                MetricsService,
                PrismaService,
                { provide: Registry, useValue: mockRegistry },
                {
                    provide: PrismaClient,
                    useValue: mockPrismaClient,
                },
            ],
        }).compile();

        controller = module.get<MetricsController>(MetricsController);
        metricsService = module.get<MetricsService>(MetricsService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    describe('resources', () => {
        it('should be defined', () => {
            expect(controller).toBeDefined();
            expect(metricsService).toBeDefined();
            expect(prismaService).toBeDefined();
        });
    });

    describe('get metrics', () => {
        it('should return a string', async () => {
            expect(await controller.getMetrics()).toEqual(expect.any(String));
        });

        it('should call getMetrics() method', () => {
            const spy = jest.spyOn(controller, 'getMetrics');
            controller.getMetrics();
            expect(spy).toHaveBeenCalled();
        });

        it('should return a string of metrics when successful', async () => {
            const expectedMetrics = 'metrics';
            jest.spyOn(controller['metrics'], 'getMetrics').mockResolvedValue(
                expectedMetrics,
            );
            const result = await controller.getMetrics();

            // Assert
            expect(result).toBe(expectedMetrics);
        });

        it('should return the same metrics on subsequent calls', async () => {
            const expectedMetrics = 'metrics';

            jest.spyOn(controller['metrics'], 'getMetrics').mockResolvedValue(
                expectedMetrics,
            );
            const result1 = await controller.getMetrics();
            const result2 = await controller.getMetrics();

            // Assert
            expect(result1).toBe(expectedMetrics);
            expect(result2).toBe(expectedMetrics);
        });
    });

    describe('get metrics error handling', () => {
        it('should return an error when metrics retrieval fails', async () => {
            const expectedError = new InternalServerErrorException(
                'An error occurred while retrieving metrics.',
            );

            jest.spyOn(controller['metrics'], 'getMetrics').mockRejectedValue(
                expectedError,
            );

            await expect(controller.getMetrics()).rejects.toThrow(
                expectedError,
            );
        });

        it('should return an error when metrics are not available', async () => {
            const expectedError = new InternalServerErrorException(
                'An error occurred while retrieving metrics.',
            );

            jest.spyOn(controller['metrics'], 'getMetrics').mockRejectedValue(
                '',
            );

            await expect(controller.getMetrics()).rejects.toThrow(
                expectedError,
            );
        });
    });
});
