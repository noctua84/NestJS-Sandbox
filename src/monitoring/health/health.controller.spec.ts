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

describe('HealthController', () => {
    let controller: HealthController;
    let config: ConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                HttpModule,
                TerminusModule.forRoot(),
                ConfigModule.forRoot(),
            ],
            controllers: [HealthController],
            providers: [ConfigService],
        }).compile();

        controller = module.get<HealthController>(HealthController);
        config = module.get<ConfigService>(ConfigService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(config).toBeDefined();
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

        const response: HealthCheckResult = await controller.check();

        expect(response.status).toBe('ok');
        expect(response.info).toBeDefined();
        expect(response.error).toBeDefined();
    });
});
