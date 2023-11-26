import { Test, TestingModule } from '@nestjs/testing';
import { FeatureConfigService } from './featureconfig.service';
import { ConfigModule } from '@nestjs/config';

describe('FeatureConfigService', () => {
    let service: FeatureConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule],
            providers: [FeatureConfigService],
        }).compile();

        service = module.get<FeatureConfigService>(FeatureConfigService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
