import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthIndicatorResult, TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

describe('HealthController', () => {
    let controller: HealthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule, TerminusModule.forRoot()],
            controllers: [HealthController],
        }).compile();

        controller = module.get<HealthController>(HealthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
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
