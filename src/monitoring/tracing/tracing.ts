import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { api, NodeSDK } from '@opentelemetry/sdk-node';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { PrismaInstrumentation } from '@prisma/instrumentation';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { B3Propagator } from '@opentelemetry/propagator-b3';
import {
    getClient,
    SentryPropagator,
    SentrySampler,
    SentrySpanProcessor,
    setOpenTelemetryContextAsyncContextStrategy,
    setupEventContextTrace,
    setupGlobalHub,
    wrapContextManagerClass,
} from '@sentry/opentelemetry';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import sentryConfig from '../../config/sentry.config';
import * as Sentry from '@sentry/node';

let traceExporter: any;
let metricsReader: PrometheusExporter | PeriodicExportingMetricReader;
let client: any;
let SentryContextManager: any;

if (process.env.NODE_ENV === 'production') {
    setupGlobalHub();

    Sentry.init(sentryConfig);

    client = getClient();

    setupEventContextTrace(client);

    SentryContextManager = wrapContextManagerClass(
        AsyncLocalStorageContextManager,
    );

    traceExporter = new OTLPTraceExporter();

    metricsReader = new PrometheusExporter({
        port: 9464,
    });
    api.propagation.setGlobalPropagator(new B3Propagator());
} else {
    // the below configuration is mapped to a local running jaeger instance.
    traceExporter = new OTLPTraceExporter({
        url: 'http://localhost:4318/v1/traces',
        headers: {},
    });
    metricsReader = new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter({
            url: 'http://localhost:4318/v1/metrics',
            headers: {},
        }),
    });
}

const traceConfig = {
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: process.env.npm_package_name,
    }),
    traceExporter: traceExporter,
    metricsReader: metricsReader,
    instrumentations: [
        new HttpInstrumentation(),
        new ExpressInstrumentation(),
        new NestInstrumentation(),
        new PrismaInstrumentation({ middleware: true }),
    ],
};

if (process.env.NODE_ENV === 'production') {
    traceConfig['spanProcessor'] = new SentrySpanProcessor();
    traceConfig['contextManager'] = new SentryContextManager();
    traceConfig['sampler'] = new SentrySampler(client);
    traceConfig['textMapPropagator'] = new SentryPropagator();
} else {
    traceConfig['spanProcessor'] = new SimpleSpanProcessor(traceExporter);
}

if (process.env.NODE_ENV === 'production') {
    setOpenTelemetryContextAsyncContextStrategy();
}

export const otelSDK: NodeSDK = new NodeSDK(traceConfig);

process.on('SIGTERM', () => {
    otelSDK
        .shutdown()
        .then(
            () => console.log('SIGTERM: Tracing SDK shutdown successfully'),
            (err) => console.error('SIGTERM: Tracing SDK shutdown failed', err),
        )
        .finally(() => process.exit(0));
});
