import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { HealthModule } from '../src/monitoring/health/health.module';
import { MetricsModule } from '../src/monitoring/metrics/metrics.module';
import request from 'supertest';
import { HttpHealthIndicator, PrismaHealthIndicator } from '@nestjs/terminus';
import {
    MockHealthCheckResult,
    MockHttpHealthIndicator,
    MockPrismaHealthIndicator,
} from './mocks/e2e/health.controller.mock';

describe('Monitoring (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule, HealthModule, MetricsModule],
        })
            .overrideProvider(HttpHealthIndicator)
            .useClass(MockHttpHealthIndicator)
            .overrideProvider(PrismaHealthIndicator)
            .useClass(MockPrismaHealthIndicator)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    describe('Health', () => {
        it('/health (GET)', () => {
            return request(app.getHttpServer())
                .get('/health')
                .expect(200)
                .expect(MockHealthCheckResult);
        });
    });

    describe('Metrics', () => {
        it('/metrics (GET)', () => {
            return request(app.getHttpServer()).get('/metrics').expect(200);
        });
    });
});
