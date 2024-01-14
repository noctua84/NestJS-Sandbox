import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FeatureConfigService {
    private readonly logger: Logger = new Logger(FeatureConfigService.name);
    private readonly featureFlags = {
        metrics: 'monitoring.metrics.enabled',
        healthCheck: 'monitoring.health.enabled',
    };
    private readonly metricsEnabled: boolean;
    private readonly healthCheckEnabled: boolean;

    constructor(private configService: ConfigService) {
        const metrics: boolean = this.configService.get<boolean>(
            this.featureFlags.metrics,
        );
        const healthCheck: boolean = this.configService.get<boolean>(
            this.featureFlags.healthCheck,
        );

        if (!metrics || !healthCheck) {
            this.logger.warn(
                'Metrics or health check feature flag not set. Defaulting to false.',
            );
        }

        this.metricsEnabled = metrics || false;
        this.healthCheckEnabled = healthCheck || false;
    }

    /**
     * This class is meant to contain all the feature flags.
     * There are currently no feature flags, so this class is empty.
     * */
    isMetricsEnabled(): boolean {
        return this.metricsEnabled;
    }

    isHealthCheckEnabled(): boolean {
        return this.healthCheckEnabled;
    }
}
