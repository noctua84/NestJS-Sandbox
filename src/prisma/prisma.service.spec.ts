import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { createMockContext, MockContext } from '../../test/mocks/prisma.mock';
import { PrismaClient } from '@prisma/client';

describe('PrismaService', () => {
    let service: PrismaService;
    let mockPrismaClient: MockContext['prisma'];

    beforeEach(async () => {
        const mockContext = createMockContext();
        mockPrismaClient = mockContext.prisma;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PrismaService,
                {
                    provide: PrismaClient,
                    useValue: mockPrismaClient,
                },
            ],
        }).compile();

        service = module.get<PrismaService>(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Initialization', () => {
        it('should be defined', () => {
            expect(service).toBeDefined();
        });
    });

    describe('Application Shutdown', () => {
        it('should call $disconnect on application shutdown', async () => {
            await service.onApplicationShutdown();
            expect(mockPrismaClient.$disconnect).toHaveBeenCalledTimes(1);
        });
    });
});
