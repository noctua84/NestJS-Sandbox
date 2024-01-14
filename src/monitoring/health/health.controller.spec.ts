import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import {
    HealthCheckResult,
    HealthIndicatorResult,
    HealthIndicatorStatus,
    TerminusModule,
} from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HEALTH_CHECK_KEYS } from './health.constants';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { FeatureConfigService } from '../../config/featureconfig/featureconfig.service';
import { FeatureConfigModule } from '../../config/featureconfig/featureconfig.module';

jest.mock('../../prisma/prisma.service');
jest.mock('../../config/featureconfig/featureconfig.service');

describe('HealthController', () => {
    let controller: HealthController;
    let config: ConfigService;
    let prisma: PrismaService;
    let featureFlags: FeatureConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                HttpModule,
                TerminusModule.forRoot(),
                ConfigModule.forRoot(),
                PrismaModule,
                FeatureConfigModule,
            ],
            controllers: [HealthController],
            providers: [ConfigService, PrismaService, FeatureConfigService],
        }).compile();

        controller = module.get<HealthController>(HealthController);
        config = module.get<ConfigService>(ConfigService);
        prisma = module.get<PrismaService>(PrismaService);
        featureFlags = module.get<FeatureConfigService>(FeatureConfigService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(config).toBeDefined();
        expect(prisma).toBeDefined();
        expect(featureFlags).toBeDefined();
    });

    describe('check', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        it.each(['up', 'down'])(
            'should return a health check result with status %s for all default checks',
            async (status: string) => {
                const httpResults: HealthIndicatorResult = {};
                const currentStatus: HealthIndicatorStatus =
                    status as HealthIndicatorStatus;

                httpResults[HEALTH_CHECK_KEYS.api] = { status: currentStatus };
                httpResults[HEALTH_CHECK_KEYS.documentation] = {
                    status: currentStatus,
                };

                jest.spyOn(controller['http'], 'pingCheck').mockImplementation(
                    async (key: string) => {
                        return { [key]: { status: currentStatus } };
                    },
                );

                jest.spyOn(
                    controller['prisma'],
                    'pingCheck',
                ).mockImplementation(async () => {
                    return { [HEALTH_CHECK_KEYS.db]: { status: status } };
                });

                const response: HealthCheckResult = await controller.check();

                expect(response.status).toBe('ok');
                expect(response.info).toBeDefined();
                expect(response.error).toBeDefined();
                expect(response.details).toHaveProperty(HEALTH_CHECK_KEYS.api);
                expect(response.details).toHaveProperty(
                    HEALTH_CHECK_KEYS.documentation,
                );
                expect(response.details).toHaveProperty(HEALTH_CHECK_KEYS.db);
                expect(response.error).toStrictEqual({});

                Object.keys(response.details).forEach((key: string) => {
                    expect(response.details[key]).toHaveProperty(
                        'status',
                        currentStatus,
                    );
                });
            },
        );
    });
});
