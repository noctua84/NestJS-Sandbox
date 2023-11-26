import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FeatureConfigService {
    constructor(private configService: ConfigService) {}

    /**
     * This class is meant to contain all the feature flags.
     * There are currently no feature flags, so this class is empty.
     * */
    isMetricsEnabled(): boolean {
        return this.configService.get<boolean>('monitoring.metrics.enabled');
    }

    isHealthCheckEnabled(): boolean {
        return this.configService.get<boolean>('monitoring.health.enabled');
    }
}
