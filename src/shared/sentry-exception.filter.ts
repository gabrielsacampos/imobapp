import * as Sentry from '@sentry/node';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch()
export class SentryExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    Sentry.captureException(exception);
    throw exception;
  }
}
