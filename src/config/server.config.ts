import { registerAs } from '@nestjs/config';
import Joi from 'joi';

export default registerAs('server', () => ({
    port: parseInt(process.env.PORT, 10),
}));

export const serverConfigSchema = {
    PORT: Joi.number().default(3000),
};
