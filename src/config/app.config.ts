import { registerAs } from '@nestjs/config';
import Joi from 'joi';

export default registerAs('app', () => ({
    name: process.env.npm_package_name,
    description: process.env.npm_package_description,
    version: process.env.npm_package_version,
}));

export const appConfigSchema = {
    NAME: Joi.string(),
    DESCRIPTION: Joi.string(),
    VERSION: Joi.string(),
};
