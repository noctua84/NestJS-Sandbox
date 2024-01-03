import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    HealthCheck,
    HealthCheckResult,
    HealthCheckService,
    HttpHealthIndicator,
} from '@nestjs/terminus';
import { HEALTH_CHECK_KEYS } from './health.constants';

@Controller('health')
export class HealthController {
    constructor(
        @Inject(ConfigService) private config: ConfigService,
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
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

        return this.health.check(indicators);
    }
}
