import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    HealthCheck,
    HealthCheckService,
    HttpHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
    constructor(
        @Inject(ConfigService) private config: ConfigService,
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
    ) {}

    @Get()
    @HealthCheck()
    check() {
        const indicators = [];
        const baseUrl = this.config.get('server.baseUrl');

        indicators.push(() => this.http.pingCheck('API', `${baseUrl}/`));

        return this.health.check(indicators);
    }
}
