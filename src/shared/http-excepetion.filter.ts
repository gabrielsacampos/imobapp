import { ArgumentsHost, Catch, ExceptionFilter, HttpException, NotAcceptableException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(NotAcceptableException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.trace(exception);
    const ctx = host.switchToHttp();
    const reponse = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    reponse.status(status).json({
      statusCode: status,
      timestamp: new Date().toLocaleString(),
      path: request.url,
    });
  }
}
