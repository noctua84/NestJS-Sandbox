import { Counter, Histogram, Registry } from 'prom-client';

export const metricsServiceMock = {
    getPromClient: () => new Registry(),
    registerCounter: jest.fn().mockImplementation((name, help, labelNames) => {
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
            return new Histogram({
                name,
                help,
                labelNames,
                buckets,
                registers: [new Registry()],
            });
        }),
    incrementErrorCodeCounter: jest
        .fn()
        .mockImplementation((errorCode, endpoint) => {
            // Mock return. The actual implementation does not return anything.
            const message = `Error code ${errorCode} for endpoint ${endpoint} was tracked`;
            console.log(message);
            return message;
        }),
};
