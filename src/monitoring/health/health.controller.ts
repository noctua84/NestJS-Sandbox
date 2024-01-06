import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    HealthCheck,
    HealthCheckResult,
    HealthCheckService,
    HttpHealthIndicator,
    PrismaHealthIndicator,
} from '@nestjs/terminus';
import { HEALTH_CHECK_KEYS } from './health.constants';
import { PrismaService } from '../../prisma/prisma.service';
import { FeatureConfigService } from '../../config/featureconfig/featureconfig.service';

@Controller('health')
export class HealthController {
    constructor(
        @Inject(ConfigService) private config: ConfigService,
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private prisma: PrismaHealthIndicator,
        private client: PrismaService,
        private featureFlags: FeatureConfigService,
    ) {}

    @Get()
    @HealthCheck()
    check(): Promise<HealthCheckResult> {
        const indicators = [];
        const baseUrl = this.config.get('server.baseUrl');

        indicators.push(() =>
            this.http.pingCheck(HEALTH_CHECK_KEYS.api, `${baseUrl}/`),
        );
        indicators.push(() =>
            this.http.pingCheck(
                HEALTH_CHECK_KEYS.documentation,
                `${baseUrl}/documentation`,
            ),
        );
        indicators.push(() =>
            this.prisma.pingCheck(
                HEALTH_CHECK_KEYS.db,
                this.client.getPrismaClient(),
            ),
        );

        if (this.featureFlags.isMetricsEnabled() === 'true') {
            indicators.push(() =>
                this.http.pingCheck(
                    HEALTH_CHECK_KEYS.metrics,
                    `${baseUrl}/metrics`,
                ),
            );
        }

        return this.health.check(indicators);
    }
}
