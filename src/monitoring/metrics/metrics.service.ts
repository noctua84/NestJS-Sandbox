import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import client, { Counter, Histogram, Registry } from 'prom-client';
import { PrismaService } from 'src/prisma/prisma.service';

interface IMetricsService {
    getMetrics(): Promise<string>;
}

@Injectable()
export class MetricsService implements IMetricsService {
    private register: Registry;
    private prisma: PrismaClient;
    private metricsCollection: string[];

    constructor(register: Registry, prismaService: PrismaService) {
        this.register = register;
        this.prisma = prismaService.getPrismaClient();
    }

    async getMetrics(): Promise<string> {
        try {
            this.metricsCollection = [
                await this.register.metrics(),
                await this.prisma.$metrics.prometheus(),
            ];

            return this.metricsCollection.join('\n');
        } catch (error) {
            console.error('Error retrieving metrics:', error);
            return '';
        }
    }

    getPromClient(): Registry {
        return this.register;
    }

    registerCounter(name: string, help: string, labelNames: string[]): Counter {
        if (!this.register.getSingleMetric(name)) {
            return new client.Counter({
                name,
                help,
                labelNames,
                registers: [this.register],
            });
        }

        return this.register.getSingleMetric(name) as Counter;
    }

    registerHistogram(
        name: string,
        help: string,
        labelNames: string[],
        buckets: number[],
    ): Histogram {
        if (!this.register.getSingleMetric(name)) {
            return new client.Histogram({
                name,
                help,
                labelNames,
                buckets,
                registers: [this.register],
            });
        }

        return this.register.getSingleMetric(name) as Histogram;
    }
}
