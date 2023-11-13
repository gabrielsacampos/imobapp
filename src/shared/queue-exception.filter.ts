import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Job } from 'bull';

@Catch()
export class BullExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const job = context.getRequest<Job>();
  }
}
