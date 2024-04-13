import { NodeOptions } from '@sentry/node';

const sentryConfig: NodeOptions = {
    dsn: process.env.SENTRY_DSN,
    integrations: [],
    environment: process.env.NODE_ENV || 'development',
    release: `${process.env.npm_package_name}@${process.env.npm_package_version}`,
    tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE) || 1.0,
    debug: process.env.NODE_ENV !== 'production',
};

if (process.env.ENABLE_TRACING === 'true') {
    sentryConfig['instrumenter'] = 'otel';
}

export default sentryConfig;
