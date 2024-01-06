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

    it.each([true, false])(
        'should have a health check response with details of all indicators',
        async (metricsEnabled: boolean) => {
            const httpResults: HealthIndicatorResult = {};
            httpResults[HEALTH_CHECK_KEYS.api] = { status: 'up' };
            httpResults[HEALTH_CHECK_KEYS.documentation] = { status: 'up' };

            if (metricsEnabled) {
                console.log('metrics enabled');
                httpResults[HEALTH_CHECK_KEYS.metrics] = { status: 'up' };
            }

            console.log(httpResults);

            jest.spyOn(featureFlags, 'isMetricsEnabled').mockReturnValue(
                metricsEnabled,
            );

            jest.spyOn(controller['http'], 'pingCheck').mockImplementation(
                (indicator: string) => {
                    console.log(indicator);
                    if (indicator in HEALTH_CHECK_KEYS) {
                        return Promise.resolve({
                            [indicator]: httpResults[indicator],
                        });
                    }
                },
            );

            jest.spyOn(controller['prisma'], 'pingCheck').mockImplementation(
                () => {
                    return Promise.resolve({
                        Database: {
                            status: 'up',
                        },
                    });
                },
            );

            const response: HealthCheckResult = await controller.check();

            expect(response.status).toBe('ok');
            expect(response.info).toBeDefined();
            expect(response.error).toBeDefined();

            if (metricsEnabled) {
                console.log(response);
                expect(response.details).toHaveProperty(
                    HEALTH_CHECK_KEYS.metrics,
                );
            } else {
                expect(response.details).not.toHaveProperty(
                    HEALTH_CHECK_KEYS.metrics,
                );
            }
        },
    );
});
