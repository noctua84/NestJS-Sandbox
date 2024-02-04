import { SentryFilter } from './sentry.filter';
import { BaseExceptionFilter } from '@nestjs/core';

jest.mock('@sentry/node', () => ({
    captureException: jest.fn(),
}));

describe('SentryFilter', () => {
    let sentryFilter: SentryFilter<any>;

    beforeEach(() => {
        sentryFilter = new SentryFilter();
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(new SentryFilter()).toBeDefined();
    });

    it('should implement the ExceptionFilter interface', () => {
        expect(sentryFilter).toBeInstanceOf(BaseExceptionFilter);
    });
});
