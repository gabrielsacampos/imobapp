export class FailedQueueJob {
  queue?: string;
  job_name?: string;
  error_message: string;
  error_stack?: string;
  redis_key?: string;
  job: object;
  status: string;
}
