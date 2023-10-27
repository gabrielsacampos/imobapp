import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const status = req.status;
    const now = Date.now();
    const url = req.url;

    return next
      .handle()
      .pipe(tap(() => Logger.log(`${status} ${method} ${url} ${Date.now() - now}ms`, context.getClass().name)));
  }
}
