import { registerAs } from '@nestjs/config';
import Joi from 'joi';

export default registerAs('monitoring', () => ({
    metrics: metricsConfig,
}));

export const metricsConfig = {
    enabled: process.env.ENABLE_METRICS === 'true',
};

export const metricsConfigSchema = {
    ENABLE_METRICS: Joi.boolean().default(false),
};


