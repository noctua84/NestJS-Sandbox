import { registerAs } from '@nestjs/config';
import Joi from 'joi';

export default registerAs('monitoring', () => ({
    metrics: metricsConfig,
    health: healthCheckConfig,
}));

export const metricsConfig = {
    enabled: process.env.ENABLE_METRICS === 'true',
};

export const metricsConfigSchema = {
    ENABLE_METRICS: Joi.boolean().default(false),
};

export const healthCheckConfig = {
    enabled: process.env.ENABLE_HEALTH_CHECK === 'true',
};

export const healthCheckConfigSchema = {
    ENABLE_HEALTH_CHECK: Joi.boolean().default(false),
};
