import { Injectable } from '@nestjs/common';
import client from 'prom-client';

interface IMetricsService {
    getMetrics(): Promise<string>;
}

@Injectable()
export class MetricsService implements IMetricsService {
    async getMetrics(): Promise<string> {
        try {
            return await client.register.metrics();
        } catch (error) {
            // Handle the error here
            console.error('Error retrieving metrics:', error);
            return '';
        }
    }
}
