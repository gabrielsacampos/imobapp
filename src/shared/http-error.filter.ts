import { ArgumentsHost, Catch, HttpException, ExceptionFilter, Logger } from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const errorResponse = {
      status,
      timestamp: new Date().toLocaleString(),
      path: request.url,
      method: request.method,
      message: exception.message,
    };

    Logger.error(
      `Error on: ${request.method} > ${request.url} > ${JSON.stringify(errorResponse, null, 2)}`,
      'ExceptionFilter',
    );

    response.status(404).json(errorResponse);
  }
}
