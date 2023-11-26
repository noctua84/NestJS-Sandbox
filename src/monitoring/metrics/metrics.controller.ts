import {
    Controller,
    Get,
    Inject,
    InternalServerErrorException,
} from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
    constructor(@Inject(MetricsService) private metrics: MetricsService) {}

    @Get()
    async getMetrics(): Promise<string> {
        try {
            return await this.metrics.getMetrics();
        } catch (error) {
            throw new InternalServerErrorException(
                'An error occurred while retrieving metrics.',
            );
        }
    }
}
