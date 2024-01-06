import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import {
    HealthCheckResult,
    HealthIndicatorResult,
    TerminusModule,
} from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HEALTH_CHECK_KEYS } from './health.constants';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaModule } from '../../prisma/prisma.module';

jest.mock('../../prisma/prisma.service');

describe('HealthController', () => {
    let controller: HealthController;
    let config: ConfigService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                HttpModule,
                TerminusModule.forRoot(),
                ConfigModule.forRoot(),
                PrismaModule,
            ],
            controllers: [HealthController],
            providers: [ConfigService, PrismaService],
        }).compile();

        controller = module.get<HealthController>(HealthController);
        config = module.get<ConfigService>(ConfigService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(config).toBeDefined();
        expect(prisma).toBeDefined();
    });

    it('should have a health check response with details of all indicators when there are no indicators to check', async () => {
        const result: HealthIndicatorResult = {
            info: {
                status: 'up',
            },
            error: {
                status: 'up',
            },
        };

        jest.spyOn(controller['http'], 'pingCheck').mockImplementation(
            (indicator: string) => {
                if (Object.keys(HEALTH_CHECK_KEYS).includes(indicator)) {
                    return Promise.resolve(result);
                }
            },
        );

        jest.spyOn(controller['prisma'], 'pingCheck').mockImplementation(() => {
            return Promise.resolve({ status: 'up' });
        });

        const response: HealthCheckResult = await controller.check();

        expect(response.status).toBe('ok');
        expect(response.info).toBeDefined();
        expect(response.error).toBeDefined();
    });
});
