import { PrismaService } from './prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PrismaModule } from './prisma.module';

describe('PrismaModule', () => {
    let prismaService: PrismaService;
    let prismaClient: PrismaClient;
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [PrismaService, PrismaClient],
            imports: [PrismaModule],
        }).compile();

        prismaService = module.get<PrismaService>(PrismaService);
        prismaClient = module.get<PrismaClient>(PrismaClient);
    });

    it('should define prismaService', () => {
        expect(prismaService).toBeDefined();
    });

    it('should define prismaClient', () => {
        expect(prismaClient).toBeDefined();
    });

    it('prismaClient should be a singleton', () => {
        const prismaClient2 = module.get<PrismaClient>(PrismaClient);

        expect(prismaClient).toBe(prismaClient2);
    });
});
