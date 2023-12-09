import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import client, {
    Counter,
    Gauge,
    Histogram,
    Registry,
    Summary,
} from 'prom-client';
import { PrismaService } from '../../prisma/prisma.service';
import { KNOWN_ERROR_CODES } from './constants/metrics.constants';

interface IMetricsService {
    getMetrics(): Promise<string>;
}

interface IErrorCodeCounters {
    [key: string]: Counter;
}

@Injectable()
export class MetricsService implements IMetricsService {
    private register: Registry;
    private prisma: PrismaClient;
    private metricsCollection: string[];
    private errorCodeCounters: IErrorCodeCounters;

    constructor(register: Registry, prismaService: PrismaService) {
        this.register = register;
        this.prisma = prismaService.getPrismaClient();
        this.errorCodeCounters = this.initializeErrorCodeCounters();
        this.metricsCollection = [];
    }

    /**
     * Method to get the registered metrics and those supplied from other sources.
     * @returns Promise<string>
     */
    async getMetrics(): Promise<string> {
        this.metricsCollection.push(await this.register.metrics());

        try {
            const prismaMetrics = await this.prisma.$metrics.prometheus();
            this.metricsCollection.push(prismaMetrics);
        } catch (error) {
            console.log('Error retrieving metrics:', error);
        }

        return this.metricsCollection.join('\n');
    }

    /**
     * Method to get the metrics registry instance.
     * @returns Registry
     */
    getPromClient(): Registry {
        return this.register;
    }

    /**
     * Method to register a counter-type metric or to retrive an existing one based on the name given.
     * @param name
     * @param help
     * @param labelNames
     * @returns
     */
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

    /**
     * Method to register a histogram-type metric or to retreive an existing one based on the name given.
     * @param name
     * @param help
     * @param labelNames
     * @param buckets
     * @returns Histogram
     */
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

    /**
     * Method to register a gauge-type metric or to retrive an existing one based on the name given.
     * @param name
     * @param help
     * @param labelNames
     * @returns Gauge
     */
    registerGauge(name: string, help: string, labelNames: string[]): Gauge {
        if (!this.register.getSingleMetric(name)) {
            return new client.Gauge({
                name,
                help,
                labelNames,
                registers: [this.register],
            });
        }

        return this.register.getSingleMetric(name) as Gauge;
    }

    /**
     * Method to register a summary-type metric or to retrive an existing one based on the name given.
     * @param name
     * @param help
     * @param labelNames
     * @param percentiles
     * @returns Summary
     */
    registerSummary(
        name: string,
        help: string,
        labelNames: string[],
        percentiles: number[],
    ): Summary {
        if (!this.register.getSingleMetric(name)) {
            return new client.Summary({
                name,
                help,
                labelNames,
                percentiles,
                registers: [this.register],
            });
        }

        return this.register.getSingleMetric(name) as Summary;
    }

    /**
     * Method to initialize a set of error code counters
     * @returns IErrorCodeCounters
     */
    private initializeErrorCodeCounters(): IErrorCodeCounters {
        const counters: IErrorCodeCounters = {};
        const errorCodes: number[] = KNOWN_ERROR_CODES;

        for (const code of errorCodes) {
            counters[code] = this.registerCounter(
                `http_requests_error_${code}_total`,
                `Total number of HTTP requests resulting in a ${code} error`,
                ['route'],
            );
        }

        return counters;
    }

    /**
     * Method to increment the counter for a given error code.
     * @param errorCode
     * @param route
     */
    incrementErrorCodeCounter(errorCode: string, route: string) {
        this.errorCodeCounters[errorCode]?.inc({ route });
    }
}
