import { Injectable } from '@nestjs/common';
import client, { Counter, Histogram, Registry } from 'prom-client';

interface IMetricsService {
    getMetrics(): Promise<string>;
}

@Injectable()
export class MetricsService implements IMetricsService {
    private client: Registry;

    constructor(client: Registry) {
        this.client = client;
    }

    async getMetrics(): Promise<string> {
        try {
            // TODO: Add metrics for prisma.
            return await this.client.metrics();
        } catch (error) {
            // Handle the error here
            console.error('Error retrieving metrics:', error);
            return '';
        }
    }

    getPromClient(): Registry {
        return this.client;
    }

    registerCounter(name: string, help: string, labelNames: string[]): Counter {
        if (!this.client.getSingleMetric(name)) {
            return new client.Counter({
                name,
                help,
                labelNames,
                registers: [this.client],
            });
        }

        return this.client.getSingleMetric(name) as Counter;
    }

    registerHistogram(
        name: string,
        help: string,
        labelNames: string[],
        buckets: number[],
    ): Histogram {
        if (!this.client.getSingleMetric(name)) {
            return new client.Histogram({
                name,
                help,
                labelNames,
                buckets,
                registers: [this.client],
            });
        }

        return this.client.getSingleMetric(name) as Histogram;
    }
}
