import { Counter, Histogram, Registry } from 'prom-client';

export const metricsServiceMock = {
    getPromClient: () => new Registry(),
    registerCounter: jest.fn().mockImplementation((name, help, labelNames) => {
        // Mock implementation or return value for registerCounter
        return new Counter({
            name,
            help,
            labelNames,
            registers: [new Registry()],
        });
    }),
    registerHistogram: jest
        .fn()
        .mockImplementation((name, help, labelNames, buckets) => {
            // Mock implementation or return value for registerHistogram
            return new Histogram({
                name,
                help,
                labelNames,
                buckets,
                registers: [new Registry()],
            });
        }),
};
