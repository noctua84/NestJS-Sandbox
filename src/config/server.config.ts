import { registerAs } from '@nestjs/config';
import Joi from 'joi';

export default registerAs('server', () => ({
    port: parseInt(process.env.PORT, 10),
    hostname: process.env.HOSTNAME,
    baseUrl: process.env.BASE_URL,
}));

export const serverConfigSchema = {
    PORT: Joi.number().default(3000),
    HOSTNAME: Joi.string().default('localhost'),
    BASE_URL: Joi.string().default('http://localhost:3000'),
};
