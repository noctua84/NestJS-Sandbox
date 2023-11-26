import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthIndicatorResult, TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

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

        jest.spyOn(controller['http'], 'pingCheck').mockResolvedValueOnce(
            result,
        );
        const response = await controller.check();

        expect(response.status).toBe('ok');
        expect(response.info).toBeDefined();
        expect(response.error).toBeDefined();
    });
});
