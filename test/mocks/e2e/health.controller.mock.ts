import { PrismaClient } from '@prisma/client';
import { HEALTH_CHECK_KEYS } from '../../../src/monitoring/health/health.constants';

export class MockHttpHealthIndicator {
    pingCheck(key: string, url: string) {
        return Promise.resolve({
            [key]: { status: 'up', message: `Mocked response for ${url}` },
        });
    }
}

export class MockPrismaHealthIndicator {
    pingCheck(key: string, prisma: PrismaClient) {
        return Promise.resolve({
            [key]: { status: 'up', message: `Mocked response for ${prisma}` },
        });
    }
}

export const MockHealthCheckResult = {
    status: 'ok',
    info: {
        [HEALTH_CHECK_KEYS.api]: {
            status: 'up',
            message: 'Mocked response for http://localhost:3000/',
        },
        [HEALTH_CHECK_KEYS.documentation]: {
            status: 'up',
            message: 'Mocked response for http://localhost:3000/documentation',
        },
        [HEALTH_CHECK_KEYS.db]: {
            status: 'up',
            message: 'Mocked response for [object PrismaClient]',
        },
        [HEALTH_CHECK_KEYS.metrics]: {
            status: 'up',
            message: 'Mocked response for http://localhost:3000/metrics',
        },
    },
    error: {},
    details: {
        [HEALTH_CHECK_KEYS.api]: {
            status: 'up',
            message: 'Mocked response for http://localhost:3000/',
        },
        [HEALTH_CHECK_KEYS.documentation]: {
            status: 'up',
            message: 'Mocked response for http://localhost:3000/documentation',
        },
        [HEALTH_CHECK_KEYS.db]: {
            status: 'up',
            message: 'Mocked response for [object PrismaClient]',
        },
        [HEALTH_CHECK_KEYS.metrics]: {
            status: 'up',
            message: 'Mocked response for http://localhost:3000/metrics',
        },
    },
};
