import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const body = {
      statusCode: status || 500,
      error: exception?.code || exception?.name || exception?.type || 'Internal server error',
      message:
        exception?.response?.message || exception?.message || exception?.getResponse() || 'Internal server error',
    };

    if (body.statusCode >= 500) {
      this.logger.error(exception);
    } else {
      this.logger.warn(exception);
    }

    response.status(status).json({
      ...body,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }
}
