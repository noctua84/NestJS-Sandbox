import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { createMockContext, MockContext } from '../../test/mocks/prisma.mock';
import { PrismaClient } from '@prisma/client';

describe('PrismaService', () => {
    let service: PrismaService;
    let mockPrismaClient: MockContext['prisma'];

    beforeEach(async () => {
        const mockContext: MockContext = createMockContext();
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

    describe('Service Methods', () => {
        describe('getPrismaClient', () => {
            it('should return an instance of the PrismaClient class', () => {
                const prismaClient: PrismaClient = service.getPrismaClient();
                expect(prismaClient).toBe(mockPrismaClient);
            });
        });

        describe('addPaging', () => {
            it('should return an empty object when no paging arguments are provided', () => {
                const pagingArgs = service.addPaging();
                expect(pagingArgs).toEqual({});
            });

            it('should return a paging object with cursor arguments when paging type is cursor', () => {
                process.env.PAGING_TYPE = 'cursor';
                const pagingArgs = service.addPaging(1, 10);
                expect(pagingArgs).toEqual({
                    cursor: {
                        id: 1,
                    },
                    take: 10,
                });
            });

            it('should return a paging object with offset arguments when paging type is offset', () => {
                process.env.PAGING_TYPE = 'offset';
                const pagingArgs = service.addPaging(1, 10);
                expect(pagingArgs).toEqual({
                    skip: 0,
                    take: 10,
                });
            });
        });
    });
});
