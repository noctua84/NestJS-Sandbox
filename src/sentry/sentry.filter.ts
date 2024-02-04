import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { BaseExceptionFilter } from '@nestjs/core';

const catchableStatuses = [401, 403, 404, 405, 429];

/**
 * Sentry filter
 * it catches all application exceptions and sends them to sentry
 * if the exception is an instance of HttpException and its status code is
 * either 401, 403, 404, 405, 429 or 500, it will be sent to sentry.
 */
@Catch()
export class SentryFilter<T>
    extends BaseExceptionFilter
    implements ExceptionFilter
{
    catch(exception: T, host: ArgumentsHost) {
        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const response = exception.getResponse();

            if (
                status >= 400 &&
                status < 500 &&
                !catchableStatuses.includes(status)
            ) {
                super.catch(exception, host);
                return;
            }

            Sentry.captureException(exception, {
                extra: {
                    status,
                    response,
                },
            });
        }

        Sentry.captureException(exception);
        super.catch(exception, host);
    }
}
